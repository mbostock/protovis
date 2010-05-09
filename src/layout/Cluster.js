/**
 * Constructs a new, empty cluster layout. Layouts are not typically
 * constructed directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implements a hierarchical layout using the cluster (or dendrogram)
 * algorithm. This layout provides both node-link and space-filling
 * implementations of cluster diagrams. In many ways it is similar to
 * {@link pv.Layout.Partition}, except that leaf nodes are positioned at maximum
 * depth, and the depth of internal nodes is based on their distance from their
 * deepest descendant, rather than their distance from the root.
 *
 * <p>The cluster layout supports a "group" property, which if true causes
 * siblings to be positioned closer together than unrelated nodes at the same
 * depth. Unlike the partition layout, this layout does not support dynamic
 * sizing for leaf nodes; all leaf nodes are the same size.
 *
 * <p>For more details on how to use this layout, see
 * {@link pv.Layout.Hierarchy}.
 *
 * @see pv.Layout.Cluster.Fill
 * @extends pv.Layout.Hierarchy
 */
pv.Layout.Cluster = function() {
  pv.Layout.Hierarchy.call(this);
  var interpolate, // cached interpolate
      buildImplied = this.buildImplied;

  /** @private Cache layout state to optimize properties. */
  this.buildImplied = function(s) {
    buildImplied.call(this, s);
    interpolate
        = /^(top|bottom)$/.test(s.orient) ? "step-before"
        : /^(left|right)$/.test(s.orient) ? "step-after"
        : "linear";
  };

  this.link.interpolate(function() { return interpolate; });
};

pv.Layout.Cluster.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("group", Number)
    .property("orient", String)
    .property("innerRadius", Number)
    .property("outerRadius", Number);

/**
 * The group parameter; defaults to 0, disabling grouping of siblings. If this
 * parameter is set to a positive number (or true, which is equivalent to 1),
 * then additional space will be allotted between sibling groups. In other
 * words, siblings (nodes that share the same parent) will be positioned more
 * closely than nodes at the same depth that do not share a parent.
 *
 * @type number
 * @name pv.Layout.Cluster.prototype.group
 */

/**
 * The orientation. The default orientation is "top", which means that the root
 * node is placed on the top edge, leaf nodes appear on the bottom edge, and
 * internal nodes are in-between. The following orientations are supported:<ul>
 *
 * <li>left - left-to-right.
 * <li>right - right-to-left.
 * <li>top - top-to-bottom.
 * <li>bottom - bottom-to-top.
 * <li>radial - radially, with the root at the center.</ul>
 *
 * @type string
 * @name pv.Layout.Cluster.prototype.orient
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
 * @name pv.Layout.Cluster.prototype.innerRadius
 */

/**
 * The outer radius; defaults to fill the containing panel, based on the height
 * and width of the layout. If the layout has no height and width specified, it
 * will extend to fill the enclosing panel.
 *
 * @type number
 * @name pv.Layout.Cluster.prototype.outerRadius
 */

/**
 * Defaults for cluster layouts. The default group parameter is 0 and the
 * default orientation is "top".
 *
 * @type pv.Layout.Cluster
 */
pv.Layout.Cluster.prototype.defaults = new pv.Layout.Cluster()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .group(0)
    .orient("top");

/** @private */
pv.Layout.Cluster.prototype.buildImplied = function(s) {
  if (pv.Layout.Hierarchy.prototype.buildImplied.call(this, s)) return;

  var root = s.nodes[0],
      group = s.group,
      breadth,
      depth,
      leafCount = 0,
      leafIndex = .5 - group / 2;

  /* Count the leaf nodes and compute the depth of descendants. */
  var p = undefined;
  root.visitAfter(function(n) {
      if (n.firstChild) {
        n.depth = 1 + pv.max(n.childNodes, function(n) { return n.depth; });
      } else {
        if (group && (p != n.parentNode)) {
          p = n.parentNode;
          leafCount += group;
        }
        leafCount++;
        n.depth = 0;
      }
    });
  breadth = 1 / leafCount;
  depth = 1 / root.depth;

  /* Compute the unit breadth and depth of each node. */
  var p = undefined;
  root.visitAfter(function(n) {
      if (n.firstChild) {
        n.breadth = pv.mean(n.childNodes, function(n) { return n.breadth; });
      } else {
        if (group && (p != n.parentNode)) {
          p = n.parentNode;
          leafIndex += group;
        }
        n.breadth = breadth * leafIndex++;
      }
      n.depth = 1 - n.depth * depth;
    });

  /* Compute breadth and depth ranges for space-filling layouts. */
  root.visitAfter(function(n) {
      n.minBreadth = n.firstChild
          ? n.firstChild.minBreadth
          : (n.breadth - breadth / 2);
      n.maxBreadth = n.firstChild
          ? n.lastChild.maxBreadth
          : (n.breadth + breadth / 2);
    });
  root.visitBefore(function(n) {
      n.minDepth = n.parentNode
          ? n.parentNode.maxDepth
          : 0;
      n.maxDepth = n.parentNode
          ? (n.depth + root.depth)
          : (n.minDepth + 2 * root.depth);
    });
  root.minDepth = -depth;

  pv.Layout.Hierarchy.NodeLink.buildImplied.call(this, s);
};

/**
 * Constructs a new, empty space-filling cluster layout. Layouts are not
 * typically constructed directly; instead, they are added to an existing panel
 * via {@link pv.Mark#add}.
 *
 * @class A variant of cluster layout that is space-filling. The meaning of the
 * exported mark prototypes changes slightly in the space-filling
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
 * {@link pv.Layout.Cluster}.
 *
 * @extends pv.Layout.Cluster
 */
pv.Layout.Cluster.Fill = function() {
  pv.Layout.Cluster.call(this);
  pv.Layout.Hierarchy.Fill.constructor.call(this);
};

pv.Layout.Cluster.Fill.prototype = pv.extend(pv.Layout.Cluster);

/** @private */
pv.Layout.Cluster.Fill.prototype.buildImplied = function(s) {
  if (pv.Layout.Cluster.prototype.buildImplied.call(this, s)) return;
  pv.Layout.Hierarchy.Fill.buildImplied.call(this, s);
};
