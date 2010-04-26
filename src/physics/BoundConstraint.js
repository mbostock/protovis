/**
 * @class
 * @name pv.Constraint.bound
 * @constructor
 */
pv.Constraint.bound = function() {
  var constraint = {},
      x,
      y;

  /**
   * @function
   * @name pv.Constraint.bound.prototype.x
   * @param {number} min
   * @param {number} max
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
   * @function
   * @name pv.Constraint.bound.prototype.y
   * @param {number} min
   * @param {number} max
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
   * @function
   * @name pv.Constraint.bound.prototype.apply
   * @param {pv.Particle} particles
   * @returns {pv.Constraint.position} this.
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
