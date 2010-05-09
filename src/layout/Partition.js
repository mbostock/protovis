/**
 * Constructs a new, empty partition layout. Layouts are not typically
 * constructed directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implemeents a hierarchical layout using the partition (or sunburst,
 * icicle) algorithm. This layout provides both node-link and space-filling
 * implementations of partition diagrams. In many ways it is similar to
 * {@link pv.Layout.Cluster}, except that leaf nodes are positioned based on
 * their distance from the root.
 *
 * <p>The partition layout support dynamic sizing for leaf nodes, if a
 * {@link #size} psuedo-property is specified. The default size function returns
 * 1, causing all leaf nodes to be sized equally, and all internal nodes to be
 * sized by the number of leaf nodes they have as descendants.
 *
 * <p>The size function can be used in conjunction with the order property,
 * which allows the nodes to the sorted by the computed size. Note: for sorting
 * based on other data attributes, simply use the default <tt>null</tt> for the
 * order property, and sort the nodes beforehand using the {@link pv.Dom}
 * operator.
 *
 * <p>For more details on how to use this layout, see
 * {@link pv.Layout.Hierarchy}.
 *
 * @see pv.Layout.Partition.Fill
 * @extends pv.Layout.Hierarchy
 */
pv.Layout.Partition = function() {
  pv.Layout.Hierarchy.call(this);
};

pv.Layout.Partition.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("order", String) // null, ascending, descending?
    .property("orient", String) // top, left, right, bottom, radial
    .property("innerRadius", Number)
    .property("outerRadius", Number);

/**
 * The sibling node order. The default order is <tt>null</tt>, which means to
 * use the sibling order specified by the nodes property as-is. A value of
 * "ascending" will sort siblings in ascending order of size, while "descending"
 * will do the reverse. For sorting based on data attributes other than size,
 * use the default <tt>null</tt> for the order property, and sort the nodes
 * beforehand using the {@link pv.Dom} operator.
 *
 * @see pv.Dom.Node#sort
 * @type string
 * @name pv.Layout.Partition.prototype.order
 */

/**
 * The orientation. The default orientation is "top", which means that the root
 * node is placed on the top edge, leaf nodes appear at the bottom, and internal
 * nodes are in-between. The following orientations are supported:<ul>
 *
 * <li>left - left-to-right.
 * <li>right - right-to-left.
 * <li>top - top-to-bottom.
 * <li>bottom - bottom-to-top.
 * <li>radial - radially, with the root at the center.</ul>
 *
 * @type string
 * @name pv.Layout.Partition.prototype.orient
 */

/**
 * The inner radius; defaults to 0. This property applies only to radial
 * orientations, and can be used to compress the layout radially. Note that for
 * the node-link implementation, the root node is always at the center,
 * regardless of the value of this property; this property only affects internal
 * and leaf nodes. For the space-filling implementation, a non-zero value of
 * this property will result in the root node represented as a ring rather than
 * a circle.
 *
 * @type number
 * @name pv.Layout.Partition.prototype.innerRadius
 */

/**
 * The outer radius; defaults to fill the containing panel, based on the height
 * and width of the layout. If the layout has no height and width specified, it
 * will extend to fill the enclosing panel.
 *
 * @type number
 * @name pv.Layout.Partition.prototype.outerRadius
 */

/**
 * Default properties for partition layouts. The default orientation is "top".
 *
 * @type pv.Layout.Partition
 */
pv.Layout.Partition.prototype.defaults = new pv.Layout.Partition()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .orient("top");

/** @private */
pv.Layout.Partition.prototype.$size = function() { return 1; };

/**
 * Specifies the sizing function. By default, a sizing function is disabled and
 * all nodes are given constant size. The sizing function is invoked for each
 * leaf node in the tree (passed to the constructor).
 *
 * <p>For example, if the tree data structure represents a file system, with
 * files as leaf nodes, and each file has a <tt>bytes</tt> attribute, you can
 * specify a size function as:
 *
 * <pre>    .size(function(d) d.bytes)</pre>
 *
 * As with other properties, a size function may specify additional arguments to
 * access the data associated with the layout and any enclosing panels.
 *
 * @param {function} f the new sizing function.
 * @returns {pv.Layout.Partition} this.
 */
pv.Layout.Partition.prototype.size = function(f) {
  this.$size = f;
  return this;
};

/** @private */
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

/**
 * Constructs a new, empty space-filling partition layout. Layouts are not
 * typically constructed directly; instead, they are added to an existing panel
 * via {@link pv.Mark#add}.
 *
 * @class A variant of partition layout that is space-filling. The meaning of
 * the exported mark prototypes changes slightly in the space-filling
 * implementation:<ul>
 *
 * <li><tt>node</tt> - for rendering nodes; typically a {@link pv.Bar} for
 * non-radial orientations, and a {@link pv.Wedge} for radial orientations.
 *
 * <p><li><tt>link</tt> - unsupported; undefined. Links are encoded implicitly
 * in the arrangement of the space-filling nodes.
 *
 * <p><li><tt>label</tt> - for rendering node labels; typically a
 * {@link pv.Label}.
 *
 * </ul>For more details on how to use this layout, see
 * {@link pv.Layout.Partition}.
 *
 * @extends pv.Layout.Partition
 */
pv.Layout.Partition.Fill = function() {
  pv.Layout.Partition.call(this);
  pv.Layout.Hierarchy.Fill.constructor.call(this);
};

pv.Layout.Partition.Fill.prototype = pv.extend(pv.Layout.Partition);

/** @private */
pv.Layout.Partition.Fill.prototype.buildImplied = function(s) {
  if (pv.Layout.Partition.prototype.buildImplied.call(this, s)) return;
  pv.Layout.Hierarchy.Fill.buildImplied.call(this, s);
};
