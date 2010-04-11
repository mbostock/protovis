pv.Behavior.pan = function() {
  var scene, // scene context
      index, // scene context
      m1, // transformation matrix at the start of panning
      v1, // mouse location at the start of panning
      k, // inverse scale
      bound; // whether to bound to the panel

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
  }

  function mouseup() {
    scene = null;
  }

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
