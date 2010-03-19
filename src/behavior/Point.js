pv.Behavior.point = function(r) {
  var unpoint, // the current pointer target
      collapse = null, // dimensions to collapse
      kx = 1, // x-dimension cost scale
      ky = 1, // y-dimension cost scale
      r2 = arguments.length ? r * r : 900; // fuzzy radius

  /** @private Creates a fake mouse event of the specified type. */
  function event(type) {
    var e = document.createEvent("MouseEvents");
    e.initEvent(type, true, false);
    return e;
  }

  /** @Private Search for the mark closest to the mouse. */
  function search(scene, index) {
    var s = scene[index],
        point = {cost: Infinity};
    for (var i = 0, n = s.children.length; i < n; i++) {
      var child = s.children[i], mark = child.mark, p;
      if (mark.type == "panel") {
        mark.scene = child;
        for (var j = 0, m = child.length; j < m; j++) {
          mark.index = j;
          p = search(child, j);
          if (p.cost < point.cost) point = p;
        }
        delete mark.scene;
        delete mark.index;
      } else if (mark.$handlers.point) {
        var v = mark.mouse();
        for (var j = 0, m = child.length; j < m; j++) {
          var c = child[j],
              dx = v.x - c.left,
              dy = v.y - c.top,
              dd = kx * dx * dx + ky * dy * dy;
          if (dd < point.cost) {
            point.distance = dx * dx + dy * dy;
            point.cost = dd;
            point.scene = child;
            point.index = j;
          }
        }
      }
    }
    return point;
  }

  function mousemove() {
    /* If the closest mark is far away, clear the current target. */
    var point = search(this.scene, this.index);
    if ((point.cost == Infinity) || (point.distance > r2)) point = null;

    /* Unpoint the old target, if it's not the new target. */
    if (unpoint) {
      if (point
          && (unpoint.scene == point.scene)
          && (unpoint.index == point.index)) return;
      pv.Mark.dispatch(event("unpoint"), unpoint.scene, unpoint.index);
    }

    /* Point the new target, if there is one. */
    if (unpoint = point) {
      pv.Mark.dispatch(event("point"), point.scene, point.index);
    }
  }

  mousemove.collapse = function(x) {
    if (arguments.length) {
      collapse = String(x);
      switch (collapse) {
        case "y": kx = 1; ky = 0; break;
        case "x": kx = 0; ky = 1; break;
        default: kx = 1; ky = 1; break;
      }
      return mousemove;
    }
    return collapse;
  };

  return mousemove;
};
