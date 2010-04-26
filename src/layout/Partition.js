pv.Layout.Partition = function() {
  pv.Layout.Hierarchy.call(this);
};

pv.Layout.Partition.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("order", String) // null, ascending, descending?
    .property("orient", String) // top, left, right, bottom, radial
    .property("innerRadius", Number)
    .property("outerRadius", Number);

pv.Layout.Partition.prototype.defaults = new pv.Layout.Partition()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .orient("top");

pv.Layout.Partition.prototype.$size = function() { return 1; };

pv.Layout.Partition.prototype.size = function(f) {
  this.$size = f;
  return this;
};

pv.Layout.Partition.prototype.buildImplied = function(s) {
  if (pv.Layout.Hierarchy.prototype.buildImplied.call(this, s)) return;

  var that = this,
      root = s.nodes[0],
      stack = pv.Mark.stack,
      maxDepth = 0;

  /* Recursively compute the tree depth and node size. */
  stack.unshift(null);
  root.visitAfter(function(n, i) {
      if (i > maxDepth) maxDepth = i;
      n.size = n.firstChild
          ? pv.sum(n.childNodes, function(n) { return n.size; })
          : that.$size.apply(that, (stack[0] = n, stack));
    });
  stack.shift();

  /* Order */
  switch (s.order) {
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

  pv.Layout.Hierarchy.NodeLink.buildImplied.call(this, s);
};

/** A variant of partition layout that is space-filling. */
pv.Layout.Partition.Fill = function() {
  pv.Layout.Partition.call(this);
  pv.Layout.Hierarchy.Fill.constructor.call(this);
};

pv.Layout.Partition.Fill.prototype = pv.extend(pv.Layout.Partition);

pv.Layout.Partition.Fill.prototype.buildImplied = function(s) {
  if (pv.Layout.Partition.prototype.buildImplied.call(this, s)) return;
  pv.Layout.Hierarchy.Fill.buildImplied.call(this, s);
};
