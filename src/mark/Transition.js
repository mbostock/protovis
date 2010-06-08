pv.Transition = function(mark) {
  var that = this,
      ease = pv.ease("cubic-in-out"),
      duration = 250,
      timer;

  var supported = {
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
    textStyle: 1,
    textMargin: 1
  };

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
    if (timer) return;
    if (mark.parent) fail(); // TODO allow partial rendering
    var before = mark.scene,
        after,
        start = Date.now(),
        tween;

    mark.scene = null;
    mark.bind();
    mark.build();
    after = mark.scene;
    mark.scene = before;

    /** @private */
    function interpolator(p, before, after) {
      // TODO handle enter and exit
      if (before[p] == after[p]) return;
      if (p in supported) {
        var i = pv.Scale.interpolator(before[p], after[p]);
        return function(t) { before[p] = i(t); };
      }
    }

    /** @private */
    function setup(before, after) {
      for (var i = 0; i < before.length; i++) {
        var b = before[i], a = after[i];
        for (var p in b) {
          var t = interpolator(p, b, a);
          if (t) {
            t.next = tween;
            tween = t;
          }
        }
        if (b.children) {
          for (var j = 0; j < b.children.length; j++) {
            setup(b.children[j], a.children[j]);
          }
        }
      }
    }

    setup(before, after);
    timer = setInterval(function() {
      var t = Math.max(0, Math.min(1, (Date.now() - start) / duration)),
          e = ease(t);
      for (var i = tween; i; i = i.next) i(e);
      pv.Scene.updateAll(before);
      if (t == 1) that.stop();
    }, 24);
  };

  that.stop = function() {
    clearInterval(timer);
  };
};
