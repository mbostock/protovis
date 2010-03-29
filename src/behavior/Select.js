pv.Behavior.select = function(f) {
  var scene, // scene context
      index, // scene context
      r, // region being selected
      m1; // initial mouse position

  function mousedown(d) {
    index = this.index;
    scene = this.scene;
    m1 = this.mouse();
    r = d;
    r.x = m1.x;
    r.y = m1.y;
    r.dx = r.dy = 0;
  }

  function mousemove() {
    if (!scene) return;
    scene.mark.context(scene, index, function() {
        var m2 = this.mouse();
        r.x = Math.max(0, Math.min(m1.x, m2.x));
        r.y = Math.max(0, Math.min(m1.y, m2.y));
        r.dx = Math.min(this.width(), Math.max(m2.x, m1.x)) - r.x;
        r.dy = Math.min(this.height(), Math.max(m2.y, m1.y)) - r.y;
      });
  }

  function mouseup() {
    if (!scene) return;
    mousemove();
    r = null;
    scene = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
