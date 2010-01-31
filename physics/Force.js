pv.Force = {};

/**
 * A spring force as defined by Hooke's law plus a velocity damping term.
 *
 * @param {number} [k] optional spring constant; defaults to 1.
 */
pv.Force.Spring = function(k) {
  this.$k = k || 1;
};

/**
 * @type number
 * @field pv.Force.Spring.prototype.$k
 */

pv.Force.Spring.prototype.$d = 0;
pv.Force.Spring.prototype.$l = 1;

/**
 * @field pv.Force.Spring.prototype.springs
 */

/**
 * Sets or gets the spring constant of this spring force. Higher values indicate
 * stiffer (stronger) springs.
 *
 * @param {number} k the new spring constant.
 * @returns {number} the spring constant, or <tt>this</tt>.
 */
pv.Force.Spring.prototype.constant = function(k) {
  if (arguments.length) {
    this.$k = k;
    return this;
  }
  return this.$k;
};

/**
 * Sets or gets the damping of this spring force.
 *
 * @param {number} k the new damping.
 * @returns {number} the damping, or <tt>this</tt>.
 */
pv.Force.Spring.prototype.damping = function(d) {
  if (arguments.length) {
    this.$d = d;
    return this;
  }
  return this.$d;
};

/**
 * Sets or gets the length of this spring force.
 *
 * @param {number} k the new length.
 * @returns {number} the length, or <tt>this</tt>.
 */
pv.Force.Spring.prototype.length = function(l) {
  if (arguments.length) {
    this.$l = l;
    return this;
  }
  return this.$l;
};

/**
 * Binds this spring force to the two particles <i>a</i> and <i>b</i>. The
 * spring force may be bound to multiple particle pairs.
 *
 * @param {pv.Particle} a a particle.
 * @param {pv.Particle} b a particle.
 * @returns {pv.Force.Spring} <tt>this</tt>.
 */
pv.Force.Spring.prototype.bind = function(a, b) {
  var s = [a, b];
  s.next = this.springs;
  this.springs = s;
  return this;
};

/**
 * Applies this spring force to all bound particle pairs. The computed forces
 * are accumlated onto the particles.
 */
pv.Force.Spring.prototype.apply = function() {
  var k = this.$k, d = this.$d, l = this.$l, s = this.springs;
  if (d == 0) { // optimize outside of loop if not damping
    while (s) {
      var a = s[0],
          b = s[1],
          dx = a.x - b.x,
          dy = a.y - b.y,
          dn = Math.sqrt(dx * dx + dy * dy);
      if (dn > epsilon) { // TODO handle close particles
        var ks = -(k * (dn - l)) / dn,
            fx = dx * ks,
            fy = dy * ks;
        a.fx += fx;
        a.fy += fy;
        b.fx -= fx;
        b.fy -= fy;
      }
      s = s.next;
    }
  } else {
    while (s) {
      var a = s[0],
          b = s[1],
          dx = a.x - b.x,
          dy = a.y - b.y,
          dn = Math.sqrt(dx * dx + dy * dy);
      if (dn > epsilon) { // TODO handle close particles
        var vx = (dx - a.px + b.px) / timeStep,
            vy = (dy - a.py + b.py) / timeStep,
            ks = -(k * (dn - l) + d * (vx * dx + vy * dy) / dn) / dn,
            fx = dx * ks,
            fy = dy * ks;
        a.fx += fx;
        a.fy += fy;
        b.fx -= fx;
        b.fy -= fy;
      }
      s = s.next;
    }
  }
};

/**
 * An n-body force as defined by Coulomb's law (or equivalently, Newton's law of
 * gravitation), inversely proportional to the square of the distance between
 * particles. Note that the force is independent of the <i>mass</i> of the
 * associated particles, and that the particles do not have charges of varying
 * magnitude; instead, the charge of all particles is global, specified as the
 * charge {@link #constant}.
 *
 * @param {number} [k] optional charge constant; defaults to 1.
 */
pv.Force.Charge = function(k) {
  this.$k = k || 1;
};

/**
 * @type number
 * @field pv.Force.Charge.prototype.$k
 */

/**
 * Sets or gets the charge constant of this charge force. Positive values
 * indicate attraction (e.g., gravity); negative values indicate repulsion
 * (e.g., same-charge particles).
 *
 * @param {number} k the new charge constant.
 * @returns {number} the charge constant, or <tt>this</tt>.
 */
pv.Force.Charge.prototype.constant = function(k) {
  if (arguments.length) {
    this.$k = k;
    return this;
  }
  return this.$k;
};

/**
 * Applies this charge force to all bound particle pairs. The computed forces
 * are accumlated onto the particles.
 */
pv.Force.Charge.prototype.apply = function(particles) {
  var k = this.$k, q = new pv.Quadtree(particles);

  /**
   * Recursively computes the center of charge for each node in the quadtree.
   * This is effectively the center of mass, assuming that all particles have
   * equal weight. (Hence the requirement that all particles have the same
   * charge, and we ignore the actual mass of the particles.)
   */
  function accumulate(n) {
    n.children = 0;
    var cx = 0, cy = 0;
    function accumulateChild(c) {
      accumulate(c);
      n.children += c.children;
      cx += c.children * c.cx;
      cy += c.children * c.cy;
    }
    if (!n.leaf) {
      if (n.c1) accumulateChild(n.c1);
      if (n.c2) accumulateChild(n.c2);
      if (n.c3) accumulateChild(n.c3);
      if (n.c4) accumulateChild(n.c4);
    }
    if (n.p) {
      n.children++;
      cx += n.p.x;
      cy += n.p.y;
    }
    n.cx = cx / n.children;
    n.cy = cy / n.children;
  }
  accumulate(q.root);

  /* TODO max distance check */
  /* TODO min distance check */

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
    if (dn < epsilon) return; // TODO handle close particles
    /* Barnes-Hut criterion. */
    if ((n.leaf && (n.p != p)) || ((x2 - x1) / dn < theta)) {
      var kc = n.children * k / (dn * dn * dn),
          fx = dx * kc,
          fy = dy * kc;
      p.fx += fx;
      p.fy += fy;
    } else if (!n.leaf) {
      var sx = (x1 + x2) / 2,
          sy = (y1 + y2) / 2;
      if (n.c1) forces(n.c1, p, x1, y1, sx, sy);
      if (n.c2) forces(n.c2, p, sx, y1, x2, sy);
      if (n.c3) forces(n.c3, p, x1, sy, sx, y2);
      if (n.c4) forces(n.c4, p, sx, sy, x2, y2);
      if (n.p && (n.p != p)) {
        var kc = k / (dn * dn * dn),
            fx = dx * kc,
            fy = dy * kc;
        p.fx += fx;
        p.fy += fy;
      }
    }
  }

  /* Compute forces between each pair of particles. */
  var p = particles;
  while (p) {
    forces(q.root, p, q.xMin, q.yMin, q.xMax, q.yMax);
    p = p.next;
  }
};

/* TODO Make these configurable. */
var theta = 0.9;
