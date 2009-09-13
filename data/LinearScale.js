/**
 * Returns a linear scale for the specified domain.
 *
 * @class Represents a linear scale.
 *
 * @param {number...} domain... domain values.
 * @returns {pv.Scale.linear} a linear scale.
 * @extends pv.Scale
 */
pv.Scale.linear = function() {
  var d = [0, 1], r = [0, 1], i = [pv.identity];

  /** @private */
  function scale(x) {
    var j = pv.search(d, x);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    return i[j]((x - d[j]) / (d[j + 1] - d[j]));
  }

  /**
   * @function
   * @name pv.Scale.linear.prototype.domain
   * @param {number...} domain... domain values.
   * @returns {pv.Scale.linear} <tt>this</tt>.
   */
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

  /**
   * @function
   * @name pv.Scale.linear.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Scale.linear} <tt>this</tt>.
   */
  scale.range = function(start, end) {
    if (arguments.length) {
      r = Array.prototype.slice.call(arguments);
      i = [];
      for (var j = 0; j < r.length - 1; j++) {
        i.push(pv.Scale.interpolator(r[j], r[j + 1]));
      }
      return this;
    }
    return r;
  };

  /**
   * @function
   * @name pv.Scale.linear.prototype.invert
   * @param {number} y
   * @returns {number}
   */
  scale.invert = function(y) {
    var j = pv.search(r, y);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    return (y - r[j]) / (r[j + 1] - r[j]) * (d[j + 1] - d[j]) + d[j];
  };

  /**
   * @function
   * @name pv.Scale.linear.prototype.ticks
   * @returns {number[]}
   */
  scale.ticks = function() {
    var min = d[0],
        max = d[d.length - 1],
        span = max - min,
        step = pv.logCeil(span / 10, 10);
    if (span / step < 2) step /= 5;
    else if (span / step < 5) step /= 2;
    var start = Math.ceil(min / step) * step,
        end = Math.floor(max / step) * step;
    return pv.range(start, end + step, step);
  };

  /**
   * @function
   * @name pv.Scale.linear.prototype.nice
   * @returns {pv.Scale.linear} <tt>this</tt>.
   */
  scale.nice = function() {
    var min = d[0],
        max = d[d.length - 1],
        step = Math.pow(10, Math.round(Math.log(max - min) / Math.log(10)) - 1);
    d = [Math.floor(min / step) * step, Math.ceil(max / step) * step];
    return this;
  };

  /**
   * @function
   * @name pv.Scale.linear.prototype.by
   * @param {function f
   * @returns {pv.Scale.linear} the new view.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
