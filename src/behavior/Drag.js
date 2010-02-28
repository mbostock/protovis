pv.Behavior.drag = function() {
  var scene, // scene context
      index, // scene context
      p, // particle being dragged
      v1; // initial mouse-particle offset

  function mousedown(d) {
    index = this.index;
    scene = this.scene;
    var m = this.mouse();
    v1 = pv.vector(d.x, d.y).minus(m);
    p = d;
    p.fixed = true;
  }

  function mousemove() {
    if (!scene) return;
    pv.Mark.context(scene, index, function() {
        var m = this.mouse();
        p.x = v1.x + m.x;
        p.y = v1.y + m.y;
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
