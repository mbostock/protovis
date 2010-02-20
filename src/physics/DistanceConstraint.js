pv.Constraint.distance = function(radius) {
  var r1,
      px1,
      py1,
      px2,
      py2,
      constraint = {};

  if (!arguments.length) r = 10; // default search radius

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

  /** Specifies the radius function, given a particle. */
  constraint.radius = function(f) {
    if (arguments.length) {
      radius = f;
      return this;
    }
    return radius;
  };

  constraint.apply = function(particles, q) {
    var p, r, max = -Infinity;
    for (p = particles; p; p = p.next) {
      r = radius(p);
      if (r > max) max = r;
    }
    for (p = particles; p; p = p.next) {
      r = (r1 = radius(p)) + max;
      px1 = p.x - r;
      px2 = p.x + r;
      py1 = p.y - r;
      py2 = p.y + r;
      constrain(q.root, p, q.xMin, q.yMin, q.xMax, q.yMax);
    }
  };

  return constraint;
};

// TODO rename exact?
pv.Constraint.spring = function(d) {
  var constraint = {};

  if (!arguments.length) d = 20; // default rest length

  constraint.links = function(x) {
    if (arguments.length) {
      links = x;
      return constraint;
    }
    return links;
  };

  constraint.length = function(x) {
    if (arguments.length) { d = x; return constraint; }
    return d;
  };

  constraint.apply = function(particles) {
    for (var i = 0; i < links.length; i++) {
      var a = links[i].sourceNode,
          b = links[i].targetNode,
          dx = a.x - b.x,
          dy = a.y - b.y,
          l = Math.sqrt(dx * dx + dy * dy),
          k = (l - d) / l * .5;
      dx *= k;
      dy *= k;
      a.x -= dx;
      a.y -= dy;
      b.x += dx;
      b.y += dy;
    }
  };

  return constraint;
};
