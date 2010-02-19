/**
 * An n-body force, as defined by Coulomb's law or Newton's law of gravitation,
 * inversely proportional to the square of the distance between particles. Note
 * that the force is independent of the <i>mass</i> of the associated particles,
 * and that the particles do not have charges of varying magnitude; instead, the
 * attraction or repulsion of all particles is globally specified as the charge
 * {@link #constant}.
 */
pv.Force.charge = function() {
  var k = -10, // charge constant (negative = repulsion, positive = attraction)
      min = 2, // minimum distance at which to observe forces
      max = 500, // maximum distance at which to observe forces
      theta = .9, // Barnes-Hut theta approximation constant
      force = {};

  force.constant = function(x) {
    if (arguments.length) { k = x; return force; }
    return k;
  };

  force.domain = function(a, b) {
    if (arguments.length) { min = a; max = b; return force; }
    return [min, max];
  };

  force.theta = function(x) {
    if (arguments.length) { theta = x; return force; }
    return theta;
  };

  /**
   * Recursively computes the center of charge for each node in the quadtree.
   * This is equivalent to the center of mass, assuming that all particles have
   * unit weight.
   */
  function accumulate(n) {
    var cx = 0, cy = 0;
    n.cn = 0;
    function accumulateChild(c) {
      accumulate(c);
      n.cn += c.cn;
      cx += c.cn * c.cx;
      cy += c.cn * c.cy;
    }
    if (!n.leaf) {
      if (n.c1) accumulateChild(n.c1);
      if (n.c2) accumulateChild(n.c2);
      if (n.c3) accumulateChild(n.c3);
      if (n.c4) accumulateChild(n.c4);
    }
    if (n.p) {
      n.cn++;
      cx += n.p.x;
      cy += n.p.y;
    }
    n.cx = cx / n.cn;
    n.cy = cy / n.cn;
  }

  /**
   * Recursively computes forces on the given particle using the given quadtree
   * node. The Barnes-Hut approximation criterion is if the ratio of the size of
   * the quadtree node to the distance from the point to the node's center of
   * mass is beneath some threshold.
   */
  function forces(n, p, x1, y1, x2, y2) {
    var dx = n.cx - p.x,
        dy = n.cy - p.y,
        dn = Math.sqrt(dx * dx + dy * dy);

    /* Treat coincident particles as slightly apart. */
    if (!dn) {
      dx = .01 * (.5 - Math.random());
      dy = .01 * (.5 - Math.random());
    }

    /* Barnes-Hut criterion. */
    if ((n.leaf && (n.p != p)) || ((x2 - x1) / dn < theta)) {
      if (dn > max) return;
      if (dn < min) dn = min;
      var kc = n.cn * k / (dn * dn * dn),
          fx = dx * kc,
          fy = dy * kc;
      p.fx += fx;
      p.fy += fy;
    } else if (!n.leaf) {
      var sx = (x1 + x2) / 2, sy = (y1 + y2) / 2;
      if (n.c1) forces(n.c1, p, x1, y1, sx, sy);
      if (n.c2) forces(n.c2, p, sx, y1, x2, sy);
      if (n.c3) forces(n.c3, p, x1, sy, sx, y2);
      if (n.c4) forces(n.c4, p, sx, sy, x2, y2);
      if (dn > max) return;
      if (dn < min) dn = min;
      if (n.p && (n.p != p)) {
        var kc = k / (dn * dn * dn),
            fx = dx * kc,
            fy = dy * kc;
        p.fx += fx;
        p.fy += fy;
      }
    }
  }

  force.apply = function(particles, q) {
    accumulate(q.root);
    for (var p = particles; p; p = p.next) {
      forces(q.root, p, q.xMin, q.yMin, q.xMax, q.yMax);
    }
  };

  return force;
};
