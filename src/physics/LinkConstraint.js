pv.Constraint.link = function(d) {
  var a = .1, // default alpha
      constraint = {};

  if (!arguments.length) d = 20; // default rest length

  constraint.links = function(x) {
    if (arguments.length) {
      links = x;
      return constraint;
    }
    return links;
  };

  constraint.alpha = function(x) {
    if (arguments.length) {
      a = Number(x);
      return constraint;
    }
    return a;
  };

  constraint.apply = function(particles) {
    for (var i = 0; i < links.length; i++) {
      var a = links[i].sourceNode,
          b = links[i].targetNode,
          len = links[i].hasOwnProperty('length')?links[i].length:d
          dx = a.x - b.x,
          dy = a.y - b.y,
          l = Math.sqrt(dx * dx + dy * dy),
          k = (l - len) / l * .5;
      dx *= k;
      dy *= k;
      a.x -= dx;
      a.y -= dy;
      b.x += dx;
      b.y += dy;
    }
  };

  return constraint;
};
