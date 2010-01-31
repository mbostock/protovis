/**
 * A weighted particle that can participate in a force simulation.
 *
 * @constructor Constructs a new particle with an initial mass of 1, an initial
 * random position in the range [0, 1] in <i>x</i> and <i>y</i>, zero initial
 * velocity and zero initial force.
 *
 * @param {number} [m] optional mass; defaults to 1.
 */
pv.Particle = function(m) {
  this.x = this.px = Math.random();
  this.y = this.py = Math.random();
  this.fx = this.fy = 0;
  this.im = m ? (1 / m) : 1;
};

/**
 * @type pv.Particle
 * @field pv.Particle.prototype.next
 */

/**
 * The current <i>x</i>-position of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.x
 */

/**
 * The current <i>y</i>-position of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.y
 */

/**
 * The previous <i>x</i>-position of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.px
 */

/**
 * The previous <i>y</i>-position of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.py
 */

/**
 * The <i>x</i>-component of the current force on the particle.
 *
 * @type number
 * @field pv.Particle.prototype.fx
 */

/**
 * The <i>y</i>-component of the current force on the particle.
 *
 * @type number
 * @field pv.Particle.prototype.fy
 */

/**
 * The inverse mass of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.im
 * @see #mass()
 */

/**
 * Sets or gets the mass of the particle.
 *
 * @param {number} m the new mass of the particle.
 * @returns {number} the mass of the particle.
 */
pv.Particle.prototype.mass = function(m) {
  if (arguments.length) {
    this.im = 1 / m;
    return this;
  }
  return 1 / this.im;
};

/**
 * Sets or gets the position of the particle. When setting, this method sets
 * both the current position and the previous position, implicitly setting the
 * velocity to zero.
 *
 * @param {number} x the <i>x</i>-position of the particle.
 * @param {number} y the <i>y</i>-position of the particle.
 * @returns {pv.Vector} the current position of the particle.
 */
pv.Particle.prototype.position = function(x, y) {
  if (arguments.length) {
    this.x = this.px = x;
    this.y = this.py = y;
    return this;
  }
  return pv.vector(this.x, this.y);
};
