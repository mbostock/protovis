/**
 * Returns a new pan behavior to be registered on mousedown events.
 *
 * @class Implements interactive panning starting with mousedown events.
 * Register this behavior on panels to allow panning. This behavior can be used
 * in tandem with {@link pv.Behavior.zoom} to allow both panning and zooming:
 *
 * <pre>    .event("mousedown", pv.Behavior.pan())
 *     .event("mousewheel", pv.Behavior.zoom())</pre>
 *
 * The pan behavior currently supports only mouse events; support for keyboard
 * shortcuts to improve accessibility may be added in the future.
 *
 * <p>After the initial mousedown event is triggered, this behavior listens for
 * mousemove and mouseup events on the window. This allows panning to continue
 * even if the mouse temporarily leaves the panel that is being panned, or even
 * the root panel.
 *
 * <p>The implementation of this behavior relies on the panel's
 * <tt>transform</tt> property, which specifies a matrix transformation that is
 * applied to child marks. Note that the transform property only affects the
 * panel's children, but not the panel itself; therefore the panel's fill and
 * stroke will not change when the contents are panned.
 *
 * <p>Panels have transparent fill styles by default; this means that panels may
 * not receive the initial mousedown event to start panning. To fix this
 * problem, either given the panel a visible fill style (such as "white"), or
 * set the <tt>events</tt> property to "all" such that the panel receives events
 * despite its transparent fill.
 *
 * <p>The pan behavior has optional support for bounding. If enabled, the user
 * will not be able to pan the panel outside of the initial bounds. This feature
 * is designed to work in conjunction with the zoom behavior; otherwise,
 * bounding the panel effectively disables all panning.
 *
 * @extends pv.Behavior
 * @see pv.Behavior.zoom
 * @see pv.Panel#transform
 */
pv.Behavior.pan = function() {
  var scene, // scene context
      index, // scene context
      m1, // transformation matrix at the start of panning
      v1, // mouse location at the start of panning
      k, // inverse scale
      bound; // whether to bound to the panel

  /** @private */
  function mousedown() {
    index = this.index;
    scene = this.scene;
    v1 = pv.vector(pv.event.pageX, pv.event.pageY);
    m1 = this.transform();
    k = 1 / (m1.k * this.scale);
    if (bound) {
      bound = {
        x: (1 - m1.k) * this.width(),
        y: (1 - m1.k) * this.height()
      };
    }
  }

  /** @private */
  function mousemove() {
    if (!scene) return;
    scene.mark.context(scene, index, function() {
        var x = (pv.event.pageX - v1.x) * k,
            y = (pv.event.pageY - v1.y) * k,
            m = m1.translate(x, y);
        if (bound) {
          m.x = Math.max(bound.x, Math.min(0, m.x));
          m.y = Math.max(bound.y, Math.min(0, m.y));
        }
        this.transform(m).render();
      });
    pv.Mark.dispatch("pan", scene, index);
  }

  /** @private */
  function mouseup() {
    scene = null;
  }

  /**
   * Sets or gets the bound parameter. If bounding is enabled, the user will not
   * be able to pan outside the initial panel bounds; this typically applies
   * only when the pan behavior is used in tandem with the zoom behavior.
   * Bounding is not enabled by default.
   *
   * <p>Note: enabling bounding after panning has already occurred will not
   * immediately reset the transform. Bounding should be enabled before the
   * panning behavior is applied.
   *
   * @function
   * @returns {pv.Behavior.pan} this, or the current bound parameter.
   * @name pv.Behavior.pan.prototype.bound
   * @param {boolean} [x] the new bound parameter.
   */
  mousedown.bound = function(x) {
    if (arguments.length) {
      bound = Boolean(x);
      return this;
    }
    return Boolean(bound);
  };

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
