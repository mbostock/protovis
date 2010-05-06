/**
 * Constructs a new charge force, with an optional charge constant. The charge
 * constant can be negative for repulsion (e.g., particles with electrical
 * charge of equal sign), or positive for attraction (e.g., massive particles
 * with mutual gravity). The default charge constant is -40.
 *
 * @class An n-body force, as defined by Coulomb's law or Newton's law of
 * gravitation, inversely proportional to the square of the distance between
 * particles. Note that the force is independent of the <i>mass</i> of the
 * associated particles, and that the particles do not have charges of varying
 * magnitude; instead, the attraction or repulsion of all particles is globally
 * specified as the charge {@link #constant}.
 *
 * <p>This particular implementation uses the Barnes-Hut algorithm. For details,
 * see <a
 * href="http://www.nature.com/nature/journal/v324/n6096/abs/324446a0.html">"A
 * hierarchical O(N log N) force-calculation algorithm"</a>, J. Barnes &amp;
 * P. Hut, <i>Nature</i> 1986.
 *
 * @name pv.Force.charge
 * @param {number} [k] the charge constant.
 */
pv.Force.charge = function(k) {
  var min = 2, // minimum distance at which to observe forces
      min1 = 1 / min,
      max = 500, // maximum distance at which to observe forces
      max1 = 1 / max,
      theta = .9, // Barnes-Hut theta approximation constant
      force = {};

  if (!arguments.length) k = -40; // default charge constant (repulsion)

  /**
   * Sets or gets the charge constant. If an argument is specified, it is the
   * new charge constant. The charge constant can be negative for repulsion
   * (e.g., particles with electrical charge of equal sign), or positive for
   * attraction (e.g., massive particles with mutual gravity). The default
   * charge constant is -40.
   *
   * @function
   * @name pv.Force.charge.prototype.constant
   * @param {number} x the charge constant.
   * @returns {pv.Force.charge} this.
   */
  force.constant = function(x) {
    if (arguments.length) {
      k = Number(x);
      return force;
    }
    return k;
  };

  /**
   * Sets or gets the domain; specifies the minimum and maximum domain within
   * which charge forces are applied. A minimum distance threshold avoids
   * applying forces that are two strong (due to granularity of the simulation's
   * numeric integration). A maximum distance threshold improves performance by
   * skipping force calculations for particles that are far apart.
   *
   * <p>The default domain is [2, 500].
   *
   * @function
   * @name pv.Force.charge.prototype.domain
   * @param {number} a
   * @param {number} b
   * @returns {pv.Force.charge} this.
   */
  force.domain = function(a, b) {
    if (arguments.length) {
      min = Number(a);
      min1 = 1 / min;
      max = Number(b);
      max1 = 1 / max;
      return force;
    }
    return [min, max];
  };

  /**
   * Sets or gets the Barnes-Hut approximation factor. The Barnes-Hut
   * approximation criterion is the ratio of the size of the quadtree node to
   * the distance from the point to the node's center of mass is beneath some
   * threshold.
   *
   * @function
   * @name pv.Force.charge.prototype.theta
   * @param {number} x the new Barnes-Hut approximation factor.
   * @returns {pv.Force.charge} this.
   */
  force.theta = function(x) {
    if (arguments.length) {
      theta = Number(x);
      return force;
    }
    return theta;
  };

  /**
   * @ignore Recursively computes the center of charge for each node in the
   * quadtree. This is equivalent to the center of mass, assuming that all
   * particles have unit weight.
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
      n.cn += k;
      cx += k * n.p.x;
      cy += k * n.p.y;
    }
    n.cx = cx / n.cn;
    n.cy = cy / n.cn;
  }

  /**
   * @ignore Recursively computes forces on the given particle using the given
   * quadtree node. The Barnes-Hut approximation criterion is the ratio of the
   * size of the quadtree node to the distance from the point to the node's
   * center of mass is beneath some threshold.
   */
  function forces(n, p, x1, y1, x2, y2) {
    var dx = n.cx - p.x,
        dy = n.cy - p.y,
        dn = 1 / Math.sqrt(dx * dx + dy * dy);

    /* Barnes-Hut criterion. */
    if ((n.leaf && (n.p != p)) || ((x2 - x1) * dn < theta)) {
      if (dn < max1) return;
      if (dn > min1) dn = min1;
      var kc = n.cn * dn * dn * dn,
          fx = dx * kc,
          fy = dy * kc;
      p.fx += fx;
      p.fy += fy;
    } else if (!n.leaf) {
      var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5;
      if (n.c1) forces(n.c1, p, x1, y1, sx, sy);
      if (n.c2) forces(n.c2, p, sx, y1, x2, sy);
      if (n.c3) forces(n.c3, p, x1, sy, sx, y2);
      if (n.c4) forces(n.c4, p, sx, sy, x2, y2);
      if (dn < max1) return;
      if (dn > min1) dn = min1;
      if (n.p && (n.p != p)) {
        var kc = k * dn * dn * dn,
            fx = dx * kc,
            fy = dy * kc;
        p.fx += fx;
        p.fy += fy;
      }
    }
  }

  /**
   * Applies this force to the specified particles. The force is applied between
   * all pairs of particles within the domain, using the specified quadtree to
   * accelerate n-body force calculation using the Barnes-Hut approximation
   * criterion.
   *
   * @function
   * @name pv.Force.charge.prototype.apply
   * @param {pv.Particle} particles particles to which to apply this force.
   * @param {pv.Quadtree} q a quadtree for spatial acceleration.
   */
  force.apply = function(particles, q) {
    accumulate(q.root);
    for (var p = particles; p; p = p.next) {
      forces(q.root, p, q.xMin, q.yMin, q.xMax, q.yMax);
    }
  };

  return force;
};
