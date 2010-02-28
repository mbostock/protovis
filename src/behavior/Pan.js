pv.Behavior.pan = function() {
  var scene, // scene context
      index, // scene context
      m1, // transformation matrix at the start of panning
      v1; // mouse location at the start of panning

  function mousedown() {
    index = this.index;
    scene = this.scene;
    v1 = pv.vector(pv.event.pageX, pv.event.pageY);
    m1 = this.transform();
  }

  function mousemove() {
    if (!scene) return;
    pv.Mark.context(scene, index, function() {
        var x = (pv.event.pageX - v1.x) / this.scale,
            y = (pv.event.pageY - v1.y) / this.scale;
        this.transform(m1.translate(x, y)).render();
      });
  }

  function mouseup() {
    mousemove();
    scene = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
