/**
 * Abstract; not implemented. There is no explicit constructor; this class
 * merely serves to document the attributes that are used on particles in
 * physics simulations.
 *
 * @class A weighted particle that can participate in a force simulation.
 *
 * @name pv.Particle
 */

/**
 * The next particle in the simulation. Particles form a singly-linked list.
 *
 * @field
 * @type pv.Particle
 * @name pv.Particle.prototype.next
 */

/**
 * The <i>x</i>-position of the particle.
 *
 * @field
 * @type number
 * @name pv.Particle.prototype.x
 */

/**
 * The <i>y</i>-position of the particle.
 *
 * @field
 * @type number
 * @name pv.Particle.prototype.y
 */

/**
 * The <i>x</i>-velocity of the particle.
 *
 * @field
 * @type number
 * @name pv.Particle.prototype.vx
 */

/**
 * The <i>y</i>-velocity of the particle.
 *
 * @field
 * @type number
 * @name pv.Particle.prototype.vy
 */

/**
 * The <i>x</i>-position of the particle at -dt.
 *
 * @field
 * @type number
 * @name pv.Particle.prototype.px
 */

/**
 * The <i>y</i>-position of the particle at -dt.
 *
 * @field
 * @type number
 * @name pv.Particle.prototype.py
 */

/**
 * The <i>x</i>-force on the particle.
 *
 * @field
 * @type number
 * @name pv.Particle.prototype.fx
 */

/**
 * The <i>y</i>-force on the particle.
 *
 * @field
 * @type number
 * @name pv.Particle.prototype.fy
 */
