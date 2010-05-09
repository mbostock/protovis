/**
 * Constructs a new, empty arc layout. Layouts are not typically constructed
 * directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implements a layout for arc diagrams. An arc diagram is a network
 * visualization with a one-dimensional layout of nodes, using circular arcs to
 * render links between nodes. For undirected networks, arcs are rendering on a
 * single side; this makes arc diagrams useful as annotations to other
 * two-dimensional network layouts, such as rollup, matrix or table layouts. For
 * directed networks, links in opposite directions can be rendered on opposite
 * sides using <tt>directed(true)</tt>.
 *
 * <p>Arc layouts are particularly sensitive to node ordering; for best results,
 * order the nodes such that related nodes are close to each other. A poor
 * (e.g., random) order may result in large arcs with crossovers that impede
 * visual processing. A future improvement to this layout may include automatic
 * reordering using, e.g., spectral graph layout or simulated annealing.
 *
 * <p>This visualization technique is related to that developed by
 * M. Wattenberg, <a
 * href="http://www.research.ibm.com/visual/papers/arc-diagrams.pdf">"Arc
 * Diagrams: Visualizing Structure in Strings"</a> in <i>IEEE InfoVis</i>, 2002.
 * However, this implementation is limited to simple node-link networks, as
 * opposed to structures with hierarchical self-similarity (such as strings).
 *
 * <p>As with other network layouts, three mark prototypes are provided:<ul>
 *
 * <li><tt>node</tt> - for rendering nodes; typically a {@link pv.Dot}.
 * <li><tt>link</tt> - for rendering links; typically a {@link pv.Line}.
 * <li><tt>label</tt> - for rendering node labels; typically a {@link pv.Label}.
 *
 * </ul>For more details on how this layout is structured and can be customized,
 * see {@link pv.Layout.Network}.
 *
 * @extends pv.Layout.Network
 **/
pv.Layout.Arc = function() {
  pv.Layout.Network.call(this);
  var interpolate, // cached interpolate
      directed, // cached directed
      reverse, // cached reverse
      buildImplied = this.buildImplied;

  /** @private Cache layout state to optimize properties. */
  this.buildImplied = function(s) {
    buildImplied.call(this, s);
    directed = s.directed;
    interpolate = s.orient == "radial" ? "linear" : "polar";
    reverse = s.orient == "right" || s.orient == "top";
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

/**
 * Default properties for arc layouts. By default, the orientation is "bottom".
 *
 * @type pv.Layout.Arc
 */
pv.Layout.Arc.prototype.defaults = new pv.Layout.Arc()
    .extend(pv.Layout.Network.prototype.defaults)
    .orient("bottom");

/** @private Populates the x, y and angle attributes on the nodes. */
pv.Layout.Arc.prototype.buildImplied = function(s) {
  if (pv.Layout.Network.prototype.buildImplied.call(this, s)) return;

  var nodes = s.nodes,
      orient = s.orient,
      w = s.width,
      h = s.height,
      r = Math.min(w, h) / 2;

  /** @private Returns the mid-angle, given the breadth. */
  function midAngle(b) {
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
      case "radial": return w / 2 + r * Math.cos(midAngle(b));
    }
  }

  /** @private Returns the y-position, given the breadth. */
  function y(b) {
    switch (orient) {
      case "top": return 0;
      case "bottom": return h;
      case "left":
      case "right": return b * h;
      case "radial": return h / 2 + r * Math.sin(midAngle(b));
    }
  }

  /* Populate the x, y and mid-angle attributes. */
  for (var i = 0; i < nodes.length; i++) {
    var breadth = (i + .5) / nodes.length, n = nodes[i];
    n.x = x(breadth);
    n.y = y(breadth);
    n.midAngle = midAngle(breadth);
  }
};

/**
 * The orientation. The default orientation is "left", which means that nodes
 * will be positioned from left-to-right in the order they are specified in the
 * <tt>nodes</tt> property. The following orientations are supported:<ul>
 *
 * <li>left - left-to-right.
 * <li>right - right-to-left.
 * <li>top - top-to-bottom.
 * <li>bottom - bottom-to-top.
 * <li>radial - radially, starting at 12 o'clock and proceeding clockwise.</ul>
 *
 * @type string
 * @name pv.Layout.Arc.prototype.orient
 */

/**
 * Whether this arc digram is directed (bidirectional); only applies to
 * non-radial orientations. By default, arc digrams are undirected, such that
 * all arcs appear on one side. If the arc digram is directed, then forward
 * links are drawn on the conventional side (the same as as undirected
 * links--right, left, bottom and top for left, right, top and bottom,
 * respectively), while reverse links are drawn on the opposite side.
 *
 * @type boolean
 * @name pv.Layout.Arc.prototype.directed
 */
