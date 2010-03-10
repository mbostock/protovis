/** @class Layout for arc diagrams. */
pv.Layout.Arc = function() {
  pv.Layout.Network.call(this);
  var interpolate, directed, reverse, init = this.init;

  /** @private Cache layout state to optimize properties. */
  this.init = function() {
    var orient = this.orient();
    directed = this.directed();
    interpolate = orient == "radial" ? "linear" : "polar";
    reverse = orient == "right" || orient == "top";
    init.call(this);
  };

  /* Override link properties to handle directedness and orientation. */
  this.link
      .data(function(p) {
          var s = p.sourceNode, t = p.targetNode;
          return reverse != (directed || (s.index < t.index)) ? [s, t] : [t, s];
        })
      .interpolate(function() { return interpolate; });
};

pv.Layout.Arc.prototype = pv.extend(pv.Layout.Network)
    .property("orient", String)
    .property("directed", Boolean);

pv.Layout.Arc.prototype.defaults = new pv.Layout.Arc()
    .extend(pv.Layout.Network.prototype.defaults)
    .orient("bottom");

/** @private Populates the x, y and angle attributes on the nodes. */
pv.Layout.Arc.prototype.init = function() {
  if (pv.Layout.Network.prototype.init.call(this)) return;
  var nodes = this.nodes(),
      orient = this.orient(),
      w = this.parent.width(),
      h = this.parent.height(),
      r = Math.min(w, h) / 2;

  /** @private Returns the angle, given the breadth. */
  function angle(b) {
    switch (orient) {
      case "top": return -Math.PI / 2;
      case "bottom": return Math.PI / 2;
      case "left": return Math.PI;
      case "right": return 0;
      case "radial": return (b - .25) * 2 * Math.PI;
    }
  }

  /** @private Returns the x-position, given the breadth. */
  function x(b) {
    switch (orient) {
      case "top":
      case "bottom": return b * w;
      case "left": return 0;
      case "right": return w;
      case "radial": return w / 2 + r * Math.cos(angle(b));
    }
  }

  /** @private Returns the y-position, given the breadth. */
  function y(b) {
    switch (orient) {
      case "top": return 0;
      case "bottom": return h;
      case "left":
      case "right": return b * h;
      case "radial": return h / 2 + r * Math.sin(angle(b));
    }
  }

  /* Populate the x, y and angle attributes. */
  for (var i = 0; i < nodes.length; i++) {
    var breadth = (i + .5) / nodes.length, n = nodes[i];
    n.x = x(breadth);
    n.y = y(breadth);
    n.angle = angle(breadth);
  }
};

/**
 * The orientation. The default orientation is "left", which means that the root
 * node is placed on the left edge, leaf nodes appear on the right edge, and
 * internal nodes are in-between. The following orientations are supported:<ul>
 *
 * <li>left - left-to-right.
 * <li>right - right-to-left.
 * <li>top - top-to-bottom.
 * <li>bottom - bottom-to-top.
 * <li>radial - radially, with the root at the center.</ul>
 *
 * @param {string} v the new orientation.
 * @function
 * @name pv.Layout.Arc.prototype.orient
 * @returns {pv.Layout.Arc} this, or the current orientation.
 */

/**
 * Whether this arc digram is directed (i.e., bidirectional); only applies to
 * non-radial orientations. By default, arc digrams are undirected, such that
 * all arcs appear on one side. If the arc digram is directed, then forward
 * links are drawn on the conventional side (the same as as undirected
 * links--right, left, bottom and top for left, right, top and bottom,
 * respectively), while reverse links are drawn on the opposite side.
 *
 * @param {boolean} x whether or not this arc digram is directed.
 * @function
 * @name pv.Layout.Arc.prototype.directed
 * @returns {pv.Layout.Arc} this, or the current directedness.
 */
