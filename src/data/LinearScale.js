/**
 * Returns a linear scale for the specified domain. The arguments to this
 * constructor are optional, and equivalent to calling {@link #domain}.
 * The default domain and range are [0,1].
 *
 * @class Represents a linear scale; a function that performs a linear
 * transformation. <style type="text/css">sub{line-height:0}</style> Most
 * commonly, a linear scale represents a 1-dimensional linear transformation
 * from a numeric domain of input data [<i>d<sub>0</sub></i>,
 * <i>d<sub>1</sub></i>] to a numeric range of pixels [<i>r<sub>0</sub></i>,
 * <i>r<sub>1</sub></i>]. The equation for such a scale is:
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
 * <pre>    .height(function(d) d * 6.4)</pre>
 *
 * is identical to
 *
 * <pre>    .height(pv.Scale.linear(0, 100).range(0, 640))</pre>
 *
 * Note that the scale is itself a function, and thus can be used as a property
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
 * @param {number...} domain... optional domain values.
 * @extends pv.Scale.quantitative
 */
pv.Scale.linear = function() {
  var scale = pv.Scale.quantitative();
  scale.domain.apply(scale, arguments);
  return scale;
};
