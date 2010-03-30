pv.Layout.Matrix = function() {
  pv.Layout.Network.call(this);
  var that = this;

  /** @private */
  function s() {
    return that.scene.$matrix;
  }

  /* Links are all pairs of nodes. */
  this.link
      .data(function() { return s().pairs; })
      .left(function() { return s().dx * (this.index % s().n); })
      .top(function() { return s().dy * Math.floor(this.index / s().n); })
      .width(function() { return s().dx; })
      .height(function() { return s().dy; })
      .lineWidth(1.5)
      .strokeStyle("#fff")
      .fillStyle(function(l) { return l.linkValue ? "#555" : "#eee"; })
      .parent = this;

  /* No special add for links! */
  delete this.link.add;

  /* Labels are duplicated for top & left. */
  this.label
      .data(function() { return s().labels; })
      .left(function() { return this.index & 1 ? s().dx * ((this.index >> 1) + .5) : null; })
      .top(function() { return this.index & 1 ? null : s().dy * ((this.index >> 1) + .5); })
      .textMargin(4)
      .textAlign(function() { return this.index & 1 ? "left" : "right"; })
      .textAngle(function() { return this.index & 1 ? -Math.PI / 2 : 0; });

  /* The node mark is unused. */
  delete this.node;
};

pv.Layout.Matrix.prototype = pv.extend(pv.Layout.Network)
    .property("directed", Boolean);

/** Specifies an optional sort function. */
pv.Layout.Matrix.prototype.sort = function(f) {
  this.$sort = f;
  return this;
};

/** @private */
pv.Layout.Matrix.prototype.init = function() {
  if (pv.Layout.Network.prototype.init.call(this)) return;
  var nodes = this.nodes(),
      links = this.links(),
      directed = this.directed(),
      sort = this.$sort,
      n = nodes.length,
      index = pv.range(n),
      matrix = this.scene.$matrix = {
        n: n,
        dx: this.parent.width() / n,
        dy: this.parent.height() / n,
        labels: [],
        pairs: []
      },
      map = {};

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
      matrix.pairs.push(map[a + "." + b] = p);
    }
  }

  /* Create labels. */
  for (var i = 0; i < n; i++) {
    var a = index[i];
    matrix.labels.push(nodes[a], nodes[a]);
  }

  /* Accumulate link values. */
  for (var i = 0; i < links.length; i++) {
    var l = links[i],
        source = l.sourceNode.index,
        target = l.targetNode.index,
        value = l.linkValue;
    map[source + "." + target].linkValue += value;
    if (!directed) map[target + "." + source].linkValue += value;
  }
};
