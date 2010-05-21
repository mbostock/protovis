/**
 * Constructs a default position constraint using the <tt>fix</tt> attribute.
 * An optional position function can be specified to determine how the fixed
 * position per-particle is determined.
 *
 * @class Constraints particles to a fixed position. The fixed position per
 * particle is determined using a given position function, which defaults to
 * <tt>function(d) d.fix</tt>.
 *
 * <p>If the position function returns null, then no position constraint is
 * applied to the given particle. Otherwise, the particle's position is set to
 * the returned position, as expressed by a {@link pv.Vector}. (Note: the
 * position does not need to be an instance of <tt>pv.Vector</tt>, but simply an
 * object with <tt>x</tt> and <tt>y</tt> attributes.)
 *
 * <p>This constraint also supports a configurable alpha parameter, which
 * defaults to 1. If the alpha parameter is in the range [0,1], then rather than
 * setting the particle's new position directly to the position returned by the
 * supplied position function, the particle's position is interpolated towards
 * the fixed position. This results is a smooth (exponential) drift towards the
 * fixed position, which can increase the stability of the physics simulation.
 * In addition, the alpha parameter can be decayed over time, relaxing the
 * position constraint, which helps to stabilize on an optimal solution.
 *
 * @param {function} [f] the position function.
 */
pv.Constraint.position = function(f) {
  var a = 1, // default alpha
      constraint = {};

  if (!arguments.length) /** @ignore */ f = function(p) { return p.fix; };

  /**
   * Sets or gets the alpha parameter for position interpolation. If the alpha
   * parameter is in the range [0,1], then rather than setting the particle's
   * new position directly to the position returned by the supplied position
   * function, the particle's position is interpolated towards the fixed
   * position.
   *
   * @function
   * @name pv.Constraint.position.prototype.alpha
   * @param {number} x the new alpha parameter, in the range [0,1].
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
   * Applies this constraint to the specified particles.
   *
   * @function
   * @name pv.Constraint.position.prototype.apply
   * @param {pv.Particle} particles particles to which to apply this constraint.
   */
  constraint.apply = function(particles) {
    for (var p = particles; p; p = p.next) {
      var v = f(p);
      if (v) {
        p.x += (v.x - p.x) * a;
        p.y += (v.y - p.y) * a;
        p.fx = p.fy = p.vx = p.vy = 0;
      }
    }
  };

  return constraint;
};
