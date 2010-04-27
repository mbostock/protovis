var data = pv.range(0, 10, .1).map(function(x) {
    return {x: x, y: Math.sin(x) + Math.random() * .5 + 2};
  });
