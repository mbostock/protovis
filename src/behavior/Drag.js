pv.Behavior.drag = function(transform) {
  var target, scene, index, p, m1, v1;

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
    m1 = this.mouse();
    if (transform) m1 = transform.invert(m1);
    v1 = pv.vector(d.x, d.y);
    p = d;
    p.fixed = true;
  }

  function mousemove() {
    if (!target) return;
    setup();
    var m2 = target.mouse();
    if (transform) m2 = transform.invert(m2);
    p.x = v1.x - m1.x + m2.x;
    p.y = v1.y - m1.y + m2.y;
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
