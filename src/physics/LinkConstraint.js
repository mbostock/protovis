pv.Constraint.link = function(d) {
  var a = 1, // default alpha
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
      var s = links[i].sourceNode,
          t = links[i].targetNode,
          len = links[i].hasOwnProperty('length')?links[i].length:d
          dx = s.x - t.x,
          dy = s.y - t.y,
          l = Math.sqrt(dx * dx + dy * dy),
          k = (l - len) / l * a * .5;
      dx *= k;
      dy *= k;
      s.x -= dx;
      s.y -= dy;
      t.x += dx;
      t.y += dy;
    }
  };

  return constraint;
};
