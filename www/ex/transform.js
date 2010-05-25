var data = pv.range(100).map(function(i) {
    var r = .5 + .2 * Math.random(), a = Math.PI * i / 50;
    return {x: r * Math.cos(a), y: r * Math.sin(a)};
  });
