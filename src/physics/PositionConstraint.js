/**
 * @class
 * @name pv.Constraint.position
 * @constructor
 * @param {function} [f]
 */
pv.Constraint.position = function(f) {
  var a = 1, // default alpha
      constraint = {};

  if (!arguments.length) /** @ignore */ f = function(p) { return p.fix; };

  /**
   * @function
   * @name pv.Constraint.position.prototype.alpha
   * @param {number} x
   * @returns {pv.Constraint.position} this.
   */
  constraint.alpha = function(x) {
    if (arguments.length) {
      a = Number(x);
      return constraint;
    }
    return a;
  };

  /**
   * @function
   * @name pv.Constraint.position.prototype.apply
   * @param {pv.Particle} particles
   * @returns {pv.Constraint.position} this.
   */
  constraint.apply = function(particles) {
    for (var p = particles; p; p = p.next) {
      var v = f(p);
      if (v) {
        p.x += (v.x - p.x) * a;
        p.y += (v.y - p.y) * a;
      }
    }
  };

  return constraint;
};
