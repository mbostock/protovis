pv.Layout.indent = function(map) {
  var nodes,
      bspace = 15,
      dspace = 15,
      ax,
      ay;

  /** @private */
  function position(n, breadth, depth) {
    n.left = ax + depth++ * dspace;
    n.top = ay + breadth++ * bspace;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      breadth = position(c, breadth, depth);
    }
    return breadth;
  }

  /** @private */
  function data() {
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();
    ax = dspace - .5;
    ay = bspace - .5;
    position(nodes[0], 0, 0);
    return nodes;
  }

  var layout = {};

  layout.nodes = data;

  layout.spacing = function(depth, breadth) {
    dspace = depth;
    bspace = breadth;
    return this;
  };

  /* A dummy mark, like an anchor, which the caller extends. */
  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("white")
      .left(function(n) { return n.left; })
      .top(function(n) { return n.top; });

  /* A dummy mark, like an anchor, which the caller extends. */
  layout.link = new pv.Mark().extend(layout.node)
      .data(function(n) { return n.parentNode ? [n, n.parentNode] : []; })
      .interpolate("step-after")
      .lineWidth(1)
      .fillStyle(null);

  return layout;
};
