/**
 * A weighted particle that can participate in a force simulation. There is no
 * explicit constructor corresponding to the class {@code pv.Particle}; this
 * class merely serves to document the attributes that are used on particles in
 * physics simulations.
 *
 * @class pv.Particle
 */

/**
 * The next particle in the simulation.
 *
 * @type pv.Particle
 * @field pv.Particle.prototype.next
 */

/**
 * If true, the particle's position and velocity are fixed and will not be
 * modified during the simulation. (This allows interactive drag and drop.)
 *
 * @type boolean
 * @field pv.Particle.prototype.fixed
 */

/**
 * The <i>x</i>-position of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.x
 */

/**
 * The <i>y</i>-position of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.y
 */

/**
 * The <i>x</i>-velocity of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.vx
 */

/**
 * The <i>y</i>-velocity of the particle.
 *
 * @type number
 * @field pv.Particle.prototype.vy
 */

/**
 * The <i>x</i>-position of the particle at -dt.
 *
 * @type number
 * @field pv.Particle.prototype.px
 */

/**
 * The <i>y</i>-position of the particle at -dt.
 *
 * @type number
 * @field pv.Particle.prototype.py
 */

/**
 * The <i>x</i>-force on the particle.
 *
 * @type number
 * @field pv.Particle.prototype.fx
 */

/**
 * The <i>y</i>-force on the particle.
 *
 * @type number
 * @field pv.Particle.prototype.fy
 */
