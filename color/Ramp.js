// TODO support arbitrary color stops

/**
 * Returns a linear color ramp from the specified <tt>start</tt> color to the
 * specified <tt>end</tt> color. The color arguments may be specified either as
 * <tt>string</tt>s or as {@link pv.Color}s.
 *
 * @param {string} start the start color; may be a <tt>pv.Color</tt>.
 * @param {string} end the end color; may be a <tt>pv.Color</tt>.
 * @returns {pv.Ramp} a color ramp from <tt>start</tt> to <tt>end</tt>.
 */
pv.ramp = function(start, end) {
  return pv.Ramp(pv.color(start), pv.color(end));
};

/**
 * Constructs a ramp from the specified start color to the specified end
 * color. This constructor should not be invoked directly; use {@link pv.ramp}
 * instead.
 *
 * @class Represents a linear color ramp from the specified <tt>start</tt> color
 * to the specified <tt>end</tt> color. Ramps can be used as property functions;
 * their behavior is equivalent to calling {@link #value}, passing in the
 * current datum as the sample point. If the data is <i>not</i> a float in [0,
 * 1], the {@link #by} method can be used to map the datum to a suitable sample
 * point.
 *
 * @extends Function
 * @param {pv.Color} start the start color.
 * @param {pv.Color} end the end color.
 * @see pv.ramp
 */
pv.Ramp = function(start, end) {
  var s = start.rgb(), e = end.rgb(), f = pv.identity;

  /** @ignore Property function. */
  function ramp() {
    return value(f.apply(this, this.root.scene.data));
  }

  /** @ignore Interpolates between start and end at value t in [0,1]. */
  function value(t) {
    var t = Math.max(0, Math.min(1, t));
    var a = s.a * (1 - t) + e.a * t;
    if (a < 1e-5) a = 0; // avoid scientific notation
    return (s.a == 0) ? new pv.Color.Rgb(e.r, e.g, e.b, a)
        : ((e.a == 0) ? new pv.Color.Rgb(s.r, s.g, s.b, a)
        : new pv.Color.Rgb(
            Math.round(s.r * (1 - t) + e.r * t),
            Math.round(s.g * (1 - t) + e.g * t),
            Math.round(s.b * (1 - t) + e.b * t), a));
  }

  /**
   * Sets the sample function to be the specified function <tt>v</tt>.
   *
   * @param {function} v the new sample function.
   * @name pv.Ramp.prototype.by
   * @function
   * @returns {pv.Ramp} this.
   */
  ramp.by = function(v) { f = v; return this; };

  /**
   * Returns the interpolated color at the specified sample point.
   *
   * @param {number} t the sample point in [0, 1].
   * @name pv.Ramp.prototype.value
   * @function
   * @returns {pv.Color.Rgb} the interpolated color.
   */
  ramp.value = value;

  return ramp;
};
