pv.Behavior.select = function(f) {
  var target, m1, index, scenes, args, region;

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
    region = {};
    region.left = m1.x;
    region.top = m1.y;
    region.right = target.width() - m1.x;
    region.bottom = target.height() - m1.y;
    region.width = 0;
    region.height = 0;
    args = Array.prototype.concat.apply([region], arguments);
    f.apply(this, args);
  }

  function mousemove() {
    if (!target) return;
    setup();
    var m2 = target.mouse();
    region.left = Math.max(0, Math.min(m1.x, m2.x));
    region.top = Math.max(0, Math.min(m1.y, m2.y));
    region.right = Math.max(0, target.width() - Math.max(m1.x, m2.x));
    region.bottom = Math.max(0, target.height() - Math.max(m1.y, m2.y));
    region.width = Math.max(0, target.width() - region.left - region.right);
    region.height = Math.max(0, target.height() - region.top - region.bottom);
    f.apply(target, args);
  }

  function mouseup() {
    mousemove();
    target = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
