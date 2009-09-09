pv.Scale.log = function() {
  var d = [1, 10], l = [0, 1], b = 10, r = [0, 1], i = pv.identity;

  function scale(x) {
    return i((log(x) - l[0]) / (l[1] - l[0]));
  }

  function log(x) {
    return pv.logSymmetric(x, b);
  }

  scale.domain = function(array, min, max) {
    if (arguments.length) {
      if (array instanceof Array) {
        if (arguments.length < 2) min = pv.identity;
        if (arguments.length < 3) max = min;
        d = [pv.min(array, min), pv.max(array, max)];
      } else {
        d = Array.prototype.slice.call(arguments);
      }
      l = d.map(log);
      return this;
    }
    return d;
  };

  scale.range = function(start, end) {
    if (arguments.length) {
      r = Array.prototype.slice.call(arguments);
      i = (typeof start == "number")
          ? function(t) { return t * (r[1] - r[0]) + r[0]; }
          : pv.ramp(start, end);
      return this;
    }
    return r;
  };

  scale.ticks = function() {
    var start = Math.floor(l[0]),
        end = Math.ceil(l[1]),
        ticks = [];
    for (var i = start; i < end; i++) {
      var x = Math.pow(b, i);
      for (var j = 1; j < b; j++) {
        ticks.push(x * j);
      }
    }
    ticks.push(Math.pow(b, end));
    if (ticks[0] < d[0]) ticks.shift();
    if (ticks[ticks.length - 1] > d[1]) ticks.pop();
    return ticks;
  };

  scale.nice = function() {
    d = [pv.logFloor(d[0], b), pv.logCeil(d[1], b)];
    l = d.map(log);
    return this;
  };

  scale.base = function(v) {
    b = v;
    l = d.map(log);
    return this;
  };

  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
