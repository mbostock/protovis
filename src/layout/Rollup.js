/**
 * Constructs a new, empty rollup network layout. Layouts are not typically
 * constructed directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implements a network visualization using a node-link diagram where
 * nodes are rolled up along two dimensions. This implementation is based on the
 * "PivotGraph" designed by Martin Wattenberg:
 *
 * <blockquote>The method is designed for graphs that are "multivariate", i.e.,
 * where each node is associated with several attributes. Unlike visualizations
 * which emphasize global graph topology, PivotGraph uses a simple grid-based
 * approach to focus on the relationship between node attributes &amp;
 * connections.</blockquote>
 *
 * This layout requires two psuedo-properties to be specified, which assign node
 * positions along the two dimensions {@link #x} and {@link #y}, corresponding
 * to the left and top properties, respectively. Typically, these functions are
 * specified using an {@link pv.Scale.ordinal}. Nodes that share the same
 * position in <i>x</i> and <i>y</i> are "rolled up" into a meta-node, and
 * similarly links are aggregated between meta-nodes. For example, to construct
 * a rollup to analyze links by gender and affiliation, first define two ordinal
 * scales:
 *
 * <pre>var x = pv.Scale.ordinal(nodes, function(d) d.gender).split(0, w),
 *     y = pv.Scale.ordinal(nodes, function(d) d.aff).split(0, h);</pre>
 *
 * Next, define the position psuedo-properties:
 *
 * <pre>    .x(function(d) x(d.gender))
 *     .y(function(d) y(d.aff))</pre>
 *
 * Linear and other quantitative scales can alternatively be used to position
 * the nodes along either dimension. Note, however, that the rollup requires
 * that the positions match exactly, and thus ordinal scales are recommended to
 * avoid precision errors.
 *
 * <p>Note that because this layout provides a visualization of the rolled up
 * graph, the data properties for the mark prototypes (<tt>node</tt>,
 * <tt>link</tt> and <tt>label</tt>) are different from most other network
 * layouts: they reference the rolled-up nodes and links, rather than the nodes
 * and links of the full network. The underlying nodes and links for each
 * rolled-up node and link can be accessed via the <tt>nodes</tt> and
 * <tt>links</tt> attributes, respectively. The aggregated link values for
 * rolled-up links can similarly be accessed via the <tt>linkValue</tt>
 * attribute.
 *
 * <p>For undirected networks, links are duplicated in both directions. For
 * directed networks, use <tt>directed(true)</tt>. The graph is assumed to be
 * undirected by default.
 *
 * @extends pv.Layout.Network
 * @see <a href="http://www.research.ibm.com/visual/papers/pivotgraph.pdf"
 * >"Visual Exploration of Multivariate Graphs"</a> by M. Wattenberg, CHI 2006.
 */
pv.Layout.Rollup = function() {
  pv.Layout.Network.call(this);
  var that = this,
      nodes, // cached rollup nodes
      links, // cached rollup links
      buildImplied = that.buildImplied;

  /** @private Cache layout state to optimize properties. */
  this.buildImplied = function(s) {
    buildImplied.call(this, s);
    nodes = s.$rollup.nodes;
    links = s.$rollup.links;
  };

  /* Render rollup nodes. */
  this.node
      .data(function() { return nodes; })
      .size(function(d) { return d.nodes.length * 20; });

  /* Render rollup links. */
  this.link
      .interpolate("polar")
      .eccentricity(.8);

  this.link.add = function(type) {
    return that.add(pv.Panel)
        .data(function() { return links; })
      .add(type)
        .extend(this);
  };
};

pv.Layout.Rollup.prototype = pv.extend(pv.Layout.Network)
    .property("directed", Boolean);

/**
 * Whether the underlying network is directed. By default, the graph is assumed
 * to be undirected, and links are rendered in both directions. If the network
 * is directed, then forward links are drawn above the diagonal, while reverse
 * links are drawn below.
 *
 * @type boolean
 * @name pv.Layout.Rollup.prototype.directed
 */

/**
 * Specifies the <i>x</i>-position function used to rollup nodes. The rolled up
 * nodes are positioned horizontally using the return values from the given
 * function. Typically the function is specified as an ordinal scale. For
 * single-dimension rollups, a constant value can be specified.
 *
 * @param {function} f the <i>x</i>-position function.
 * @returns {pv.Layout.Rollup} this.
 * @see pv.Scale.ordinal
 */
pv.Layout.Rollup.prototype.x = function(f) {
  this.$x = pv.functor(f);
  return this;
};

/**
 * Specifies the <i>y</i>-position function used to rollup nodes. The rolled up
 * nodes are positioned vertically using the return values from the given
 * function. Typically the function is specified as an ordinal scale. For
 * single-dimension rollups, a constant value can be specified.
 *
 * @param {function} f the <i>y</i>-position function.
 * @returns {pv.Layout.Rollup} this.
 * @see pv.Scale.ordinal
 */
pv.Layout.Rollup.prototype.y = function(f) {
  this.$y = pv.functor(f);
  return this;
};

/** @private */
pv.Layout.Rollup.prototype.buildImplied = function(s) {
  if (pv.Layout.Network.prototype.buildImplied.call(this, s)) return;

  var nodes = s.nodes,
      links = s.links,
      directed = s.directed,
      n = nodes.length,
      x = [],
      y = [],
      rnindex = 0,
      rnodes = {},
      rlinks = {};

  /** @private */
  function id(i) {
    return x[i] + "," + y[i];
  }

  /* Iterate over the data, evaluating the x and y functions. */
  var stack = pv.Mark.stack, o = {parent: this};
  stack.unshift(null);
  for (var i = 0; i < n; i++) {
    o.index = i;
    stack[0] = nodes[i];
    x[i] = this.$x.apply(o, stack);
    y[i] = this.$y.apply(o, stack);
  }
  stack.shift();

  /* Compute rollup nodes. */
  for (var i = 0; i < nodes.length; i++) {
    var nodeId = id(i),
        rn = rnodes[nodeId];
    if (!rn) {
      rn = rnodes[nodeId] = pv.extend(nodes[i]);
      rn.index = rnindex++;
      rn.x = x[i];
      rn.y = y[i];
      rn.nodes = [];
    }
    rn.nodes.push(nodes[i]);
  }

  /* Compute rollup links. */
  for (var i = 0; i < links.length; i++) {
    var source = links[i].sourceNode,
        target = links[i].targetNode,
        rsource = rnodes[id(source.index)],
        rtarget = rnodes[id(target.index)],
        reverse = !directed && rsource.index > rtarget.index,
        linkId = reverse
            ? rtarget.index + "," + rsource.index
            : rsource.index + "," + rtarget.index,
        rl = rlinks[linkId];
    if (!rl) {
      rl = rlinks[linkId] = {
        sourceNode: rsource,
        targetNode: rtarget,
        linkValue: 0,
        links: []
      };
    }
    rl.links.push(links[i]);
    rl.linkValue += links[i].linkValue;
  }

  /* Export the rolled up nodes and links to the scene. */
  s.$rollup = {
    nodes: pv.values(rnodes),
    links: pv.values(rlinks)
  };
};
