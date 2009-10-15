pv.Behavior.drag = function(f) {
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
    region.left = Math.max(0, Math.min(bounds.width, original.left + dx));
    region.right = Math.max(0, Math.min(bounds.width, original.right - dx));
    region.top = Math.max(0, Math.min(bounds.height, original.top + dy));
    region.bottom = Math.max(0, Math.min(bounds.height, original.bottom - dy));
    region.width = Math.max(0, bounds.width - region.left - region.right);
    region.height = Math.max(0, bounds.height - region.top - region.bottom);
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
