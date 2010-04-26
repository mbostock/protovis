/**
 * @class
 * @extends pv.Behavior
 * @constructor
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
  }

  /**
   * @type boolean
   * @name pv.Behavior.zoom.prototype.bound
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
