/**
 * Constructs a new drag force with the specified constant.
 *
 * @class Implements a drag force, simulating friction. The drag force is
 * applied in the opposite direction of the particle's velocity. Since Position
 * Verlet integration does not track velocities explicitly, the error term with
 * this estimate of velocity is fairly high, so the drag force may be
 * inaccurate.
 *
 * @extends pv.Force
 * @param {number} k the drag constant.
 * @see #constant
 */
pv.Force.drag = function(k) {
  var force = {};

  if (!arguments.length) k = .1; // default drag constant

  /**
   * Sets or gets the drag constant, in the range [0,1]. The default drag
   * constant is 0.1. The drag forces scales linearly with the particle's
   * velocity based on the given drag constant.
   *
   * @function
   * @name pv.Force.drag.prototype.constant
   * @param {number} x the new drag constant.
   * @returns {pv.Force.drag} this, or the current drag constant.
   */
  force.constant = function(x) {
    if (arguments.length) { k = x; return force; }
    return k;
  };

  /**
   * Applies this force to the specified particles.
   *
   * @function
   * @name pv.Force.drag.prototype.apply
   * @param {pv.Particle} particles particles to which to apply this force.
   */
  force.apply = function(particles) {
    if (k) for (var p = particles; p; p = p.next) {
      p.fx -= k * p.vx;
      p.fy -= k * p.vy;
    }
  };

  return force;
};
