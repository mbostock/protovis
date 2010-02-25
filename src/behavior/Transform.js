pv.Behavior.transform = function() {
  var transform = {},
      target,
      scene,
      index,
      m = pv.Transform.identity, // current transformation matrix
      m1, // transformation matrix at the start of panning
      v1; // mouse location at the start of panning

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
    v1 = pv.vector(pv.event.pageX, pv.event.pageY);
    m1 = m;
  };

  transform.zoom = function() {
    var v = this.mouse(), k = window.event.wheelDelta;
    this.transform(m = m.translate(v.x, v.y)
        .scale((k < 0) ? (1000 / (1000 - k)) : ((1000 + k) / 1000))
        .translate(-v.x, -v.y)).render();
  };

  function mousemove() {
    if (!target) return;
    setup();
    var x = (pv.event.pageX - v1.x) / m.k, y = (pv.event.pageY - v1.y) / m.k;
    target.transform(m = m1.translate(x, y)).render();
  }

  function mouseup() {
    mousemove();
    target = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return transform;
};
