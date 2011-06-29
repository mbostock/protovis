var n = 3, m = 4, data = pv.range(n).map(function() {
    return pv.range(m).map(function() {
        return Math.random() + .1;
      });
  });
