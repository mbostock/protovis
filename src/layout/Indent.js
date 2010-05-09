/**
 * Constructs a new, empty indent layout. Layouts are not typically constructed
 * directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implements a hierarchical layout using the indent algorithm. This
 * layout implements a node-link diagram where the nodes are presented in
 * preorder traversal, and nodes are indented based on their depth from the
 * root. This technique is used ubiquitously by operating systems to represent
 * file directories; although it requires much vertical space, indented trees
 * allow efficient <i>interactive</i> exploration of trees to find a specific
 * node. In addition they allow rapid scanning of node labels, and multivariate
 * data such as file sizes can be displayed adjacent to the hierarchy.
 *
 * <p>The indent layout can be configured using the <tt>depth</tt> and
 * <tt>breadth</tt> properties, which control the increments in pixel space for
 * each indent and row in the layout. This layout does not support multiple
 * orientations; the root node is rendered in the top-left, while
 * <tt>breadth</tt> is a vertical offset from the top, and <tt>depth</tt> is a
 * horizontal offset from the left.
 *
 * <p>For more details on how to use this layout, see
 * {@link pv.Layout.Hierarchy}.
 *
 * @extends pv.Layout.Hierarchy
 */
pv.Layout.Indent = function() {
  pv.Layout.Hierarchy.call(this);
  this.link.interpolate("step-after");
};

pv.Layout.Indent.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("depth", Number)
    .property("breadth", Number);

/**
 * The horizontal offset between different levels of the tree; defaults to 15.
 *
 * @type number
 * @name pv.Layout.Indent.prototype.depth
 */

/**
 * The vertical offset between nodes; defaults to 15.
 *
 * @type number
 * @name pv.Layout.Indent.prototype.breadth
 */

/**
 * Default properties for indent layouts. By default the depth and breadth
 * offsets are 15 pixels.
 *
 * @type pv.Layout.Indent
 */
pv.Layout.Indent.prototype.defaults = new pv.Layout.Indent()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .depth(15)
    .breadth(15);

/** @private */
pv.Layout.Indent.prototype.buildImplied = function(s) {
  if (pv.Layout.Hierarchy.prototype.buildImplied.call(this, s)) return;

  var nodes = s.nodes,
      bspace = s.breadth,
      dspace = s.depth,
      ax = 0,
      ay = 0;

  /** @private */
  function position(n, breadth, depth) {
    n.x = ax + depth++ * dspace;
    n.y = ay + breadth++ * bspace;
    n.midAngle = 0;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      breadth = position(c, breadth, depth);
    }
    return breadth;
  }

  position(nodes[0], 1, 1);
};
