/** @class Abstract layout for networks. */
pv.Layout.Network = function() {
  pv.Layout.call(this);
  var that = this;

  /**
   * The node prototype. This prototype is intended to be used with a Dot mark
   * in conjunction with the link prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.Network.prototype.node
   */
  this.node = new pv.Mark()
      .data(function() { return that.nodes(); })
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; });

  /** @private Propagate layout mark references to node children. */
  this.node.add = function(type) {
      var mark = that.parent.add(type).extend(this);
      mark.link = that.link;
      mark.node = that.node;
      mark.label = that.label;
      return mark;
    };

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

  /** @private Propagate layout mark references to link children. */
  this.link.add = function(type) {
      var mark = that.parent.add(pv.Panel)
          .data(function() { return that.links(); })
          .add(type).extend(this);
      mark.link = that.link;
      mark.node = that.node;
      mark.label = that.label;
      return mark;
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
  this.label = new pv.Mark()
      .extend(this.node)
      .textMargin(7)
      .textBaseline("middle")
      .text(function(n) { return n.nodeName || n.nodeValue; })
      .textAngle(function(n) {
          var a = n.angle;
          return pv.Wedge.upright(a) ? a : (a + Math.PI);
        })
      .textAlign(function(n) {
          return pv.Wedge.upright(n.angle) ? "left" : "right";
        });

  /** @private Propagate layout mark references to label children. */
  this.label.add = this.node.add;
};

/** @private Transform nodes and links on cast. */
pv.Layout.Network.prototype = pv.extend(pv.Layout)
    .property("nodes", function(v) {
        return v.map(function(d, i) {
            if (typeof d != "object") d = {nodeValue: d};
            d.index = i;
            d.linkDegree = 0;
            return d;
          });
      })
    .property("links", function(v) {
        return v.map(function(d) {
            if (isNaN(d.linkValue)) d.linkValue = isNaN(d.value) ? 1 : d.value;
            return d;
          });
      });

/** @private If the nodes property is changed, unlock the links too. */
pv.Layout.Network.prototype.bind = function() {
  pv.Layout.prototype.bind.call(this);
  var binds = this.binds,
      nodes = binds.properties.nodes,
      links = binds.properties.links;
  if (links && (nodes.id > links.id)) links.id = nodes.id;
};

/** @private Locks node and links after initialization. */
pv.Layout.Network.prototype.init = function() {
  var defs = this.scene.defs;
  if (defs.nodes.id) return true;
  defs.links.id = defs.nodes.id = pv.id();

  /* Compute link degrees; map source and target indexes to nodes. */
  var nodes = this.nodes();
  this.links().forEach(function(d) {
      var s = d.sourceNode || (d.sourceNode = nodes[d.source]),
          t = d.targetNode || (d.targetNode = nodes[d.target]),
          v = d.linkValue;
      s.linkDegree += v;
      t.linkDegree += v;
    });
};
