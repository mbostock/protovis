var data = pv.range(4).map(function() {
    return pv.range(0, 10, .1).map(function(x) {
        return {x: x, y: Math.sin(x) + Math.random() * .5 + 2};
      });
  });
