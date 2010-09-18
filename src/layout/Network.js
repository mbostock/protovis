/**
 * Constructs a new, empty network layout. Layouts are not typically constructed
 * directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Represents an abstract layout for network diagrams. This class
 * provides the basic structure for both node-link diagrams (such as
 * force-directed graph layout) and space-filling network diagrams (such as
 * sunbursts and treemaps). Note that "network" here is a general term that
 * includes hierarchical structures; a tree is represented using links from
 * child to parent.
 *
 * <p>Network layouts require the graph data structure to be defined using two
 * properties:<ul>
 *
 * <li><tt>nodes</tt> - an array of objects representing nodes. Objects in this
 * array must conform to the {@link pv.Layout.Network.Node} interface; which is
 * to say, be careful to avoid naming collisions with automatic attributes such
 * as <tt>index</tt> and <tt>linkDegree</tt>. If the nodes property is defined
 * as an array of primitives, such as numbers or strings, these primitives are
 * automatically wrapped in an object; the resulting object's <tt>nodeValue</tt>
 * attribute points to the original primitive value.
 *
 * <p><li><tt>links</tt> - an array of objects representing links. Objects in
 * this array must conform to the {@link pv.Layout.Network.Link} interface; at a
 * minimum, either <tt>source</tt> and <tt>target</tt> indexes or
 * <tt>sourceNode</tt> and <tt>targetNode</tt> references must be set. Note that
 * if the links property is defined after the nodes property, the links can be
 * defined in terms of <tt>this.nodes()</tt>.
 *
 * </ul>
 *
 * <p>Three standard mark prototypes are provided:<ul>
 *
 * <li><tt>node</tt> - for rendering nodes; typically a {@link pv.Dot}. The node
 * mark is added directly to the layout, with the data property defined via the
 * layout's <tt>nodes</tt> property. Properties such as <tt>strokeStyle</tt> and
 * <tt>fillStyle</tt> can be overridden to compute properties from node data
 * dynamically.
 *
 * <p><li><tt>link</tt> - for rendering links; typically a {@link pv.Line}. The
 * link mark is added to a child panel, whose data property is defined as
 * layout's <tt>links</tt> property. The link's data property is then a
 * two-element array of the source node and target node. Thus, poperties such as
 * <tt>strokeStyle</tt> and <tt>fillStyle</tt> can be overridden to compute
 * properties from either the node data (the first argument) or the link data
 * (the second argument; the parent panel data) dynamically.
 *
 * <p><li><tt>label</tt> - for rendering node labels; typically a
 * {@link pv.Label}. The label mark is added directly to the layout, with the
 * data property defined via the layout's <tt>nodes</tt> property. Properties
 * such as <tt>strokeStyle</tt> and <tt>fillStyle</tt> can be overridden to
 * compute properties from node data dynamically.
 *
 * </ul>Note that some network implementations may not support all three
 * standard mark prototypes; for example, space-filling hierarchical layouts
 * typically do not use a <tt>link</tt> prototype, as the parent-child links are
 * implied by the structure of the space-filling <tt>node</tt> marks.  Check the
 * specific network layout for implementation details.
 *
 * <p>Network layout properties, including <tt>nodes</tt> and <tt>links</tt>,
 * are typically cached rather than re-evaluated with every call to render. This
 * is a performance optimization, as network layout algorithms can be
 * expensive. If the network structure changes, call {@link #reset} to clear the
 * cache before rendering. Note that although the network layout properties are
 * cached, child mark properties, such as the marks used to render the nodes and
 * links, <i>are not</i>. Therefore, non-structural changes to the network
 * layout, such as changing the color of a mark on mouseover, do not need to
 * reset the layout.
 *
 * @see pv.Layout.Hierarchy
 * @see pv.Layout.Force
 * @see pv.Layout.Matrix
 * @see pv.Layout.Arc
 * @see pv.Layout.Rollup
 * @extends pv.Layout
 */
pv.Layout.Network = function() {
  pv.Layout.call(this);
  var that = this;

  /* @private Version tracking to cache layout state, improving performance. */
  this.$id = pv.id();

  /**
   * The node prototype. This prototype is intended to be used with a Dot mark
   * in conjunction with the link prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.Network.prototype.node
   */
  (this.node = new pv.Mark()
      .data(function() { return that.nodes(); })
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; })).parent = this;

  /**
   * The link prototype, which renders edges between source nodes and target
   * nodes. This prototype is intended to be used with a Line mark in
   * conjunction with the node prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.Network.prototype.link
   */
  this.link = new pv.Mark()
      .extend(this.node)
      .data(function(p) { return [p.sourceNode, p.targetNode]; })
      .fillStyle(null)
      .lineWidth(function(d, p) { return p.linkValue * 1.5; })
      .strokeStyle("rgba(0,0,0,.2)");

  this.link.add = function(type) {
    return that.add(pv.Panel)
        .data(function() { return that.links(); })
      .add(type)
        .extend(this);
  };

  /**
   * The node label prototype, which renders the node name adjacent to the node.
   * This prototype is provided as an alternative to using the anchor on the
   * node mark; it is primarily intended to be used with radial node-link
   * layouts, since it provides a convenient mechanism to set the text angle.
   *
   * @type pv.Mark
   * @name pv.Layout.Network.prototype.label
   */
  (this.label = new pv.Mark()
      .extend(this.node)
      .textMargin(7)
      .textBaseline("middle")
      .text(function(n) { return n.nodeName || n.nodeValue; })
      .textAngle(function(n) {
          var a = n.midAngle;
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textAlign(function(n) {
          return pv.Wedge.upright(n.midAngle) ? "left" : "right";
        })).parent = this;
};

/**
 * @class Represents a node in a network layout. There is no explicit
 * constructor; this class merely serves to document the attributes that are
 * used on nodes in network layouts. (Note that hierarchical nodes place
 * additional requirements on node representation, vis {@link pv.Dom.Node}.)
 *
 * @see pv.Layout.Network
 * @name pv.Layout.Network.Node
 */

/**
 * The node index, zero-based. This attribute is populated automatically based
 * on the index in the array returned by the <tt>nodes</tt> property.
 *
 * @type number
 * @name pv.Layout.Network.Node.prototype.index
 */

/**
 * The link degree; the sum of link values for all incoming and outgoing links.
 * This attribute is populated automatically.
 *
 * @type number
 * @name pv.Layout.Network.Node.prototype.linkDegree
 */

/**
 * The node name; optional. If present, this attribute will be used to provide
 * the text for node labels. If not present, the label text will fallback to the
 * <tt>nodeValue</tt> attribute.
 *
 * @type string
 * @name pv.Layout.Network.Node.prototype.nodeName
 */

/**
 * The node value; optional. If present, and no <tt>nodeName</tt> attribute is
 * present, the node value will be used as the label text. This attribute is
 * also automatically populated if the nodes are specified as an array of
 * primitives, such as strings or numbers.
 *
 * @type object
 * @name pv.Layout.Network.Node.prototype.nodeValue
 */

/**
 * @class Represents a link in a network layout. There is no explicit
 * constructor; this class merely serves to document the attributes that are
 * used on links in network layouts. For hierarchical layouts, this class is
 * used to represent the parent-child links.
 *
 * @see pv.Layout.Network
 * @name pv.Layout.Network.Link
 */

/**
 * The link value, or weight; optional. If not specified (or not a number), the
 * default value of 1 is used.
 *
 * @type number
 * @name pv.Layout.Network.Link.prototype.linkValue
 */

/**
 * The link's source node. If not set, this value will be derived from the
 * <tt>source</tt> attribute index.
 *
 * @type pv.Layout.Network.Node
 * @name pv.Layout.Network.Link.prototype.sourceNode
 */

/**
 * The link's target node. If not set, this value will be derived from the
 * <tt>target</tt> attribute index.
 *
 * @type pv.Layout.Network.Node
 * @name pv.Layout.Network.Link.prototype.targetNode
 */

/**
 * Alias for <tt>sourceNode</tt>, as expressed by the index of the source node.
 * This attribute is not populated automatically, but may be used as a more
 * convenient identification of the link's source, for example in a static JSON
 * representation.
 *
 * @type number
 * @name pv.Layout.Network.Link.prototype.source
 */

/**
 * Alias for <tt>targetNode</tt>, as expressed by the index of the target node.
 * This attribute is not populated automatically, but may be used as a more
 * convenient identification of the link's target, for example in a static JSON
 * representation.
 *
 * @type number
 * @name pv.Layout.Network.Link.prototype.target
 */

/**
 * Alias for <tt>linkValue</tt>. This attribute is not populated automatically,
 * but may be used instead of the <tt>linkValue</tt> attribute when specifying
 * links.
 *
 * @type number
 * @name pv.Layout.Network.Link.prototype.value
 */

/** @private Transform nodes and links on cast. */
pv.Layout.Network.prototype = pv.extend(pv.Layout)
    .property("nodes", function(v) {
        return v.map(function(d, i) {
            if (typeof d != "object") d = {nodeValue: d};
            d.index = i;
            return d;
          });
      })
    .property("links", function(v) {
        return v.map(function(d) {
            if (isNaN(d.linkValue)) d.linkValue = isNaN(d.value) ? 1 : d.value;
            return d;
          });
      });

/**
 * Resets the cache, such that changes to layout property definitions will be
 * visible on subsequent render. Unlike normal marks (and normal layouts),
 * properties associated with network layouts are not automatically re-evaluated
 * on render; the properties are cached, and any expensive layout algorithms are
 * only run after the layout is explicitly reset.
 *
 * @returns {pv.Layout.Network} this.
 */
pv.Layout.Network.prototype.reset = function() {
  this.$id = pv.id();
  return this;
};

/** @private Skip evaluating properties if cached. */
pv.Layout.Network.prototype.buildProperties = function(s, properties) {
  if ((s.$id || 0) < this.$id) {
    pv.Layout.prototype.buildProperties.call(this, s, properties);
  }
};

/** @private Compute link degrees; map source and target indexes to nodes. */
pv.Layout.Network.prototype.buildImplied = function(s) {
  pv.Layout.prototype.buildImplied.call(this, s);
  if (s.$id >= this.$id) return true;
  s.$id = this.$id;
  s.nodes.forEach(function(d) {
      d.linkDegree = 0;
    });
  s.links.forEach(function(d) {
      var v = d.linkValue;
      (d.sourceNode || (d.sourceNode = s.nodes[d.source])).linkDegree += v;
      (d.targetNode || (d.targetNode = s.nodes[d.target])).linkDegree += v;
    });
};
