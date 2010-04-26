pv.Constraint.position = function(f) {
  var a = 1, // default alpha
      constraint = {};

  if (!arguments.length) /** @ignore */ f = function(p) { return p.fix; };

  constraint.alpha = function(x) {
    if (arguments.length) {
      a = Number(x);
      return constraint;
    }
    return a;
  };

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
