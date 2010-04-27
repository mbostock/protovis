/**
 * @class
 * @extends pv.Behavior
 * @constructor
 */
pv.Behavior.drag = function() {
  var scene, // scene context
      index, // scene context
      p, // particle being dragged
      v1, // initial mouse-particle offset
      max;

  /** @private */
  function mousedown(d) {
    index = this.index;
    scene = this.scene;
    var m = this.mouse();
    v1 = ((p = d).fix = pv.vector(d.x, d.y)).minus(m);
    max = {
      x: this.parent.width() - (d.dx || 0),
      y: this.parent.height() - (d.dy || 0)
    };
  }

  /** @private */
  function mousemove() {
    if (!scene) return;
    scene.mark.context(scene, index, function() {
        var m = this.mouse();
        p.x = p.fix.x = Math.max(0, Math.min(v1.x + m.x, max.x));
        p.y = p.fix.y = Math.max(0, Math.min(v1.y + m.y, max.y));
        this.parent.render();
      });
  }

  /** @private */
  function mouseup() {
    if (!scene) return;
    p.fix = null;
    scene.mark.context(scene, index, function() { this.parent.render(); });
    scene = null;
  }

  /**
   * @function
   * @name pv.Behavior.drag.prototype.render
   * @param {pv.Mark} mark
   * @returns {pv.Behavior.drag} this.
   */
  mousedown.render = function(mark) {
    render = mark;
    return mousedown;
  };

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
