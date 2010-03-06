pv.Force.drag = function(k) {
  var force = {};

  if (!arguments.length) k = .1;

  force.constant = function(x) {
    if (arguments.length) { k = x; return force; }
    return k;
  };

  force.apply = function(particles) {
    if (k) for (var p = particles; p; p = p.next) {
      p.fx = k * (p.fx - p.x + p.px);
      p.fy = k * (p.fy - p.y + p.py);
    }
  };

  return force;
};
