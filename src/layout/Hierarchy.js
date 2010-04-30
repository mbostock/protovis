/**
 * Constructs a new, empty hierarchy layout. Layouts are not typically
 * constructed directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Represents an abstract layout for hierarchy diagrams. This class is a
 * specialization of {@link pv.Layout.Network}, providing the basic structure
 * for both hierarchical node-link diagrams (such as Reingold-Tilford trees) and
 * space-filling hierarchy diagrams (such as sunbursts and treemaps).
 *
 * <p>Unlike general network layouts, the <tt>links</tt> property need not be
 * defined explicitly. Instead, the links are computed implicitly from the
 * <tt>parentNode</tt> attribute of the node objects, as defined by the
 * <tt>nodes</tt> property. This implementation is also available as
 * {@link #links}, for reuse with non-hierarchical layouts; for example, to
 * render a tree using force-directed layout.
 *
 * <p>Correspondingly, the <tt>nodes</tt> property is represented as a union of
 * {@link pv.Layout.Network.Node} and {@link pv.Dom.Node}. To construct a node
 * hierarchy from a simple JSON map, use the {@link pv.Dom} operator; this
 * operator also provides an easy way to sort nodes before passing them to the
 * layout.
 *
 * <p>For more details on how to use this layout, see
 * {@link pv.Layout.Network}.
 *
 * @see pv.Layout.Cluster
 * @see pv.Layout.Partition
 * @see pv.Layout.Tree
 * @see pv.Layout.Treemap
 * @see pv.Layout.Indent
 * @see pv.Layout.Pack
 * @extends pv.Layout.Network
 */
pv.Layout.Hierarchy = function() {
  pv.Layout.Network.call(this);
  this.link.strokeStyle("#ccc");
};

pv.Layout.Hierarchy.prototype = pv.extend(pv.Layout.Network);

/** @private Compute the implied links. (Links are null by default.) */
pv.Layout.Hierarchy.prototype.buildImplied = function(s) {
  if (!s.links) s.links = pv.Layout.Hierarchy.links.call(this);
  pv.Layout.Network.prototype.buildImplied.call(this, s);
};

/** The implied links; computes links using the <tt>parentNode</tt> attribute. */
pv.Layout.Hierarchy.links = function() {
  return this.nodes()
      .filter(function(n) { return n.parentNode; })
      .map(function(n) {
          return {
              sourceNode: n,
              targetNode: n.parentNode,
              linkValue: 1
            };
      });
};

/** @private Provides standard node-link layout based on breadth & depth. */
pv.Layout.Hierarchy.NodeLink = {

  /** @private */
  buildImplied: function(s) {
    var nodes = s.nodes,
        orient = s.orient,
        horizontal = /^(top|bottom)$/.test(orient),
        w = s.width,
        h = s.height;

    /* Compute default inner and outer radius. */
    if (orient == "radial") {
      var ir = s.innerRadius, or = s.outerRadius;
      if (ir == null) ir = 0;
      if (or == null) or = Math.min(w, h) / 2;
    }

    /** @private Returns the radius of the given node. */
    function radius(n) {
      return n.parentNode ? (n.depth * (or - ir) + ir) : 0;
    }

    /** @private Returns the angle of the given node. */
    function midAngle(n) {
      return (n.parentNode ? (n.breadth - .25) * 2 * Math.PI : 0);
    }

    /** @private */
    function x(n) {
      switch (orient) {
        case "left": return n.depth * w;
        case "right": return w - n.depth * w;
        case "top": return n.breadth * w;
        case "bottom": return w - n.breadth * w;
        case "radial": return w / 2 + radius(n) * Math.cos(n.midAngle);
      }
    }

    /** @private */
    function y(n) {
      switch (orient) {
        case "left": return n.breadth * h;
        case "right": return h - n.breadth * h;
        case "top": return n.depth * h;
        case "bottom": return h - n.depth * h;
        case "radial": return h / 2 + radius(n) * Math.sin(n.midAngle);
      }
    }

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.midAngle = orient == "radial" ? midAngle(n)
          : horizontal ? Math.PI / 2 : 0;
      n.x = x(n);
      n.y = y(n);
      if (n.firstChild) n.midAngle += Math.PI;
    }
  }
};

/** @private Provides standard space-filling layout based on breadth & depth. */
pv.Layout.Hierarchy.Fill = {

  /** @private */
  constructor: function() {
    this.node
        .strokeStyle("#fff")
        .fillStyle("#ccc")
        .width(function(n) { return n.dx; })
        .height(function(n) { return n.dy; })
        .innerRadius(function(n) { return n.innerRadius; })
        .outerRadius(function(n) { return n.outerRadius; })
        .startAngle(function(n) { return n.startAngle; })
        .angle(function(n) { return n.angle; });

    this.label
        .textAlign("center")
        .left(function(n) { return n.x + (n.dx / 2); })
        .top(function(n) { return n.y + (n.dy / 2); });

    /* Hide unsupported link. */
    delete this.link;
  },

  /** @private */
  buildImplied: function(s) {
    var nodes = s.nodes,
        orient = s.orient,
        horizontal = /^(top|bottom)$/.test(orient),
        w = s.width,
        h = s.height,
        depth = -nodes[0].minDepth;

    /* Compute default inner and outer radius. */
    if (orient == "radial") {
      var ir = s.innerRadius, or = s.outerRadius;
      if (ir == null) ir = 0;
      if (ir) depth *= 2; // use full depth step for root
      if (or == null) or = Math.min(w, h) / 2;
    }

    /** @private Scales the specified depth for a space-filling layout. */
    function scale(d, depth) {
      return (d + depth) / (1 + depth);
    }

    /** @private */
    function x(n) {
      switch (orient) {
        case "left": return scale(n.minDepth, depth) * w;
        case "right": return (1 - scale(n.maxDepth, depth)) * w;
        case "top": return n.minBreadth * w;
        case "bottom": return (1 - n.maxBreadth) * w;
        case "radial": return w / 2;
      }
    }

    /** @private */
    function y(n) {
      switch (orient) {
        case "left": return n.minBreadth * h;
        case "right": return (1 - n.maxBreadth) * h;
        case "top": return scale(n.minDepth, depth) * h;
        case "bottom": return (1 - scale(n.maxDepth, depth)) * h;
        case "radial": return h / 2;
      }
    }

    /** @private */
    function dx(n) {
      switch (orient) {
        case "left":
        case "right": return (n.maxDepth - n.minDepth) / (1 + depth) * w;
        case "top":
        case "bottom": return (n.maxBreadth - n.minBreadth) * w;
        case "radial": return n.parentNode ? (n.innerRadius + n.outerRadius) * Math.cos(n.midAngle) : 0;
      }
    }

    /** @private */
    function dy(n) {
      switch (orient) {
        case "left":
        case "right": return (n.maxBreadth - n.minBreadth) * h;
        case "top":
        case "bottom": return (n.maxDepth - n.minDepth) / (1 + depth) * h;
        case "radial": return n.parentNode ? (n.innerRadius + n.outerRadius) * Math.sin(n.midAngle) : 0;
      }
    }

    /** @private */
    function innerRadius(n) {
      return Math.max(0, scale(n.minDepth, depth / 2)) * (or - ir) + ir;
    }

    /** @private */
    function outerRadius(n) {
      return scale(n.maxDepth, depth / 2) * (or - ir) + ir;
    }

    /** @private */
    function startAngle(n) {
      return (n.parentNode ? n.minBreadth - .25 : 0) * 2 * Math.PI;
    }

    /** @private */
    function angle(n) {
      return (n.parentNode ? n.maxBreadth - n.minBreadth : 1) * 2 * Math.PI;
    }

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x = x(n);
      n.y = y(n);
      if (orient == "radial") {
        n.innerRadius = innerRadius(n);
        n.outerRadius = outerRadius(n);
        n.startAngle = startAngle(n);
        n.angle = angle(n);
        n.midAngle = n.startAngle + n.angle / 2;
      } else {
        n.midAngle = horizontal ? -Math.PI / 2 : 0;
      }
      n.dx = dx(n);
      n.dy = dy(n);
    }
  }
};
