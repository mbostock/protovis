/**
 * Abstract; see an implementing class.
 *
 * @class Represents a constraint that acts on particles. Note that this
 * interface does not specify how to bind a constraint to specific particles; in
 * general, constraints are applied globally to all particles. However, some
 * constraints may be applied to specific particles or between particles, such
 * as position constraints, through additional specialization.
 *
 * @see pv.Simulation
 * @see pv.Particle
 * @see pv.Constraint.bound
 * @see pv.Constraint.collision
 * @see pv.Constraint.position
 */
pv.Constraint = {};

/**
 * Applies this constraint to the specified particles.
 *
 * @function
 * @name pv.Constraint.prototype.apply
 * @param {pv.Particle} particles particles to which to apply this constraint.
 * @param {pv.Quadtree} q a quadtree for spatial acceleration.
 * @returns {pv.Constraint} this.
 */
