var data = pv.range(100).map(function() {
    var r = Math.random(), a = 2 * Math.PI * Math.random();
    return {x: r * Math.cos(a), y: r * Math.sin(a)};
  });
