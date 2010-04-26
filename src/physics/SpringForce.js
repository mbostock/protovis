/**
 * @class
 * @constructor
 * @param {number} k
 */
pv.Force.spring = function(k) {
  var d = .1, // default damping factor
      l = 20, // default rest length
      links, // links on which to apply spring forces
      kl, // per-spring normalization
      force = {};

  if (!arguments.length) k = .1; // default spring constant (tension)

  /**
   * @function
   * @name pv.Force.spring.prototype.links
   * @param {array} x
   * @returns {pv.Force.spring} this.
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
   * @function
   * @name pv.Force.spring.prototype.constant
   * @param {number} x
   * @returns {pv.Force.spring} this.
   */
  force.constant = function(x) {
    if (arguments.length) {
      k = Number(x);
      return force;
    }
    return k;
  };

  /**
   * @function
   * @name pv.Force.spring.prototype.damping
   * @param {number} x
   * @returns {pv.Force.spring} this.
   */
  force.damping = function(x) {
    if (arguments.length) {
      d = Number(x);
      return force;
    }
    return d;
  };

  /**
   * @function
   * @name pv.Force.spring.prototype.length
   * @param {number} x
   * @returns {pv.Force.spring} this.
   */
  force.length = function(x) {
    if (arguments.length) {
      l = Number(x);
      return force;
    }
    return l;
  };

  /**
   * @function
   * @name pv.Force.spring.prototype.apply
   * @param {pv.Particle} particles
   * @returns {pv.Force.spring} this.
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
