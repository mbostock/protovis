pv.Layout.arc = function(nodes, links) {
  var orient = "top",
      directed = false,
      w, // the cached parent panel width
      h, // cached parent panel height
      r; // cached Math.min(w, h) / 2

  /** @private */
  function init() {
    w = this.parent.width();
    h = this.parent.height();
    r = Math.min(w, h) / 2;
    for (var i = 0, n = nodes.length; i < n; i++) {
      nodes[i].breadth = (i + .5) / n;
    }
  }

  /** @private The layout, on which all public methods are registered. */
  var layout = {};

  /**
   * Sets or gets the orientation. The default orientation is "left", which
   * means that the root node is placed on the left edge, leaf nodes appear on
   * the right edge, and internal nodes are in-between. The following
   * orientations are supported:<ul>
   *
   * <li>left - left-to-right.
   * <li>right - right-to-left.
   * <li>top - top-to-bottom.
   * <li>bottom - bottom-to-top.
   * <li>radial - radially, with the root at the center.</ul>
   *
   * @param {string} v the new orientation.
   * @function
   * @name pv.Layout.arc.prototype.orient
   * @returns {pv.Layout.arc} this, or the current orientation.
   */
  layout.orient = function(v) {
    if (arguments.length) {
      orient = String(v);
      return this;
    }
    return orient;
  };

  /**
   * Sets or gets whether this arc digram is directed (bidirectional). By
   * default, arc digrams are undirected, such that all arcs will appear on one
   * side (for non-radial orientations). If the arc digram is directed, then
   * forward links will exist on the conventional side (the same as as
   * undirected links--right, left, bottom and top for left, right, top and
   * bottom, respectively), while reverse links exist on the opposite side.
   *
   * @param {boolean} x whether or not this arc digram is directed.
   * @function
   * @name pv.Layout.arc.prototype.directed
   * @returns {pv.Layout.arc} this, or the current directedness.
   */
  layout.directed = function(x) {
    if (arguments.length) {
      directed = Boolean(x);
      return this;
    }
    return directed;
  };

  /**
   * Returns the nodes associated with this layout.
   *
   * @function
   * @name pv.Layout.arc.prototype.nodes
   * @returns {array}
   */
  layout.nodes = nodes = nodes.map(function(d, i) {
      return {nodeName: i, nodeValue: d, linkDegree: 0};
    });

  /**
   * Returns the links associated with this layout. Each link is represented as
   * a two-element array; the first element is the source node, and the second
   * element is the target node.
   *
   * @function
   * @name pv.Layout.arc.prototype.links
   * @returns {array}
   */
  layout.links = links = links.map(function(d) {
      var s = nodes[d.source],
          t = nodes[d.target],
          l = [s, t],
          v = isNaN(d.value) ? 1 : d.value;
      s.linkDegree += v;
      t.linkDegree += v;
      l.linkValue = v;
      return l;
    });

  /** @private Returns the angle of the given node. */
  function angle(n) {
    return (n.breadth - .25) * 2 * Math.PI;
  }

  /**
   * The node prototype. This prototype is intended to be used with a Dot mark
   * in conjunction with the link prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.arc.prototype.node
   */
  layout.node = new pv.Mark()
      .def("init", init)
      .data(nodes)
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) {
          switch (orient) {
            case "top":
            case "bottom": return n.breadth * w;
            case "left": return 0;
            case "right": return w;
            case "radial": return w / 2 + r * Math.cos(angle(n));
          }
        })
      .top(function top(n) {
          switch (orient) {
            case "top": return 0;
            case "bottom": return h;
            case "left":
            case "right": return n.breadth * h;
            case "radial": return h / 2 + r * Math.sin(angle(n));
          }
        });

  /**
   * The link prototype, which renders edges between child nodes and their
   * parents. This prototype is intended to be used with a Line mark in
   * conjunction with the node prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.arc.prototype.link
   */
  layout.link = new pv.Mark()
      .extend(layout.node)
      .interpolate(function() {
          return (orient == "radial") ? "linear" : "polar";
        })
      .data(function(p) {
          return (directed || (p[0].breadth < p[1].breadth))
              ? p // no reverse necessary, arc will be drawn as intended
              : [p[1], p[0]];
        })
      .fillStyle(null)
      .lineWidth(function(d, p) { return p.linkValue * 1.5; })
      .strokeStyle("rgba(0,0,0,.2)");

  /**
   * The node label prototype, which renders the node name adjacent to the node.
   * This prototype is provided as an alternative to using the anchor on the
   * node mark; it is primarily intended to be used with radial node-link
   * layouts, since it provides a convenient mechanism to set the text angle.
   *
   * @type pv.Mark
   * @name pv.Layout.arc.prototype.label
   */
  layout.label = new pv.Mark()
      .extend(layout.node)
      .textMargin(7)
      .textBaseline("middle")
      .text(function(n) { return n.nodeValue; })
      .textAngle(function(n) {
          switch (orient) {
            case "top":
            case "bottom": return -Math.PI / 2;
            case "left":
            case "right": return 0;
          }
          var a = angle(n);
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textAlign(function(n) {
          switch (orient) {
            case "top":
            case "right": return "left";
            case "bottom":
            case "left": return "right";
          }
          return pv.Wedge.upright(angle(n)) ? "left" : "right";
        });

  return layout;
};

