pv.Scale.linear = function() {
  var d = [0, 1], r = [0, 1], i = pv.identity;

  function scale(x) {
    return i((x - d[0]) / (d[1] - d[0]));
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
      return this;
    }
    return d;
  };

  scale.range = function(start, end) {
    if (arguments.length) {
      r = Array.prototype.slice.call(arguments);
      i = pv.Scale.interpolator(start, end);
      return this;
    }
    return r;
  };

  scale.ticks = function() {
    var span = d[1] - d[0], step = pv.logCeil(span / 10, 10);
    if (span / step < 2) step /= 5;
    else if (span / step < 5) step /= 2;
    var start = Math.ceil(d[0] / step) * step,
        end = Math.floor(d[1] / step) * step;
    return pv.range(start, end + step, step);
  };

  scale.nice = function() {
    var step = Math.pow(10, Math.round(Math.log(d[1] - d[0]) / Math.log(10)) - 1);
    d = [Math.floor(d[0] / step) * step, Math.ceil(d[1] / step) * step];
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
