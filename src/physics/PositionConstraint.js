pv.Constraint.position = function(f) {
  var d = .1, // default 1 - damping factor
      constraint = {};

  if (!arguments.length) f = pv.identity; // default position

  constraint.damping = function(x) {
    if (arguments.length) {
      d = 1 - x;
      return constraint;
    }
    return 1 - d;
  };

  constraint.apply = function(particles) {
    for (var p = particles; p; p = p.next) {
      var v = f(p);
      p.x += (v.x - p.x) * d;
      p.y += (v.y - p.y) * d;
    }
  };

  return constraint;
};
