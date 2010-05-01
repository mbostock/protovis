/**
 * Returns a root scale for the specified domain. The arguments to this
 * constructor are optional, and equivalent to calling {@link #domain}.
 * The default domain and range are [0,1].
 *
 * @class Represents a root scale; a function that performs a power
 * transformation. <style type="text/css">sub{line-height:0}</style> Most
 * commonly, a root scale represents a 1-dimensional root transformation from a
 * numeric domain of input data [<i>d<sub>0</sub></i>, <i>d<sub>1</sub></i>] to
 * a numeric range of pixels [<i>r<sub>0</sub></i>, <i>r<sub>1</sub></i>].
 *
 * <p>Note that the scale is itself a function, and thus can be used as a
 * property directly, assuming that the data associated with a mark is a
 * number. While this is convenient for single-use scales, frequently it is
 * desirable to define scales globally:
 *
 * <pre>var y = pv.Scale.root(0, 100).range(0, 640);</pre>
 *
 * The <tt>y</tt> scale can now be equivalently referenced within a property:
 *
 * <pre>    .height(function(d) y(d))</pre>
 *
 * Alternatively, if the data are not simple numbers, the appropriate value can
 * be passed to the <tt>y</tt> scale (e.g., <tt>d.foo</tt>). The {@link #by}
 * method similarly allows the data to be mapped to a numeric value before
 * performing the root transformation.
 *
 * @param {number...} domain... optional domain values.
 * @extends pv.Scale.quantitative
 */
pv.Scale.root = function() {
  var scale = pv.Scale.quantitative();

  /**
   * Sets or gets the exponent; defaults to 2.
   *
   * @function
   * @name pv.Scale.root.prototype.power
   * @param {number} [v] the new exponent.
   * @returns {pv.Scale.root} <tt>this</tt>, or the current base.
   */
  scale.power = function(v) {
    if (arguments.length) {
      var b = Number(v), p = 1 / b;
      scale.transform(
        function(x) { return Math.pow(x, p); },
        function(y) { return Math.pow(y, b); });
      return this;
    }
    return b;
  };

  scale.domain.apply(scale, arguments);
  return scale.power(2);
};
