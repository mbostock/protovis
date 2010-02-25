pv.Behavior.drag = function() {
  var target, scene, index, p, v1;

  /* Setup the scene stack. */
  function setup() {
    var m = target, s = scene, i = index;
    do {
      m.index = i;
      m.scene = s;
      i = s.parentIndex;
      s = s.parent;
    } while (m = m.parent);
  }

  function mousedown(d) {
    target = this;
    index = target.index;
    scene = target.scene;
    var m = this.mouse();
    v1 = pv.vector(d.x, d.y).minus(m);
    p = d;
    p.fixed = true;
  }

  function mousemove() {
    if (!target) return;
    setup();
    var m = target.mouse();
    p.x = v1.x + m.x;
    p.y = v1.y + m.y;
  }

  function mouseup() {
    if (!target) return;
    mousemove();
    p.fixed = false;
    p = null;
    target = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
