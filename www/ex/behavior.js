pv.Slider = function(f) {
  var target, ma, mb, m1, index, scenes, args;

  /* Setup the scene stack. */
  function setup() {
    var m = target, s = scenes, i = index;
    do {
      m.index = i;
      m.scene = s;
      i = s.parentIndex;
      s = s.parent;
    } while (m = m.parent);
  }

  function mousedown() {
    target = this;
    index = target.index;
    scenes = target.scene;
    m1 = this.mouse();
    ma = pv.vector(target.left(), target.top());
    mb = ma.plus(target.width(), target.height());
    args = Array.prototype.concat.apply([ma, mb], arguments);
    f.apply(this, args);
  }

  function mousemove() {
    if (!target) return;
    setup();
    var m2 = target.mouse();
    args[0] = ma.plus(m2).minus(m1);
    args[1] = mb.plus(m2).minus(m1);
    f.apply(target, args);
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", function() { mousemove(); target = null; });
  return mousedown;
};

pv.Resizer = function(f) {
  var target, index, scenes, args;

  /* Setup the scene stack. */
  function setup() {
    var m = target, s = scenes, i = index;
    do {
      m.index = i;
      m.scene = s;
      i = s.parentIndex;
      s = s.parent;
    } while (m = m.parent);
  }

  function mousedown() {
    var m = this.mouse();
    target = this;
    index = target.index;
    scenes = target.scene;
    args = Array.prototype.concat.apply([m, m], arguments);
    f.apply(this, args);
  }

  function mousemove() {
    if (!target) return;
    setup();
    args[1] = target.mouse();
    f.apply(target, args);
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", function() { mousemove(); target = null; });
  return mousedown;
};
