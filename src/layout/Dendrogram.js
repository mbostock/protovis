pv.Layout.dendrogram = function(map) {
  var nodes,
      sort,
      orient = "top";

  /** @private */
  function depth(n) {
    n.u = 0;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      n.u = Math.max(n.u, 1 + depth(c));
    }
    return n.u;
  }

  /** @private */
  function data() {
    if (nodes) return nodes;
    var nodes = pv.dom(map).nodes();

    var w = this.parent.width(),
        h = this.parent.height(),
        root = nodes[0],
        db,
        d1,
        dd,
        maxDist = depth(root);

    if (sort) root.sort(sort);

    switch (orient) {
      case "top": db = w; d1 = h; dd = -h; break;
      case "bottom": db = w; d1 = 0; dd = h; break;
      case "left": db = h; d1 = w; dd = -w; break;
      case "right": db = h; d1 = 0; dd = w; break;
    }

    var leafIndex = 0, leafCount = 0;
    root.visitAfter(function(n) { if (!n.firstChild) leafCount++; });
    var step = 1 / leafCount;

    function layoutNode(n) {
      var d = d1 + dd * n.u / maxDist;
      if (n.firstChild) {
        var b = 0, bc;
        for (var c = n.firstChild; c; c = c.nextSibling) {
          b += bc = layoutNode(c);
        }
        b /= n.childNodes.length;
      } else {
        b = db * step * (.5 + leafIndex++);
      }
      switch (orient) {
        case "top": case "bottom": n.x = b; n.y = d; break;
        case "left": case "right": n.x = d; n.y = b; break;
      }
      return b;
    }

    layoutNode(root);
    return nodes;
  }

  var layout = {};

  layout.orient = function(v) {
    orient = v;
    return this;
  };

  layout.nodes = data;

  layout.sort = function(f) {
    sort = f;
    return this;
  };

  layout.links = function() {
    return data.call(this)
        .filter(function(n) { return n.parentNode; })
        .map(function(n) { return [n, n.parentNode]; });
  };

  /* A dummy mark, like an anchor, which the caller extends. */
  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("white")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; });

  /* A dummy mark, like an anchor, which the caller extends. */
  layout.link = new pv.Mark().extend(layout.node)
      .data(pv.identity)
      .interpolate(function() {
          switch (orient) {
            case "top": case "bottom": return "step-before";
            case "left": case "right": return "step-after";
          }
        })
      .lineWidth(1)
      .strokeStyle("#999")
      .left(function(n) { return Math.round(n.x) - .5; })
      .top(function(n) { return Math.round(n.y) - .5; })
      .fillStyle(null);

  return layout;
};
