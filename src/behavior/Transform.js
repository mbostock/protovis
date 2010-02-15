pv.Behavior.transform = function() {
  var transform = {},
      target,
      scene,
      index,
      m = pv.Matrix.identity(),
      mi,
      m1,
      v1;

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

  transform.pan = function() {
    target = this;
    index = this.index;
    scene = this.scene;
    v1 = this.mouse();
    m1 = m;
  };

  transform.zoom = function() {
    var v = this.mouse(), k = window.event.wheelDelta;
    m = m.translate(-v.x, -v.y);
    m = m.scale((k < 0) ? (1000 / (1000 - k)) : ((1000 + k) / 1000));
    m = m.translate(v.x, v.y);
    mi = null;
  };

  function mousemove() {
    if (!target) return;
    setup();
    var v2 = target.mouse();
    m = m1.translate(v2.x - v1.x, v2.y - v1.y);
    mi = null;
  }

  function mouseup() {
    mousemove();
    target = null;
  }

  transform.invert = function(n) {
    if (!mi) mi = m.invert();
    return pv.vector(
        mi.a * n.x + mi.b * n.y + mi.x,
        mi.c * n.x + mi.d * n.y + mi.y);
  };

  transform.x = function(n) {
    return m.a * n.x + m.b * n.y + m.x;
  };

  transform.y = function(n) {
    return m.c * n.x + m.d * n.y + m.y;
  };

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return transform;
};
