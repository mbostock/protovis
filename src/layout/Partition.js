pv.Layout.Partition = function() {
  pv.Layout.Hierarchy.call(this);
};

pv.Layout.Partition.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("order", String) // null, ascending, descending?
    .property("orient", String); // top, left, right, bottom, radial

pv.Layout.Partition.prototype.defaults = new pv.Layout.Partition()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .orient("top");

pv.Layout.Partition.prototype.$size = function() { return 1; };

pv.Layout.Partition.prototype.size = function(f) {
  this.$size = f;
  return this;
};

pv.Layout.Partition.prototype.init = function() {
  var that = this,
      nodes = that.nodes(),
      root = nodes[0],
      stack = pv.Mark.stack,
      order = that.order(),
      orient = that.orient(),
      w = that.parent.width(),
      h = that.parent.height(),
      r = Math.min(w, h) / 2,
      maxDepth = 0;

  /* Recursively compute the tree depth and node size. */
  var maxDepth = 0;
  stack.unshift(null);
  root.visitAfter(function(n, i) {
      if (i > maxDepth) maxDepth = i;
      n.size = n.firstChild
          ? pv.sum(n.childNodes, function(n) { return n.size; })
          : that.$size.apply(that, (stack[0] = n.nodeValue, stack));
    });
  stack.shift();

  /* Order */
  switch (order) {
    case "ascending": root.sort(function(a, b) { return a.size - b.size; }); break;
    case "descending": root.sort(function(b, a) { return a.size - b.size; }); break;
  }

  /* Compute the unit breadth and depth of each node. */
  var ds = 1 / maxDepth;
  root.minBreadth = 0;
  root.breadth = .5;
  root.maxBreadth = 1;
  root.visitBefore(function(n) {
    var b = n.minBreadth, s = n.maxBreadth - b;
      for (var c = n.firstChild; c; c = c.nextSibling) {
        c.minBreadth = b;
        c.maxBreadth = b += (c.size / n.size) * s;
        c.breadth = (b + c.minBreadth) / 2;
      }
    });
  root.visitAfter(function(n, i) {
      n.minDepth = (i - 1) * ds;
      n.maxDepth = n.depth = i * ds;
    });

  /** @private Returns the radius of the given node. */
  function radius(n) {
    return n.parentNode ? (n.depth * r) : 0;
  }

  /** @private Returns the angle of the given node. */
  function angle(n) {
    return orient == "radial"
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
      case "radial": return w / 2 + radius(n) * Math.cos(n.angle);
    }
  }

  /** @private */
  function y(n) {
    switch (orient) {
      case "left": return n.breadth * h;
      case "right": return h - n.breadth * h;
      case "top": return n.depth * h;
      case "bottom": return h - n.depth * h;
      case "radial": return h / 2 + radius(n) * Math.sin(n.angle);
    }
  }

  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    n.angle = angle(n);
    n.x = x(n);
    n.y = y(n);
  }
};

/** A variant of partition layout that is space-filling. */
pv.Layout.Partition.Fill = function() {
  pv.Layout.Partition.call(this);
  pv.Layout.Hierarchy.Fill.constructor.call(this);
};

pv.Layout.Partition.Fill.prototype = pv.extend(pv.Layout.Partition);

pv.Layout.Partition.Fill.prototype.init = function() {
  if (pv.Layout.Partition.prototype.init.call(this)) return;
  pv.Layout.Hierarchy.Fill.init.call(this);
};
