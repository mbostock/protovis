/* Inspired by Lee Byron's test data generator. */
function layers(n, m) {
  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < m; i++) {
      var w = (i / m - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
  return pv.range(n).map(function() {
      var a = [], i;
      for (i = 0; i < m; i++) a[i] = 0;
      for (i = 0; i < 5; i++) bump(a);
      return a;
    });
}

/* Another layer generator using gamma distributions. */
function waves(n, m) {
  return pv.range(n).map(function(i) {
    return pv.range(m).map(function(j) {
        var x = 20 * j / m - i / 3;
        return x > 0 ? 2 * x * Math.exp(-.5 * x) : 0;
      });
    });
}
