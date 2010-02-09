pv.Layout.radial = function(map) {
  var nodes;

  /** @private */
  function size(n) {
    return n.size = n.childNodes ? (1 + pv.sum(n.childNodes, size)) : 1;
  }

  /** @private */
  function depth(n) {
    return n.childNodes ? (1 + pv.max(n.childNodes, depth)) : 0;
  }

  /** @private */
  function divide(n) {
    var startAngle = n.startAngle;
    for (var i = 0; i < n.childNodes.length; i++) {
      var child = n.childNodes[i], angle = (child.size / n.size) * n.angle;
      child.startAngle = startAngle;
      child.angle = angle;
      child.endAngle = startAngle + angle;
      child.midAngle = startAngle + angle / 2;
      child.depth = n.depth + 1;
      child.innerRadius = Math.max(0, child.depth - .5);
      child.outerRadius = (child.depth + .5);
      startAngle += angle;
      if (child.childNodes) {
        divide(child);
      }
    }
  }

  /** @private */
  function data() {
    if (nodes) return nodes;
    nodes = pv.dom(map).nodes();

    var root = nodes[0];
    root.startAngle = 0;
    root.midAngle = 0;
    root.angle = 2 * Math.PI;
    root.endAngle = 2 * Math.PI;
    root.innerRadius = 0;
    root.outerRadius = .5;
    root.depth = 0;
    size(root);
    divide(root);

    /* Scale the positions. */
    var w = this.parent.width(),
        h = this.parent.height(),
        r = Math.min(w, h) / (2 * depth(root) - 1);
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.left = w / 2 + r * n.innerRadius * Math.cos(n.midAngle);
      n.top = h / 2 + r * n.innerRadius * Math.sin(n.midAngle);
    }

    return nodes;
  }

  var layout = {};

  layout.nodes = data;

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
      .fillStyle(null);

  /* A dummy mark, like an anchor, which the caller extends. */
  layout.label = new pv.Mark().extend(layout.node)
      .textAngle(function(n) {
          var a = n.midAngle;
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textMargin(7)
      .textBaseline("middle")
      .textAlign(function(n) { return pv.Wedge.upright(n.midAngle) ? "left" : "right"; })
      .text(function(n) { return n.parentNode ? n.nodeName : "root"; });

  return layout;
};
