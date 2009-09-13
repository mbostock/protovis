/**
 * Returns a log scale for the specified domain.
 *
 * @class Represents a log scale.
 *
 * @param {number...} domain... domain values.
 * @returns {pv.Scale.log} a log scale.
 */
pv.Scale.log = function() {
  var d = [1, 10], l = [0, 1], b = 10, r = [0, 1], i = [pv.identity];

  /** @private */
  function scale(x) {
    var j = pv.search(d, x);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    return i[j]((log(x) - l[j]) / (l[j + 1] - l[j]));
  }

  /** @private */
  function log(x) {
    return pv.logSymmetric(x, b);
  }

  /**
   * @function
   * @name pv.Scale.log.prototype.domain
   * @param {number...} domain... domain values.
   * @returns {pv.Scale.log} <tt>this</tt>.
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
      l = d.map(log);
      return this;
    }
    return d;
  };

  /**
   * @function
   * @name pv.Scale.log.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Scale.log} <tt>this</tt>.
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
   * @name pv.Scale.log.prototype.invert
   * @param {number} y
   * @returns {number}
   */
  scale.invert = function(y) {
    var j = pv.search(r, y);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    var t = l[j] + (y - r[j]) / (r[j + 1] - r[j]) * (l[j + 1] - l[j]);
    return (t < 0) ? -Math.pow(b, -t) : Math.pow(b, t);
  };

  /**
   * @function
   * @name pv.Scale.log.prototype.ticks
   * @returns {number[]}
   */
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

  /**
   * @function
   * @name pv.Scale.log.prototype.nice
   * @returns {pv.Scale.log} <tt>this</tt>.
   */
  scale.nice = function() {
    d = [pv.logFloor(d[0], b), pv.logCeil(d[1], b)];
    l = d.map(log);
    return this;
  };

  /**
   * @function
   * @name pv.Scale.log.prototype.base
   * @param {number} v the new base.
   * @returns {pv.Scale.log} <tt>this</tt>.
   */
  scale.base = function(v) {
    b = v;
    l = d.map(log);
    return this;
  };

  /**
   * @function
   * @name pv.Scale.log.prototype.by
   * @param {function} f
   * @returns {pv.Scale.log} the new view.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
