/** @class Abstract layout for hierarchies. */
pv.Layout.Hierarchy = function() {
  pv.Layout.Network.call(this);
};

pv.Layout.Hierarchy.prototype = pv.extend(pv.Layout.Network);

/** @private Alias the data property to nodes. */
pv.Layout.Hierarchy.prototype.data = pv.Layout.Hierarchy.prototype.nodes;

/** @private Compute the default links from child to parent. */
pv.Layout.Hierarchy.prototype.init = function() {
  var defs = this.scene.defs.values;
  if (!defs.links) {
    defs.links = defs.nodes
        .filter(function(n) { return n.parentNode; })
        .map(function(n) { return {sourceNode: n, targetNode: n.parentNode}; });
  }
  pv.Layout.Network.prototype.init.call(this);
};
