pv.Force.drag = function() {
  var k = .1,
      force = {};

  force.constant = function(x) {
    if (arguments.length) { k = x; return force; }
    return k;
  };

  force.apply = function(particles) {
    if (k) for (var p = particles; p; p = p.next) {
      p.fx -= k * p.vx;
      p.fy -= k * p.vy;
    }
  };

  return force;
};
