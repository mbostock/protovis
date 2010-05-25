/**
 * Returns a new zoom behavior to be registered on mousewheel events.
 *
 * @class Implements interactive zooming using mousewheel events. Register this
 * behavior on panels to allow zooming. This behavior can be used in tandem with
 * {@link pv.Behavior.pan} to allow both panning and zooming:
 *
 * <pre>    .event("mousedown", pv.Behavior.pan())
 *     .event("mousewheel", pv.Behavior.zoom())</pre>
 *
 * The zoom behavior currently supports only mousewheel events; support for
 * keyboard shortcuts and gesture events to improve accessibility may be added
 * in the future.
 *
 * <p>The implementation of this behavior relies on the panel's
 * <tt>transform</tt> property, which specifies a matrix transformation that is
 * applied to child marks. Note that the transform property only affects the
 * panel's children, but not the panel itself; therefore the panel's fill and
 * stroke will not change when the contents are zoomed. The built-in support for
 * transforms only supports uniform scaling and translates, which is sufficient
 * for panning and zooming.  Note that this is not a strict geometric
 * transformation, as the <tt>lineWidth</tt> property is scale-aware: strokes
 * are drawn at constant size independent of scale.
 *
 * <p>Panels have transparent fill styles by default; this means that panels may
 * not receive mousewheel events to zoom. To fix this problem, either given the
 * panel a visible fill style (such as "white"), or set the <tt>events</tt>
 * property to "all" such that the panel receives events despite its transparent
 * fill.
 *
 * <p>The zoom behavior has optional support for bounding. If enabled, the user
 * will not be able to zoom out farther than the initial bounds. This feature is
 * designed to work in conjunction with the pan behavior.
 *
 * @extends pv.Behavior
 * @see pv.Panel#transform
 * @see pv.Mark#scale
 * @param {number} speed
 */
pv.Behavior.zoom = function(speed) {
  var bound; // whether to bound to the panel

  if (!arguments.length) speed = 1 / 48;

  /** @private */
  function mousewheel() {
    var v = this.mouse(),
        k = pv.event.wheel * speed,
        m = this.transform().translate(v.x, v.y)
            .scale((k < 0) ? (1e3 / (1e3 - k)) : ((1e3 + k) / 1e3))
            .translate(-v.x, -v.y);
    if (bound) {
      m.k = Math.max(1, m.k);
      m.x = Math.max((1 - m.k) * this.width(), Math.min(0, m.x));
      m.y = Math.max((1 - m.k) * this.height(), Math.min(0, m.y));
    }
    this.transform(m).render();
    pv.Mark.dispatch("zoom", this.scene, this.index);
  }

  /**
   * Sets or gets the bound parameter. If bounding is enabled, the user will not
   * be able to zoom out farther than the initial panel bounds. Bounding is not
   * enabled by default. If this behavior is used in tandem with the pan
   * behavior, both should use the same bound parameter.
   *
   * <p>Note: enabling bounding after zooming has already occurred will not
   * immediately reset the transform. Bounding should be enabled before the zoom
   * behavior is applied.
   *
   * @function
   * @returns {pv.Behavior.zoom} this, or the current bound parameter.
   * @name pv.Behavior.zoom.prototype.bound
   * @param {boolean} [x] the new bound parameter.
   */
  mousewheel.bound = function(x) {
    if (arguments.length) {
      bound = Boolean(x);
      return this;
    }
    return Boolean(bound);
  };

  return mousewheel;
};
