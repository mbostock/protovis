/**
 * Constructs a new, empty matrix network layout. Layouts are not typically
 * constructed directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implements a network visualization using a matrix view. This is, in
 * effect, a visualization of the graph's <i>adjacency matrix</i>: the cell at
 * row <i>i</i>, column <i>j</i>, corresponds to the link from node <i>i</i> to
 * node <i>j</i>. The fill color of each cell is binary by default, and
 * corresponds to whether a link exists between the two nodes. If the underlying
 * graph has links with variable values, the <tt>fillStyle</tt> property can be
 * substited to use an appropriate color function, such as {@link pv.ramp}.
 *
 * <p>For undirected networks, the matrix is symmetric around the diagonal. For
 * directed networks, links in opposite directions can be rendered on opposite
 * sides of the diagonal using <tt>directed(true)</tt>. The graph is assumed to
 * be undirected by default.
 *
 * <p>The mark prototypes for this network layout are slightly different than
 * other implementations:<ul>
 *
 * <li><tt>node</tt> - unsupported; undefined. No mark is needed to visualize
 * nodes directly, as the nodes are implicit in the location (rows and columns)
 * of the links.
 *
 * <p><li><tt>link</tt> - for rendering links; typically a {@link pv.Bar}. The
 * link mark is added directly to the layout, with the data property defined as
 * all possible pairs of nodes. Each pair is represented as a
 * {@link pv.Network.Layout.Link}, though the <tt>linkValue</tt> attribute may
 * be 0 if no link exists in the graph.
 *
 * <p><li><tt>label</tt> - for rendering node labels; typically a
 * {@link pv.Label}. The label mark is added directly to the layout, with the
 * data property defined via the layout's <tt>nodes</tt> property; note,
 * however, that the nodes are duplicated so as to provide a label across the
 * top and down the side. Properties such as <tt>strokeStyle</tt> and
 * <tt>fillStyle</tt> can be overridden to compute properties from node data
 * dynamically.
 *
 * </ul>For more details on how to use this layout, see
 * {@link pv.Layout.Network}.
 *
 * @extends pv.Layout.Network
 */
pv.Layout.Matrix = function() {
  pv.Layout.Network.call(this);
  var that = this,
      n, // cached matrix size
      dx, // cached cell width
      dy, // cached cell height
      labels, // cached labels (array of strings)
      pairs, // cached pairs (array of links)
      buildImplied = that.buildImplied;

  /** @private Cache layout state to optimize properties. */
  this.buildImplied = function(s) {
    buildImplied.call(this, s);
    n = s.nodes.length;
    dx = s.width / n;
    dy = s.height / n;
    labels = s.$matrix.labels;
    pairs = s.$matrix.pairs;
  };

  /* Links are all pairs of nodes. */
  this.link
      .data(function() { return pairs; })
      .left(function() { return dx * (this.index % n); })
      .top(function() { return dy * Math.floor(this.index / n); })
      .width(function() { return dx; })
      .height(function() { return dy; })
      .lineWidth(1.5)
      .strokeStyle("#fff")
      .fillStyle(function(l) { return l.linkValue ? "#555" : "#eee"; })
      .parent = this;

  /* No special add for links! */
  delete this.link.add;

  /* Labels are duplicated for top & left. */
  this.label
      .data(function() { return labels; })
      .left(function() { return this.index & 1 ? dx * ((this.index >> 1) + .5) : 0; })
      .top(function() { return this.index & 1 ? 0 : dy * ((this.index >> 1) + .5); })
      .textMargin(4)
      .textAlign(function() { return this.index & 1 ? "left" : "right"; })
      .textAngle(function() { return this.index & 1 ? -Math.PI / 2 : 0; });

  /* The node mark is unused. */
  delete this.node;
};

pv.Layout.Matrix.prototype = pv.extend(pv.Layout.Network)
    .property("directed", Boolean);

/**
 * Whether this matrix visualization is directed (bidirectional). By default,
 * the graph is assumed to be undirected, such that the visualization is
 * symmetric across the matrix diagonal. If the network is directed, then
 * forward links are drawn above the diagonal, while reverse links are drawn
 * below.
 *
 * @type boolean
 * @name pv.Layout.Matrix.prototype.directed
 */

/**
 * Specifies an optional sort function. The sort function follows the same
 * comparator contract required by {@link pv.Dom.Node#sort}. Specifying a sort
 * function provides an alternative to sort the nodes as they are specified by
 * the <tt>nodes</tt> property; the main advantage of doing this is that the
 * comparator function can access implicit fields populated by the network
 * layout, such as the <tt>linkDegree</tt>.
 *
 * <p>Note that matrix visualizations are particularly sensitive to order. This
 * is referred to as the seriation problem, and many different techniques exist
 * to find good node orders that emphasize clusters, such as spectral layout and
 * simulated annealing.
 *
 * @param {function} f comparator function for nodes.
 * @returns {pv.Layout.Matrix} this.
 */
pv.Layout.Matrix.prototype.sort = function(f) {
  this.$sort = f;
  return this;
};

/** @private */
pv.Layout.Matrix.prototype.buildImplied = function(s) {
  if (pv.Layout.Network.prototype.buildImplied.call(this, s)) return;

  var nodes = s.nodes,
      links = s.links,
      sort = this.$sort,
      n = nodes.length,
      index = pv.range(n),
      labels = [],
      pairs = [],
      map = {};

  s.$matrix = {labels: labels, pairs: pairs};

  /* Sort the nodes. */
  if (sort) index.sort(function(a, b) { return sort(nodes[a], nodes[b]); });

  /* Create pairs. */
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      var a = index[i],
          b = index[j],
          p = {
            row: i,
            col: j,
            sourceNode: nodes[a],
            targetNode: nodes[b],
            linkValue: 0
          };
      pairs.push(map[a + "." + b] = p);
    }
  }

  /* Create labels. */
  for (var i = 0; i < n; i++) {
    var a = index[i];
    labels.push(nodes[a], nodes[a]);
  }

  /* Accumulate link values. */
  for (var i = 0; i < links.length; i++) {
    var l = links[i],
        source = l.sourceNode.index,
        target = l.targetNode.index,
        value = l.linkValue;
    map[source + "." + target].linkValue += value;
    if (!s.directed) map[target + "." + source].linkValue += value;
  }
};
