/**
 * Returns an ordinal scale for the specified domain. The arguments to this
 * constructor are optional, and equivalent to calling {@link #domain}.
 *
 * @class Represents an ordinal scale. <style
 * type="text/css">sub{line-height:0}</style> An ordinal scale represents a
 * pairwise mapping from <i>n</i> discrete values in the input domain to
 * <i>n</i> discrete values in the output range. For example, an ordinal scale
 * might map a domain of species ["setosa", "versicolor", "virginica"] to colors
 * ["red", "green", "blue"]. Thus, saying
 *
 * <pre>.fillStyle(function(d) {
 *     switch (d.species) {
 *       case "setosa": return "red";
 *       case "versicolor": return "green";
 *       case "virginica": return "blue";
 *     }
 *   })</pre>
 *
 * is equivalent to
 *
 * <pre>.fillStyle(pv.Scale.ordinal("setosa", "versicolor", "virginica")
 *     .range("red", "green", "blue")
 *     .by(function(d) d.species))</pre>
 *
 * If the mapping from species to color does not need to be specified
 * explicitly, the domain can be omitted. In this case it will be inferred
 * lazily from the data:
 *
 * <pre>.fillStyle(pv.colors("red", "green", "blue")
 *     .by(function(d) d.species))</pre>
 *
 * When the domain is inferred, the first time the scale is invoked, the first
 * element from the range will be returned. Subsequent calls with unique values
 * will return subsequent elements from the range. If the inferred domain grows
 * larger than the range, range values will be reused. However, it is strongly
 * recommended that the domain and the range contain the same number of
 * elements.
 *
 * <p>When the domain is specified explicitly, the range can be specified as a
 * continuous interval (e.g., for pixel positioning) by using exactly two
 * numeric values. For example, if <tt>states</tt> is an array of the fifty
 * U.S. state names, the state name can be encoded in the left position:
 *
 * <pre>.left(pv.Scale.ordinal(states)
 *     .range(0, 640)
 *     .by(function(d) d.state))</pre>
 *
 * This is equivalent to specifying the range as <tt>pv.range(0, 640, 640 /
 * states.length)</tt>.
 *
 * If no range is specified, the range defaults to [0, 1].
 *
 * <p>NOTE: ordinal scales are not (yet) invertible, since the domain and range
 * and discontinuous.
 *
 * @param {...} domain... domain values.
 * @returns {pv.Scale.ordinal} an ordinal scale.
 * @see pv.colors
 */
pv.Scale.ordinal = function() {
  var d = [], i = {}, r, rmin = 0, rmax = 1;

  /** @private */
  function scale(x) {
    if (!(x in i)) i[x] = d.push(x) - 1;
    return r
        ? r[i[x] % r.length]
        : (i[x] / d.length) * (rmax - rmin) + rmin;
  }

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
   * @name pv.Scale.ordinal.prototype.domain
   * @param {...} domain... domain values.
   * @returns {pv.Scale.ordinal} <tt>this</tt>, or the current domain.
   */
  scale.domain = function(array, f) {
    if (arguments.length) {
      array = (array instanceof Array)
          ? ((arguments.length > 1) ? array.map(f) : array)
          : Array.prototype.slice.call(arguments);

      /* Filter the specified ordinals to their unique values. */
      d = [];
      var seen = {};
      for (var j = 0; j < array.length; j++) {
        var o = array[j];
        if (!(o in seen)) {
          seen[o] = true;
          d.push(o);
        }
      }

      i = pv.numerate(d);
      return this;
    }
    return d;
  };

  /**
   * Sets or gets the output range. This method can be invoked several ways:
   *
   * <p>1. <tt>range(values...)</tt>
   *
   * <p>Specifying the range as a series of values is the most explicit and
   * recommended approach. However, if the range values are derived from data,
   * you may find the second method more appropriate.
   *
   * <p>2. <tt>range(array, f)</tt>
   *
   * <p>Rather than enumerating the range values as explicit arguments to this
   * method, you can specify a single argument of an array. In addition, you can
   * specify an optional accessor function to extract the range values from the
   * array.
   *
   * <p>3. <tt>range(min, max)</tt>
   *
   * <p>If the output range is continuous, specify exactly two numeric arguments
   * to this function. The output range will be interpolated, similar to a
   * linear scale. This method is equivalent to specifying the range as
   * <tt>{@link pv.range}(min, max, (max - min) / domain.length)</tt>. This
   * method requires setting the domain explicitly!
   *
   * <p>4. <tt>range()</tt>
   *
   * <p>Invoking the <tt>range</tt> method with no arguments returns the
   * current range as an array.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Scale.ordinal} <tt>this</tt>, or the current range.
   */
  scale.range = function(min, max) {
    if (arguments.length) {
      if ((arguments.length == 2)
          && (typeof min == "number")
          && (typeof max == "number")) {
        r = undefined;
        rmin = min;
        rmax = max;
      } else { // array, f
        r = (min instanceof Array)
            ? ((arguments.length > 1) ? min.map(max) : min)
            : Array.prototype.slice.call(arguments);
        if (typeof r[0] == "string") r = r.map(pv.color);
      }
      return this;
    }
    return r || [rmin, rmax];
  };

  /**
   * Returns a view of this scale by the specified accessor function <tt>f</tt>.
   * Given a scale <tt>y</tt>, <tt>y.by(function(d) d.foo)</tt> is equivalent to
   * <tt>function(d) y(d.foo)</tt>. This method should be used judiciously; it
   * is typically more clear to invoke the scale directly, passing in the value
   * to be scaled.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.by
   * @param {function} f an accessor function.
   * @returns {pv.Scale.ordinal} a view of this scale by the specified accessor
   * function.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};
