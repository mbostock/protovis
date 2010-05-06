/**
 * Constructs a default quantile scale. The arguments to this constructor are
 * optional, and equivalent to calling {@link #domain}. The default domain is
 * the empty set, and the default range is [0,1].
 *
 * @class Represents a quantile scale; a function that maps from a value within
 * a sortable domain to a quantized numeric range. Typically, the domain is a
 * set of numbers, but any sortable value (such as strings) can be used as the
 * domain of a quantile scale. The range defaults to [0,1], with 0 corresponding
 * to the smallest value in the domain, 1 the largest, .5 the median, etc.
 *
 * <p>By default, the number of quantiles in the range corresponds to the number
 * of values in the domain. The {@link #quantiles} method can be used to specify
 * an explicit number of quantiles; for example, <tt>quantiles(4)</tt> produces
 * a standard quartile scale. A quartile scale's range is a set of four discrete
 * values, such as [0, 1/3, 2/3, 1]. Calling the {@link #range} method will
 * scale these discrete values accordingly, similar to {@link
 * pv.Scale.ordinal#splitFlush}.
 *
 * <p>For example, given the strings ["c", "a", "b"], a default quantile scale:
 *
 * <pre>pv.Scale.quantile("c", "a", "b")</pre>
 *
 * will return 0 for "a", .5 for "b", and 1 for "c".
 *
 * @extends pv.Scale
 */
pv.Scale.quantile = function() {
  var n = -1, // number of quantiles
      j = -1, // max quantile index
      q = [], // quantile boundaries
      d = [], // domain
      y = pv.Scale.linear(); // range

  /** @private */
  function scale(x) {
    return y(Math.max(0, Math.min(j, pv.search.index(q, x) - 1)) / j);
  }

  /**
   * Sets or gets the quantile boundaries. By default, each element in the
   * domain is in its own quantile. If the argument to this method is a number,
   * it specifies the number of equal-sized quantiles by which to divide the
   * domain.
   *
   * <p>If no arguments are specified, this method returns the quantile
   * boundaries; the first element is always the minimum value of the domain,
   * and the last element is the maximum value of the domain. Thus, the length
   * of the returned array is always one greater than the number of quantiles.
   *
   * @function
   * @name pv.Scale.quantile.prototype.quantiles
   * @param {number} x the number of quantiles.
   */
  scale.quantiles = function(x) {
    if (arguments.length) {
      n = Number(x);
      if (n < 0) {
        q = [d[0]].concat(d);
        j = d.length - 1;
      } else {
        q = [];
        q[0] = d[0];
        for (var i = 1; i <= n; i++) {
          q[i] = d[~~(i * (d.length - 1) / n)];
        }
        j = n - 1;
      }
      return this;
    }
    return q;
  };

  /**
   * Sets or gets the input domain. This method can be invoked several ways:
   *
   * <p>1. <tt>domain(values...)</tt>
   *
   * <p>Specifying the domain as a series of values is the most explicit and
   * recommended approach. However, if the domain values are derived from data,
   * you may find the second method more appropriate.
   *
   * <p>2. <tt>domain(array, f)</tt>
   *
   * <p>Rather than enumerating the domain values as explicit arguments to this
   * method, you can specify a single argument of an array. In addition, you can
   * specify an optional accessor function to extract the domain values from the
   * array.
   *
   * <p>3. <tt>domain()</tt>
   *
   * <p>Invoking the <tt>domain</tt> method with no arguments returns the
   * current domain as an array.
   *
   * @function
   * @name pv.Scale.quantile.prototype.domain
   * @param {...} domain... domain values.
   * @returns {pv.Scale.quantile} <tt>this</tt>, or the current domain.
   */
  scale.domain = function(array, f) {
    if (arguments.length) {
      d = (array instanceof Array)
          ? pv.map(array, f)
          : Array.prototype.slice.call(arguments);
      d.sort(pv.naturalOrder);
      scale.quantiles(n); // recompute quantiles
      return this;
    }
    return d;
  };

  /**
   * Sets or gets the output range. This method can be invoked several ways:
   *
   * <p>1. <tt>range(min, ..., max)</tt>
   *
   * <p>The range may be specified as a series of numbers or colors. Most
   * commonly, two numbers are specified: the minimum and maximum pixel values.
   * For a color scale, values may be specified as {@link pv.Color}s or
   * equivalent strings. For a diverging scale, or other subdivided non-uniform
   * scales, multiple values can be specified. For example:
   *
   * <pre>    .range("red", "white", "green")</pre>
   *
   * <p>Currently, only numbers and colors are supported as range values. The
   * number of range values must exactly match the number of domain values, or
   * the behavior of the scale is undefined.
   *
   * <p>2. <tt>range()</tt>
   *
   * <p>Invoking the <tt>range</tt> method with no arguments returns the current
   * range as an array of numbers or colors.
   *
   * @function
   * @name pv.Scale.quantile.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Scale.quantile} <tt>this</tt>, or the current range.
   */
  scale.range = function() {
    if (arguments.length) {
      y.range.apply(y, arguments);
      return this;
    }
    return y.range();
  };

  /**
   * Returns a view of this scale by the specified accessor function <tt>f</tt>.
   * Given a scale <tt>y</tt>, <tt>y.by(function(d) d.foo)</tt> is equivalent to
   * <tt>function(d) y(d.foo)</tt>.
   *
   * <p>This method is provided for convenience, such that scales can be
   * succinctly defined inline. For example, given an array of data elements
   * that have a <tt>score</tt> attribute with the domain [0, 1], the height
   * property could be specified as:
   *
   * <pre>.height(pv.Scale.linear().range(0, 480).by(function(d) d.score))</pre>
   *
   * This is equivalent to:
   *
   * <pre>.height(function(d) d.score * 480)</pre>
   *
   * This method should be used judiciously; it is typically more clear to
   * invoke the scale directly, passing in the value to be scaled.
   *
   * @function
   * @name pv.Scale.quantile.prototype.by
   * @param {function} f an accessor function.
   * @returns {pv.Scale.quantile} a view of this scale by the specified
   * accessor function.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
