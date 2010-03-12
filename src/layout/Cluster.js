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

  this.link.interpolate(function() { return interpolate; });
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
  pv.Layout.Hierarchy.Fill.constructor.call(this);
};

pv.Layout.Cluster.Fill.prototype = pv.extend(pv.Layout.Cluster);

pv.Layout.Cluster.Fill.prototype.init = function() {
  if (pv.Layout.Cluster.prototype.init.call(this)) return;
  pv.Layout.Hierarchy.Fill.init.call(this);
};
