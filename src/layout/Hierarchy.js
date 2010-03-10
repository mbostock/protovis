/** @class Abstract layout for hierarchies. */
pv.Layout.Hierarchy = function() {
  pv.Layout.Network.call(this);
};

pv.Layout.Hierarchy.prototype = pv.extend(pv.Layout.Network);

/** @private Alias the data property to nodes. */
pv.Layout.Hierarchy.prototype.data = pv.Layout.Hierarchy.prototype.nodes;

/** @private Register an implicit links property. */
pv.Layout.Hierarchy.prototype.bind = function() {
  pv.Layout.Network.prototype.bind.call(this);
  var binds = this.binds;
  if (!binds.properties.links) {
    binds.defs.push({
      name: "links",
      id: pv.id(),
      type: 1,
      value: pv.Layout.Hierarchy.links
    });
  }
};

/**
 * The default links property; computes links using the <tt>parentNode</tt>
 * attribute.
 */
pv.Layout.Hierarchy.links = function() {
  return this.nodes()
      .filter(function(n) { return n.parentNode; })
      .map(function(n) {
          return {
              sourceNode: n,
              targetNode: n.parentNode,
              linkDegree: 1
            };
      });
};
