/**
 * Returns a linear scale for the specified domain. The arguments to this
 * constructor are optional, and equivalent to calling {@link #domain}.
 *
 * @class Represents a linear scale. <style
 * type="text/css">sub{line-height:0}</style> Most commonly, a linear scale
 * represents a 1-dimensional linear transformation from a numeric domain of
 * input data [<i>d<sub>0</sub></i>, <i>d<sub>1</sub></i>] to a numeric range of
 * pixels [<i>r<sub>0</sub></i>, <i>r<sub>1</sub></i>]. The equation for such a
 * scale is:
 *
 * <blockquote><i>f(x) = (x - d<sub>0</sub>) / (d<sub>1</sub> - d<sub>0</sub>) *
 * (r<sub>1</sub> - r<sub>0</sub>) + r<sub>0</sub></i></blockquote>
 *
 * For example, a linear scale from the domain [0, 100] to range [0, 640]:
 *
 * <blockquote><i>f(x) = (x - 0) / (100 - 0) * (640 - 0) + 0</i><br>
 * <i>f(x) = x / 100 * 640</i><br>
 * <i>f(x) = x * 6.4</i><br>
 * </blockquote>
 *
 * Thus, saying
 *
 * <pre>.height(function(d) d * 6.4)</pre>
 *
 * is identical to
 *
 * <pre>.height(pv.Scale.linear(0, 100).range(0, 640))</pre>
 *
 * As you can see, scales do not always make code smaller, but they should make
 * code more explicit and easier to modify. In addition to readability, scales
 * offer several useful features:
 *
 * <p>1. The range can be expressed in colors, rather than pixels. Changing the
 * example above to
 *
 * <pre>.fillStyle(pv.Scale.linear(0, 100).range("red", "green"))</pre>
 *
 * will cause it to fill the marks "red" on an input value of 0, "green" on an
 * input value of 100, and some color in-between for intermediate values.
 *
 * <p>2. The domain and range can be subdivided for a "poly-linear"
 * transformation. For example, you may want a diverging color scale that is
 * increasingly red for negative values, and increasingly green for positive
 * values:
 *
 * <pre>.fillStyle(pv.Scale.linear(-1, 0, 1).range("red", "white", "green"))</pre>
 *
 * The domain can be specified as a series of <i>n</i> monotonically-increasing
 * values; the range must also be specified as <i>n</i> values, resulting in
 * <i>n - 1</i> contiguous linear scales.
 *
 * <p>3. Linear scales can be inverted for interaction. The {@link #invert}
 * method takes a value in the output range, and returns the corresponding value
 * in the input domain. This is frequently used to convert the mouse location
 * (see {@link pv.Mark#mouse}) to a value in the input domain. Note that
 * inversion is only supported for numeric ranges, and not colors.
 *
 * <p>4. A scale can be queried for reasonable "tick" values. The {@link #ticks}
 * method provides a convenient way to get a series of evenly-spaced rounded
 * values in the input domain. Frequently these are used in conjunction with
 * {@link pv.Rule} to display tick marks or grid lines.
 *
 * <p>5. A scale can be "niced" to extend the domain to suitable rounded
 * numbers. If the minimum and maximum of the domain are messy because they are
 * derived from data, you can use {@link #nice} to round these values down and
 * up to even numbers.
 *
 * @param {number...} domain... domain values.
 * @returns {pv.Scale.linear} a linear scale.
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
   * @param {function} f
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
