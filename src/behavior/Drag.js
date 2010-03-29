pv.Behavior.drag = function() {
  var scene, // scene context
      index, // scene context
      p, // particle being dragged
      v1, // initial mouse-particle offset
      max;

  function mousedown(d) {
    index = this.index;
    scene = this.scene;
    var m = this.mouse();
    v1 = pv.vector(d.x, d.y).minus(m);
    max = {
      x: this.parent.width() - (d.dx || 0),
      y: this.parent.height() - (d.dy || 0)
    };
    p = d;
    p.fixed = true;
  }

  function mousemove() {
    if (!scene) return;
    scene.mark.context(scene, index, function() {
        var m = this.mouse();
        p.x = Math.max(0, Math.min(v1.x + m.x, max.x));
        p.y = Math.max(0, Math.min(v1.y + m.y, max.y));
      });
  }

  function mouseup() {
    if (!scene) return;
    mousemove();
    p.fixed = false;
    p = null;
    scene = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
