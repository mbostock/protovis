/**
 * @class
 * @name pv.Constraint.collision
 * @constructor
 * @param {number} radius
 */
pv.Constraint.collision = function(radius) {
  var n = 1, // number of times to repeat the constraint
      r1,
      px1,
      py1,
      px2,
      py2,
      constraint = {};

  if (!arguments.length) r1 = 10; // default search radius

  /**
   * @function
   * @name pv.Constraint.collision.prototype.repeat
   * @param {number} x
   * @returns {pv.Constraint.collision} this.
   */
  constraint.repeat = function(x) {
    if (arguments.length) {
      n = Number(x);
      return constraint;
    }
    return n;
  };

  /** @private */
  function constrain(n, p, x1, y1, x2, y2) {
    if (!n.leaf) {
      var sx = (x1 + x2) * .5,
          sy = (y1 + y2) * .5,
          top = sy > py1,
          bottom = sy < py2,
          left = sx > px1,
          right = sx < px2;
      if (top) {
        if (n.c1 && left) constrain(n.c1, p, x1, y1, sx, sy);
        if (n.c2 && right) constrain(n.c2, p, sx, y1, x2, sy);
      }
      if (bottom) {
        if (n.c3 && left) constrain(n.c3, p, x1, sy, sx, y2);
        if (n.c4 && right) constrain(n.c4, p, sx, sy, x2, y2);
      }
    }
    if (n.p && (n.p != p)) {
      var dx = p.x - n.p.x,
          dy = p.y - n.p.y,
          l = Math.sqrt(dx * dx + dy * dy),
          d = r1 + radius(n.p);
      if (l < d) {
        var k = (l - d) / l * .5;
        dx *= k;
        dy *= k;
        p.x -= dx;
        p.y -= dy;
        n.p.x += dx;
        n.p.y += dy;
      }
    }
  }

  /**
   * @function
   * @name pv.Constraint.bound.prototype.apply
   * @param {pv.Particle} particles
   * @param {pv.Quadtree} q
   * @returns {pv.Constraint.position} this.
   */
  constraint.apply = function(particles, q) {
    var p, r, max = -Infinity;
    for (p = particles; p; p = p.next) {
      r = radius(p);
      if (r > max) max = r;
    }
    for (var i = 0; i < n; i++) {
      for (p = particles; p; p = p.next) {
        r = (r1 = radius(p)) + max;
        px1 = p.x - r;
        px2 = p.x + r;
        py1 = p.y - r;
        py2 = p.y + r;
        constrain(q.root, p, q.xMin, q.yMin, q.xMax, q.yMax);
      }
    }
  };

  return constraint;
};
