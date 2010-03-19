pv.Layout.Rollup = function() {
  pv.Layout.Network.call(this);
  var that = this;

  /* Evaluate positional properties on each node. */
  this.data(function() { return that.nodes(); });

  /* Render rollup nodes. */
  this.node
      .data(function() { return that.scene.$rollup.nodes; })
      .size(function(d) { return d.nodes.length * 20; });

  /* Render rollup links. */
  var add = this.link.add;
  this.link.add = function(type) {
      var mark = add.call(this, type);
      mark.parent.data(function() { return that.scene.$rollup.links; });
      return mark;
    };
};

pv.Layout.Rollup.prototype = pv.extend(pv.Layout.Network)
    .property("directed", Boolean);

pv.Layout.Rollup.prototype.init = function() {
  if (pv.Layout.Network.prototype.init.call(this)) return;
  delete this.scene.$rollup;
};

pv.Layout.Rollup.prototype.build = function() {
  pv.Layout.Network.prototype.build.call(this);
  if (this.scene.$rollup) return;
  var scene = this.scene,
      nodes = this.nodes(),
      links = this.links(),
      directed = this.directed(),
      rnindex = 0,
      rnodes = {},
      rlinks = {};

  /** @private */
  function id(i) {
    return scene[i].left + "," + scene[i].top;
  }

  /* Compute rollup nodes. */
  for (var i = 0; i < nodes.length; i++) {
    var nodeId = id(i),
        rn = rnodes[nodeId];
    if (!rn) {
      rn = rnodes[nodeId] = pv.extend(nodes[i]);
      rn.index = rnindex++;
      rn.x = scene[i].left;
      rn.y = scene[i].top;
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
  this.scene.$rollup = {
    nodes: pv.values(rnodes),
    links: pv.values(rlinks)
  };
};
