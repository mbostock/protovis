pv.Layout.arc = function(nodes, links) {
  var orient = "top",
      step, // the spacing between nodes, given the orientation
      w, // the cached parent panel width
      h, // cached parent panel height
      r; // cached Math.min(w, h) / 2

  /** @private */
  function init() {
    w = this.parent.width();
    h = this.parent.height();
    r = Math.min(w, h) / 2;
    switch (orient) {
      case "top":
      case "bottom": step = w / nodes.length; break;
      case "left":
      case "right": step = h / nodes.length; break;
      case "radial": step = 2 * Math.PI / nodes.length; break;
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
      orient = v;
      return this;
    }
    return orient;
  };

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
          v = isNaN(d.value) ? 1 : d.value;
      var l = (d.source < d.target) ? [s, t] : [t, s];
      s.linkDegree += v;
      t.linkDegree += v;
      l.linkValue = v;
      return l;
    });

  /** @private Computes the left-coordinate of the given node. */
  function left(n) {
    switch (orient) {
      case "top":
      case "bottom": return n.nodeName * step;
      case "left": return 0;
      case "right": return w;
      case "radial": return w / 2 + r * Math.cos(n.nodeName * step);
    }
  }

  /** @private Computes the top-coordinate of the given node. */
  function top(n) {
    switch (orient) {
      case "top": return 0;
      case "bottom": return h;
      case "left":
      case "right": return n.nodeName * step;
      case "radial": return h / 2 + r * Math.sin(n.nodeName * step);
    }
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
      .left(left)
      .top(top);

  /**
   * The link prototype, which renders edges between child nodes and their
   * parents. This prototype is intended to be used with a Line mark in
   * conjunction with the node prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.arc.prototype.link
   */
  layout.link = new pv.Mark().extend(layout.node)
      .data(function(p) {
          return (orient == "radial")
              ? p
              : [p]; // only need a single wedge to draw the arc
        })
      .fillStyle(null)
      .lineWidth(function(d, p) { return p.linkValue; })
      .strokeStyle("rgba(0,0,0,.2)")
      .left(function(d) {
          return (orient == "radial")
              ? left(d)
              : (left(d[0]) + left(d[1])) / 2;
        })
      .top(function(d) {
          return (orient == "radial")
              ? top(d)
              : (top(d[0]) + top(d[1])) / 2;
        })
      .angle(Math.PI)
      .startAngle(function(d) {
          switch (orient) {
            case "top": return -Math.PI;
            case "bottom": return 0;
            case "left": return Math.PI / 2;
            case "right": return -Math.PI / 2;
          }
        })
      .outerRadius(function(d) {
          switch (orient) {
            case "top":
            case "bottom": return (left(d[0]) - left(d[1])) / 2;
            case "left":
            case "right": return (top(d[0]) - top(d[1])) / 2;
          }
        })
      .innerRadius(function() { return this.outerRadius(); });

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
      .text(function(n) { return n.parentNode ? n.nodeName : "root"; })
      .textAngle(function(n) {
          switch (orient) {
            case "top":
            case "bottom": return -Math.PI / 2;
            case "left":
            case "right": return 0;
          }
          var a = n.nodeName * step;
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textAlign(function(n) {
          switch (orient) {
            case "top":
            case "right": return "left";
            case "bottom":
            case "left": return "right";
          }
          return pv.Wedge.upright(n.nodeName * step) ? "left" : "right";
        });

  return layout;
};

