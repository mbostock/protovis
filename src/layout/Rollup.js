/**
 * @class
 * @extends pv.Layout.Network
 * @constructor
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
 * @type boolean
 * @name pv.Layout.Rollup.prototype.directed
 */

/**
 * @param {function} f
 * @returns {pv.Layout.Rollup} this.
 */
pv.Layout.Rollup.prototype.x = function(f) {
  this.$x = pv.functor(f);
  return this;
};

/**
 * @param {function} f
 * @returns {pv.Layout.Rollup} this.
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
