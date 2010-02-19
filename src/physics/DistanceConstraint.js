pv.Constraint.distance = function(r) {
  var min = function() { return 10; },
      px1,
      py1,
      px2,
      py2,
      constraint = {};

  if (!arguments.length) r = 10; // default search radius

  /** @private */
  function constrain(n, p, x1, y1, x2, y2) {
    if (!n.leaf) {
      var sx = (x1 + x2) / 2,
          sy = (y1 + y2) / 2,
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
          d = min(p, n.p);
      if (l < d) {
        dx *= (l - d) / (2 * l);
        dy *= (l - d) / (2 * l);
        p.x -= dx;
        p.y -= dy;
        n.p.x += dx;
        n.p.y += dy;
      }
    }
  }

  /** Specifies the search radius. */
  constraint.radius = function(x) {
    if (arguments.length) {
      r = Number(x);
      return this;
    }
    return r;
  };

  /** Specifies the minimum-distance function, given two particles. */
  constraint.min = function(f) {
    if (arguments.length) {
      min = f;
      return this;
    }
    return min;
  };

  constraint.apply = function(particles, q) {
    for (var p = particles; p; p = p.next) {
      px1 = p.x - r;
      px2 = p.x + r;
      py1 = p.y - r;
      py2 = p.y + r;
      constrain(q.root, p, q.xMin, q.yMin, q.xMax, q.yMax);
    }
  };

  return constraint;
};
