var data = pv.range(0, 10, .2).map(function(x) {
    return {x: x, y: Math.sin(x) + Math.random() + 1.5};
  });
