/*
 * Simulation of a Belousov-Zhabotinsky reaction using a two-dimensional
 * cellular automaton. This algorithm is based on the work of Nitori Kawashiro;
 * see http://www.nitorijournal.org/?p=2109.
 */

var bzr = {};

bzr.color = function(x, y) {
  var p = y * bzr.size + x;
  return {r: bzr.a[p] * 255, g: bzr.b[p] * 255, b: bzr.c[p] * 255, a: 255};
};

bzr.reset = function(n) {
  if (!arguments.length) n = bzr.size;
  var a = bzr.a = [],
      b = bzr.b = [],
      c = bzr.c = [];
  bzr.size = n;
  for (var y = 0, p = 0; y < n; y++) {
    for (var x = 0; x < n; x++, p++) {
      a[p] = Math.random();
      b[p] = Math.random();
      c[p] = Math.random();
    }
  }
};

bzr.update = function() {
  var a = bzr.a.slice(),
      b = bzr.b.slice(),
      c = bzr.c.slice(),
      n = bzr.size;
  for (var y = 0, p = 0; y < n; y++) {
    for (var x = 0; x < n; x++, p++) {

      /* Compute neighbor averages, with wrap-around. */
      var sa = 0, sb = 0, sc = 0;
      for (var j = y - 1; j < y + 2; j++) {
        for (var i = x - 1; i < x + 2; i++) {
          var q = (j < 0 ? j + n : j >= n ? j - n : j) * n
                + (i < 0 ? i + n : i >= n ? i - n : i);
          sa += a[q];
          sb += b[q];
          sc += c[q];
        }
      }
      sa /= 9;
      sb /= 9;
      sc /= 9;

      var ta = sa + sa * (sb - sc);
      var tb = sb + sb * (sc - sa);
      var tc = sc + sc * (sa - sb);
      bzr.a[p] = ta < 1 ? ta : 1;
      bzr.b[p] = tb < 1 ? tb : 1;
      bzr.c[p] = tc < 1 ? tc : 1;
    }
  }
};

bzr.reset(100);
