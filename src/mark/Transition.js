pv.Transition = function(mark) {
  var that = this,
      ease = pv.ease("cubic-in-out"),
      duration = 250,
      timer;

  var interpolated = {
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    width: 1,
    height: 1,
    innerRadius: 1,
    outerRadius: 1,
    radius: 1,
    startAngle: 1,
    endAngle: 1,
    angle: 1,
    fillStyle: 1,
    strokeStyle: 1,
    lineWidth: 1,
    eccentricity: 1,
    tension: 1,
    textAngle: 1,
    textStyle: 1,
    textMargin: 1
  };

  var defaults = new pv.Transient();

  var none = pv.Color.transparent;

  /** @private */
  function ids(marks) {
    var map = {};
    for (var i = 0; i < marks.length; i++) {
      var mark = marks[i];
      if (mark.id) map[mark.id] = mark;
    }
    return map;
  }

  /** @private */
  function interpolateProperty(list, name, before, after) {
    if (name in interpolated) {
      var i = pv.Scale.interpolator(before[name], after[name]);
      var f = function(t) { before[name] = i(t); }
    } else {
      var f = function(t) { if (t > .5) before[name] = after[name]; }
    }
    f.next = list.head;
    list.head = f;
  }

  /** @private */
  function interpolateInstance(list, before, after) {
    for (var name in before) {
      if (name == "children") continue; // not a property
      if (before[name] == after[name]) continue; // unchanged
      interpolateProperty(list, name, before, after);
    }
    if (before.children) {
      for (var j = 0; j < before.children.length; j++) {
        interpolate(list, before.children[j], after.children[j]);
      }
    }
  }

  /** @private */
  function interpolate(list, before, after) {
    var mark = before.mark, bi = ids(before), ai = ids(after);
    for (var i = 0; i < before.length; i++) {
      var b = before[i], a = b.id ? ai[b.id] : after[i];
      b.index = i;
      if (!b.visible) continue;
      if (!(a && a.visible)) {
        var o = override(before, i, mark.$exit, after);

        /*
         * After the transition finishes, we need to do a little cleanup to
         * insure that the final state of the scenegraph is consistent with the
         * "after" render. For instances that were removed, we need to remove
         * them from the scenegraph; for instances that became invisible, we
         * need to mark them invisible. See the cleanup method for details.
         */
        b.transition = a ? 2 : (after.push(o), 1);
        a = o;
      }
      interpolateInstance(list, b, a);
    }
    for (var i = 0; i < after.length; i++) {
      var a = after[i], b = a.id ? bi[a.id] : before[i];
      if (!(b && b.visible) && a.visible) {
        var o = override(after, i, mark.$enter, before);
        if (!b) before.push(o);
        else before[b.index] = o;
        interpolateInstance(list, o, a);
      }
    }
  }

  /** @private */
  function override(scene, index, proto, other) {
    var s = pv.extend(scene[index]),
        m = scene.mark,
        r = m.root.scene,
        p = (proto || defaults).$properties,
        t;

    /* Correct the target reference, if this is an anchor. */
    if (other.target && (t = other.target[other.length])) {
      scene = pv.extend(scene);
      scene.target = pv.extend(other.target);
      scene.target[index] = t;
    }

    /* Determine the set of properties to evaluate. */
    var seen = {};
    for (var i = 0; i < p.length; i++) seen[p[i].name] = 1;
    p = m.binds.optional
        .filter(function(p) { return !(p.name in seen); })
        .concat(p);

    /* Evaluate the properties and update any implied ones. */
    m.context(scene, index, function() {
      this.buildProperties(s, p);
      this.buildImplied(s);
    });

    /* Restore the root scene. This should probably be done by context(). */
    m.root.scene = r;
    return s;
  }

  /** @private */
  function cleanup(scene) {
    for (var i = 0, j = 0; i < scene.length; i++) {
      var s = scene[i];
      if (s.transition != 1) {
        scene[j++] = s;
        if (s.transition == 2) s.visible = false;
        if (s.children) s.children.forEach(cleanup);
      }
    }
    scene.length = j;
  }

  that.ease = function(x) {
    return arguments.length
        ? (ease = typeof x == "function" ? x : pv.ease(x), that)
        : ease;
  };

  that.duration = function(x) {
    return arguments.length
        ? (duration = Number(x), that)
        : duration;
  };

  that.start = function() {
    // TODO allow partial rendering
    if (mark.parent) fail();

    // TODO allow parallel and sequenced transitions
    if (mark.$transition) mark.$transition.stop();
    mark.$transition = that;

    // TODO clearing the scene like this forces total re-build
    var i = pv.Mark.prototype.index, before = mark.scene, after;
    mark.scene = null;
    mark.bind();
    mark.build();
    after = mark.scene;
    mark.scene = before;
    pv.Mark.prototype.index = i;

    var start = Date.now(), list = {};
    interpolate(list, before, after);
    timer = setInterval(function() {
      var t = Math.max(0, Math.min(1, (Date.now() - start) / duration)),
          e = ease(t);
      for (var i = list.head; i; i = i.next) i(e);
      if (t == 1) {
        cleanup(mark.scene);
        that.stop();
      }
      pv.Scene.updateAll(before);
    }, 24);
  };

  that.stop = function() {
    clearInterval(timer);
  };
};
