/**
 * Abstract; see the various scale implementations.
 *
 * @class Represents a scale; a function that performs a transformation from
 * data domain to visual range. For quantitative and quantile scales, the domain
 * is expressed as numbers; for ordinal scales, the domain is expressed as
 * strings (or equivalently objects with unique string representations). The
 * "visual range" may correspond to pixel space, colors, font sizes, and the
 * like.
 *
 * <p>Note that scales are functions, and thus can be used as properties
 * directly, assuming that the data associated with a mark is a number. While
 * this is convenient for single-use scales, frequently it is desirable to
 * define scales globally:
 *
 * <pre>var y = pv.Scale.linear(0, 100).range(0, 640);</pre>
 *
 * The <tt>y</tt> scale can now be equivalently referenced within a property:
 *
 * <pre>    .height(function(d) y(d))</pre>
 *
 * Alternatively, if the data are not simple numbers, the appropriate value can
 * be passed to the <tt>y</tt> scale (e.g., <tt>d.foo</tt>). The {@link #by}
 * method similarly allows the data to be mapped to a numeric value before
 * performing the linear transformation.
 *
 * @see pv.Scale.quantitative
 * @see pv.Scale.quantile
 * @see pv.Scale.ordinal
 * @extends function
 */
pv.Scale = function() {};

/**
 * @private Returns a function that interpolators from the start value to the
 * end value, given a parameter <i>t</i> in [0, 1].
 *
 * @param start the start value.
 * @param end the end value.
 */
pv.Scale.interpolator = function(start, end) {
  if (typeof start == "number") {
    return function(t) {
      return t * (end - start) + start;
    };
  }

  /* For now, assume color. */
  start = pv.color(start).rgb();
  end = pv.color(end).rgb();
  return function(t) {
    var a = start.a * (1 - t) + end.a * t;
    if (a < 1e-5) a = 0; // avoid scientific notation
    return (start.a == 0) ? pv.rgb(end.r, end.g, end.b, a)
        : ((end.a == 0) ? pv.rgb(start.r, start.g, start.b, a)
        : pv.rgb(
            Math.round(start.r * (1 - t) + end.r * t),
            Math.round(start.g * (1 - t) + end.g * t),
            Math.round(start.b * (1 - t) + end.b * t), a));
  };
};

/**
 * Returns a view of this scale by the specified accessor function <tt>f</tt>.
 * Given a scale <tt>y</tt>, <tt>y.by(function(d) d.foo)</tt> is equivalent to
 * <tt>function(d) y(d.foo)</tt>.
 *
 * <p>This method is provided for convenience, such that scales can be
 * succinctly defined inline. For example, given an array of data elements that
 * have a <tt>score</tt> attribute with the domain [0, 1], the height property
 * could be specified as:
 *
 * <pre>    .height(pv.Scale.linear().range(0, 480).by(function(d) d.score))</pre>
 *
 * This is equivalent to:
 *
 * <pre>    .height(function(d) d.score * 480)</pre>
 *
 * This method should be used judiciously; it is typically more clear to invoke
 * the scale directly, passing in the value to be scaled.
 *
 * @function
 * @name pv.Scale.prototype.by
 * @param {function} f an accessor function.
 * @returns {pv.Scale} a view of this scale by the specified accessor function.
 */
