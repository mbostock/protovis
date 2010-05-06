/**
 * Constructs a new spring force with the specified constant. The links
 * associated with this spring force must be specified before the spring force
 * can be applied.
 *
 * @class Implements a spring force, per Hooke's law. The spring force can be
 * configured with a tension constant, rest length, and damping factor. The
 * tension and damping will automatically be normalized using the inverse square
 * root of the maximum link degree of attached nodes; this makes springs weaker
 * between nodes of high link degree.
 *
 * <p>Unlike other forces (such as charge and drag forces) which may be applied
 * globally, spring forces are only applied between linked particles. Therefore,
 * an array of links must be specified before this force can be applied; the
 * links should be an array of {@link pv.Layout.Network.Link}s. See also
 * {@link pv.Layout.Force} for an example of using spring and charge forces for
 * network layout.
 *
 * @extends pv.Force
 * @param {number} k the spring constant.
 * @see #constant
 * @see #links
 */
pv.Force.spring = function(k) {
  var d = .1, // default damping factor
      l = 20, // default rest length
      links, // links on which to apply spring forces
      kl, // per-spring normalization
      force = {};

  if (!arguments.length) k = .1; // default spring constant (tension)

  /**
   * Sets or gets the links associated with this spring force. Unlike other
   * forces (such as charge and drag forces) which may be applied globally,
   * spring forces are only applied between linked particles. Therefore, an
   * array of links must be specified before this force can be applied; the
   * links should be an array of {@link pv.Layout.Network.Link}s.
   *
   * @function
   * @name pv.Force.spring.prototype.links
   * @param {array} x the new array of links.
   * @returns {pv.Force.spring} this, or the current array of links.
   */
  force.links = function(x) {
    if (arguments.length) {
      links = x;
      kl = x.map(function(l) {
          return 1 / Math.sqrt(Math.max(
              l.sourceNode.linkDegree,
              l.targetNode.linkDegree));
        });
      return force;
    }
    return links;
  };

  /**
   * Sets or gets the spring constant. The default value is 0.1; greater values
   * will result in stronger tension. The spring tension is automatically
   * normalized using the inverse square root of the maximum link degree of
   * attached nodes.
   *
   * @function
   * @name pv.Force.spring.prototype.constant
   * @param {number} x the new spring constant.
   * @returns {pv.Force.spring} this, or the current spring constant.
   */
  force.constant = function(x) {
    if (arguments.length) {
      k = Number(x);
      return force;
    }
    return k;
  };

  /**
   * The spring damping factor, in the range [0,1]. Damping functions
   * identically to drag forces, damping spring bounciness by applying a force
   * in the opposite direction of attached nodes' velocities. The default value
   * is 0.1. The spring damping is automatically normalized using the inverse
   * square root of the maximum link degree of attached nodes.
   *
   * @function
   * @name pv.Force.spring.prototype.damping
   * @param {number} x the new spring damping factor.
   * @returns {pv.Force.spring} this, or the current spring damping factor.
   */
  force.damping = function(x) {
    if (arguments.length) {
      d = Number(x);
      return force;
    }
    return d;
  };

  /**
   * The spring rest length. The default value is 20 pixels.
   *
   * @function
   * @name pv.Force.spring.prototype.length
   * @param {number} x the new spring rest length.
   * @returns {pv.Force.spring} this, or the current spring rest length.
   */
  force.length = function(x) {
    if (arguments.length) {
      l = Number(x);
      return force;
    }
    return l;
  };

  /**
   * Applies this force to the specified particles.
   *
   * @function
   * @name pv.Force.spring.prototype.apply
   * @param {pv.Particle} particles particles to which to apply this force.
   */
  force.apply = function(particles) {
    for (var i = 0; i < links.length; i++) {
      var a = links[i].sourceNode,
          b = links[i].targetNode,
          dx = a.x - b.x,
          dy = a.y - b.y,
          dn = Math.sqrt(dx * dx + dy * dy),
          dd = dn ? (1 / dn) : 1,
          ks = k * kl[i], // normalized tension
          kd = d * kl[i], // normalized damping
          kk = (ks * (dn - l) + kd * (dx * (a.vx - b.vx) + dy * (a.vy - b.vy)) * dd) * dd,
          fx = -kk * (dn ? dx : (.01 * (.5 - Math.random()))),
          fy = -kk * (dn ? dy : (.01 * (.5 - Math.random())));
      a.fx += fx;
      a.fy += fy;
      b.fx -= fx;
      b.fy -= fy;
    }
  };

  return force;
};
