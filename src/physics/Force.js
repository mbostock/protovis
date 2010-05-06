/**
 * Abstract; see an implementing class.
 *
 * @class Represents a force that acts on particles. Note that this interface
 * does not specify how to bind a force to specific particles; in general,
 * forces are applied globally to all particles. However, some forces may be
 * applied to specific particles or between particles, such as spring forces,
 * through additional specialization.
 *
 * @see pv.Simulation
 * @see pv.Particle
 * @see pv.Force.charge
 * @see pv.Force.drag
 * @see pv.Force.spring
 */
pv.Force = {};

/**
 * Applies this force to the specified particles.
 *
 * @function
 * @name pv.Force.prototype.apply
 * @param {pv.Particle} particles particles to which to apply this force.
 * @param {pv.Quadtree} q a quadtree for spatial acceleration.
 */
