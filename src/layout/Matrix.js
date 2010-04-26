/**
 * @class
 * @extends pv.Layout.Network
 * @constructor
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
      .left(function() { return this.index & 1 ? dx * ((this.index >> 1) + .5) : null; })
      .top(function() { return this.index & 1 ? null : dy * ((this.index >> 1) + .5); })
      .textMargin(4)
      .textAlign(function() { return this.index & 1 ? "left" : "right"; })
      .textAngle(function() { return this.index & 1 ? -Math.PI / 2 : 0; });

  /* The node mark is unused. */
  delete this.node;
};

pv.Layout.Matrix.prototype = pv.extend(pv.Layout.Network)
    .property("directed", Boolean);

/**
 * @type boolean
 * @name pv.Layout.Matrix.prototype.directed
 */

/**
 * Specifies an optional sort function.
 *
 * @param {function} f
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
