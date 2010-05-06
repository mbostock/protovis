/**
 * @class
 * @name pv.Force.drag
 * @constructor
 * @param {number} k
 */
pv.Force.drag = function(k) {
  var force = {};

  if (!arguments.length) k = .1;

  /**
   * @function
   * @name pv.Force.drag.prototype.constant
   * @param {number} x
   * @returns {pv.Force.drag} this.
   */
  force.constant = function(x) {
    if (arguments.length) { k = x; return force; }
    return k;
  };

  /**
   * @function
   * @name pv.Force.drag.prototype.apply
   * @param {pv.Particle} particles
   * @returns {pv.Force.drag} this.
   */
  force.apply = function(particles) {
    if (k) for (var p = particles; p; p = p.next) {
      p.fx += k * (p.px - p.x);
      p.fy += k * (p.py - p.y);
    }
  };

  return force;
};
