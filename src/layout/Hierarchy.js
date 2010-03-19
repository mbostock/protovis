/** @class Abstract layout for hierarchies. */
pv.Layout.Hierarchy = function() {
  pv.Layout.Network.call(this);
  this.link.strokeStyle("#ccc");
};

pv.Layout.Hierarchy.prototype = pv.extend(pv.Layout.Network);

/** @private Alias the data property to nodes. */
pv.Layout.Hierarchy.prototype.data = pv.Layout.Hierarchy.prototype.nodes;

/** @private Register an implicit links property. */
pv.Layout.Hierarchy.prototype.bind = function() {
  pv.Layout.Network.prototype.bind.call(this);
  var binds = this.binds;
  if (!binds.properties.links) {
    var p = this.propertyValue("links", pv.Layout.Hierarchy.links);
    p.type = 1;
    binds.defs.push(p);
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
              linkValue: 1
            };
      });
};

/** @private */
pv.Layout.Hierarchy.Fill = {

  /** @private */
  constructor: function() {
    var node = this.node
        .strokeStyle("#fff")
        .fillStyle("#ccc")
        .width(function(n) { return n.dx; })
        .height(function(n) { return n.dy; })
        .innerRadius(function(n) { return n.innerRadius; })
        .outerRadius(function(n) { return n.outerRadius; })
        .startAngle(function(n) { return n.startAngle; })
        .angle(function(n) { return n.angle; });

    /** @private Adding to this layout implicitly adds to this node. */
    this.add = function(type) { return this.parent.add(type).extend(node); };

    /* Now hide references to inherited marks. */
    delete this.node;
    delete this.label;
    delete this.link;
  },

  /** @private */
  init: function() {
    var nodes = this.nodes(),
        orient = this.orient(),
        w = this.parent.width(),
        h = this.parent.height(),
        r = Math.min(w, h) / 2,
        ds = -nodes[0].minDepth;

    /** @private Scales the specified depth for a space-filling layout. */
    function scale(d, ds) {
      return (d + ds) / (1 + ds);
    }

    /** @private */
    function x(n) {
      switch (orient) {
        case "left": return scale(n.minDepth, ds) * w;
        case "right": return (1 - scale(n.maxDepth, ds)) * w;
        case "top": return n.minBreadth * w;
        case "bottom": return (1 - n.maxBreadth) * w;
        case "radial": return w / 2;
      }
    }

    /** @private */
    function y(n) {
      switch (orient) {
        case "left": return n.minBreadth * h;
        case "right": return (1 - n.maxBreadth) * h;
        case "top": return scale(n.minDepth, ds) * h;
        case "bottom": return (1 - scale(n.maxDepth, ds)) * h;
        case "radial": return h / 2;
      }
    }

    /** @private */
    function dx(n) {
      switch (orient) {
        case "left":
        case "right": return (n.maxDepth - n.minDepth) / (1 + ds) * w;
        case "top":
        case "bottom": return (n.maxBreadth - n.minBreadth) * w;
      }
    }

    /** @private */
    function dy(n) {
      switch (orient) {
        case "left":
        case "right": return (n.maxBreadth - n.minBreadth) * h;
        case "top":
        case "bottom": return (n.maxDepth - n.minDepth) / (1 + ds) * h;
      }
    }

    /** @private */
    function innerRadius(n) {
      return Math.max(0, scale(n.minDepth, ds / 2)) * r;
    }

    /** @private */
    function outerRadius(n) {
      return scale(n.maxDepth, ds / 2) * r;
    }

    /** @private */
    function startAngle(n) {
      return (n.parentNode ? n.minBreadth - .25 : 0) * 2 * Math.PI;
    }

    /** @private */
    function angle(n) {
      return (n.parentNode ? n.maxBreadth - n.minBreadth : 1) * 2 * Math.PI;
    }

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x = x(n);
      n.y = y(n);
      n.dx = dx(n);
      n.dy = dy(n);
      n.innerRadius = innerRadius(n);
      n.outerRadius = outerRadius(n);
      n.startAngle = startAngle(n);
      n.angle = angle(n);
    }
  }
};
