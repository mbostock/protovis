/**
 * Constructs a new bound constraint. Before the constraint can be used, the
 * {@link #x} and {@link #y} methods must be call to specify the bounds.
 *
 * @class Constrains particles to within fixed rectangular bounds. For example,
 * this constraint can be used to constrain particles in a physics simulation
 * within the bounds of an enclosing panel.
 *
 * <p>Note that the current implementation treats particles as points, with no
 * area. If the particles are rendered as dots, be sure to include some
 * additional padding to inset the bounds such that the edges of the dots do not
 * get clipped by the panel bounds. If the particles have different radii, this
 * constraint would need to be extended using a radius function, similar to
 * {@link pv.Constraint.collision}.
 *
 * @see pv.Layout.Force
 * @extends pv.Constraint
 */
pv.Constraint.bound = function() {
  var constraint = {},
      x,
      y;

  /**
   * Sets or gets the bounds on the x-coordinate.
   *
   * @function
   * @name pv.Constraint.bound.prototype.x
   * @param {number} min the minimum allowed x-coordinate.
   * @param {number} max the maximum allowed x-coordinate.
   * @returns {pv.Constraint.bound} this.
   */
  constraint.x = function(min, max) {
    if (arguments.length) {
      x = {min: Math.min(min, max), max: Math.max(min, max)};
      return this;
    }
    return x;
  };

  /**
   * Sets or gets the bounds on the y-coordinate.
   *
   * @function
   * @name pv.Constraint.bound.prototype.y
   * @param {number} min the minimum allowed y-coordinate.
   * @param {number} max the maximum allowed y-coordinate.
   * @returns {pv.Constraint.bound} this.
   */
  constraint.y = function(min, max) {
    if (arguments.length) {
      y = {min: Math.min(min, max), max: Math.max(min, max)};
      return this;
    }
    return y;
  };

  /**
   * Applies this constraint to the specified particles.
   *
   * @function
   * @name pv.Constraint.bound.prototype.apply
   * @param {pv.Particle} particles particles to which to apply this constraint.
   */
  constraint.apply = function(particles) {
    if (x) for (var p = particles; p; p = p.next) {
      p.x = p.x < x.min ? x.min : (p.x > x.max ? x.max : p.x);
    }
    if (y) for (var p = particles; p; p = p.next) {
      p.y = p.y < y.min ? y.min : (p.y > y.max ? y.max : p.y);
    }
  };

  return constraint;
};
