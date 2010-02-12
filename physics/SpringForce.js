pv.Force.spring = function(links) {
  var k = .01, // default spring constant (tension)
      d = .01, // default damping factor
      l = 10, // default rest length
      kl = normalize(), // per-spring normalization
      force = {};

  /** @private Normalize tension based on link degree. */
  function normalize() {
    var i, p, l, a, b, n = {};
    for (i = 0; i < links.length; i++) {
      l = links[i];
      a = l.sourceNode.nodeName;
      b = l.targetNode.nodeName;
      n[a] = (n[a] || 0) + l.linkValue;
      n[b] = (n[b] || 0) + l.linkValue;
    }
    return links.map(function(l) {
        return 1 / Math.sqrt(Math.max(
            n[l.sourceNode.nodeName],
            n[l.targetNode.nodeName]))
      });
  }

  force.constant = function(x) {
    if (arguments.length) { k = x; return force; }
    return k;
  };

  force.damping = function(x) {
    if (arguments.length) { d = x; return force; }
    return d;
  };

  force.length = function(x) {
    if (arguments.length) { l = x; return force; }
    return l;
  };

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
