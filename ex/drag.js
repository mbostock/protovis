pv.doDrag = function(f, g) {
  var target, m1, index, scenes, args, region, original, bounds;

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
    region = {
      left: target.left(),
      top: target.top(),
      right: target.right(),
      bottom: target.bottom(),
      width: target.width(),
      height: target.height()
    };
    original = {
      left: region.left,
      top: region.top,
      right: region.right,
      bottom: region.bottom
    };
    bounds = {
      width: target.parent.width(),
      height: target.parent.height()
    };
    args = Array.prototype.concat.apply([region], arguments);
    f.apply(this, args);
  }

  function mousemove() {
    if (!target) return;
    setup();
    var m2 = target.mouse(), dx = m2.x - m1.x, dy = m2.y - m1.y;
    if ((original.left + dx) < 0) dx = -original.left;
    else if ((original.right - dx) < 0) dx = original.right;
    if ((original.top + dy) < 0) dy = -original.top;
    else if ((original.bottom - dy) < 0) dy = original.bottom;
    region.left = original.left + dx;
    region.right = original.right - dx;
    region.top = original.top + dy;
    region.bottom = original.bottom - dy;
    f.apply(target, args);
  }

  function mouseup() {
    mousemove();
    if (target) g.apply();;
    target = null;
  }

  pv.listen(window, "mousemove", mousemove);
  pv.listen(window, "mouseup", mouseup);
  return mousedown;
};
