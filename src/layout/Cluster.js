pv.Layout.Cluster = function() {
  pv.Layout.Hierarchy.call(this);
  var interpolate, init = this.init;

  /** @private Cache layout state to optimize properties. */
  this.init = function() {
    var orient = this.orient();
    interpolate
        = /^(top|bottom)$/.test(orient) ? "step-before"
        : /^(left|right)$/.test(orient) ? "step-after"
        : "linear";
    init.call(this);
  };

  this.link
      .strokeStyle("#ccc")
      .interpolate(function() { return interpolate; });
};

pv.Layout.Cluster.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("group", Number)
    .property("orient", String);

pv.Layout.Cluster.prototype.defaults = new pv.Layout.Cluster()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .group(0)
    .orient("top");

pv.Layout.Cluster.prototype.init = function() {
  if (pv.Layout.Hierarchy.prototype.init.call(this)) return;
  var nodes = this.nodes(),
      orient = this.orient(),
      g = this.group(),
      w = this.parent.width(),
      h = this.parent.height(),
      r = Math.min(w, h) / 2;

  /** @private Compute the maximum depth of descendants for each node. */
  function depth(n) {
    var d = 0;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      d = Math.max(d, 1 + depth(c));
    }
    return n.depth = d;
  }

  /* Compute the initial depth of each node. */
  var root = nodes[0], ds = 1 / depth(root);

  /* Count the number of leaf nodes. */
  var leafCount = 0, p;
  root.visitAfter(function(n) {
      if (!n.firstChild) {
        if (g && (p != n.parentNode)) {
          p = n.parentNode;
          leafCount += g;
        }
        leafCount++;
      }
    });

  /* Compute the unit breadth and depth of each node. */
  var leafIndex = .5 - g / 2, step = 1 / leafCount, p = undefined;
  root.visitAfter(function(n) {
      if (n.firstChild) {
        var b = 0;
        for (var c = n.firstChild; c; c = c.nextSibling) b += c.breadth;
        b /= n.childNodes.length;
      } else {
        if (g && (p != n.parentNode)) {
          p = n.parentNode;
          leafIndex += g;
        }
        b = step * leafIndex++;
      }
      n.breadth = b;
      n.depth = 1 - n.depth / root.depth;
    });

  /* Compute breadth and depth ranges for space-filling layouts. */
  root.visitAfter(function(n) {
      n.minBreadth = n.firstChild ? n.firstChild.minBreadth : (n.breadth - step / 2);
      n.maxBreadth = n.firstChild ? n.lastChild.maxBreadth : (n.breadth + step / 2);
    });
  root.visitBefore(function(n) {
      n.minDepth = n.parentNode ? n.parentNode.maxDepth : 0;
      n.maxDepth = n.parentNode ? (n.depth + root.depth) : (n.minDepth + 2 * root.depth);
    });
  root.minDepth = -ds;

  /** @private Returns the radius of the given node. */
  function radius(n) {
    return n.parentNode ? (n.depth * r) : 0;
  }

  /** @private Returns the angle of the given node. */
  function angle(n) {
    return (orient == "radial")
        ? (n.parentNode ? (n.breadth - .25) * 2 * Math.PI : 0)
        : (n.firstChild ? Math.PI : 0);
  }

  /** @private */
  function x(n) {
    switch (orient) {
      case "left": return n.depth * w;
      case "right": return w - n.depth * w;
      case "top": return n.breadth * w;
      case "bottom": return w - n.breadth * w;
      case "radial": return w / 2 + radius(n) * Math.cos(angle(n));
    }
  }

  /** @private */
  function y(n) {
    switch (orient) {
      case "left": return n.breadth * h;
      case "right": return h - n.breadth * h;
      case "top": return n.depth * h;
      case "bottom": return h - n.depth * h;
      case "radial": return h / 2 + radius(n) * Math.sin(angle(n));
    }
  }

  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    n.x = x(n);
    n.y = y(n);
    n.angle = angle(n);
  }
};

/** A variant of cluster layout that is space-filling. */
pv.Layout.Cluster.Fill = function() {
  pv.Layout.Cluster.call(this);

  var node = this.node
      .strokeStyle("#fff")
      .fillStyle("#ccc")
      .width(function(n) { return n.width; })
      .height(function(n) { return n.height; })
      .innerRadius(function(n) { return n.innerRadius; })
      .outerRadius(function(n) { return n.outerRadius; })
      .startAngle(function(n) { return n.startAngle; })
      .endAngle(function(n) { return n.endAngle; });

  /** @private Adding to this layout implicitly adds to this node. */
  this.add = function(type) { return this.parent.add(type).extend(node); };

  /* Now hide references to inherited marks. */
  delete this.node;
  delete this.label;
  delete this.link;
};

pv.Layout.Cluster.Fill.prototype = pv.extend(pv.Layout.Cluster);

pv.Layout.Cluster.Fill.prototype.init = function() {
  if (pv.Layout.Cluster.prototype.init.call(this)) return;
  var nodes = this.nodes(),
      orient = this.orient(),
      group = this.group(),
      w = this.parent.width(),
      h = this.parent.height(),
      r = Math.min(w, h) / 2,
      ds = -nodes[0].minDepth;

  /** @private Scales the specified depth for a space-filling layout. */
  function scale(d, ds) {
    return (d + ds) / (1 + ds);
  }

  /** @private */
  function x(n) {
    switch (orient) {
      case "left": return scale(n.minDepth, ds) * w;
      case "right": return (1 - scale(n.maxDepth, ds)) * w;
      case "top": return n.minBreadth * w;
      case "bottom": return (1 - n.maxBreadth) * w;
      case "radial": return w / 2;
    }
  }

  /** @private */
  function y(n) {
    switch (orient) {
      case "left": return n.minBreadth * h;
      case "right": return (1 - n.maxBreadth) * h;
      case "top": return scale(n.minDepth, ds) * h;
      case "bottom": return (1 - scale(n.maxDepth, ds)) * h;
      case "radial": return h / 2;
    }
  }

  /** @private */
  function width(n) {
    switch (orient) {
      case "left":
      case "right": return (n.maxDepth - n.minDepth) / (1 + ds) * w;
      case "top":
      case "bottom": return (n.maxBreadth - n.minBreadth) * w;
    }
  }

  /** @private */
  function height(n) {
    switch (orient) {
      case "left":
      case "right": return (n.maxBreadth - n.minBreadth) * h;
      case "top":
      case "bottom": return (n.maxDepth - n.minDepth) / (1 + ds) * h;
    }
  }

  /** @private */
  function innerRadius(n) {
    return Math.max(0, scale(n.minDepth, ds / 2)) * r;
  }

  /** @private */
  function outerRadius(n) {
    return scale(n.maxDepth, ds / 2) * r;
  }

  /** @private */
  function startAngle(n) {
    return (n.parentNode ? n.minBreadth - .25 : 0) * 2 * Math.PI;
  }

  /** @private */
  function endAngle(n) {
    return (n.parentNode ? n.maxBreadth - .25 : 1) * 2 * Math.PI;
  }

  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    n.x = x(n);
    n.y = y(n);
    n.width = width(n);
    n.height = height(n);
    n.innerRadius = innerRadius(n);
    n.outerRadius = outerRadius(n);
    n.startAngle = startAngle(n);
    n.endAngle = endAngle(n);
  }
};
