/**
 * @class
 * @extends pv.Layout.Hierarchy
 * @constructor
 */
pv.Layout.Indent = function() {
  pv.Layout.Hierarchy.call(this);
  this.link.interpolate("step-after");
};

pv.Layout.Indent.prototype = pv.extend(pv.Layout.Hierarchy)
    .property("depth", Number)
    .property("breadth", Number);

/**
 * @type number
 * @name pv.Layout.Indent.prototype.depth
 */

/**
 * @type number
 * @name pv.Layout.Indent.prototype.breadth
 */

pv.Layout.Indent.prototype.defaults = new pv.Layout.Indent()
    .extend(pv.Layout.Hierarchy.prototype.defaults)
    .depth(15)
    .breadth(15);

/** @private */
pv.Layout.Indent.prototype.buildImplied = function(s) {
  if (pv.Layout.Hierarchy.prototype.buildImplied.call(this, s)) return;

  var nodes = s.nodes,
      bspace = s.breadth,
      dspace = s.depth,
      ax = 0,
      ay = 0;

  /** @private */
  function position(n, breadth, depth) {
    n.x = ax + depth++ * dspace;
    n.y = ay + breadth++ * bspace;
    n.midAngle = 0;
    for (var c = n.firstChild; c; c = c.nextSibling) {
      breadth = position(c, breadth, depth);
    }
    return breadth;
  }

  position(nodes[0], 1, 1);
};
