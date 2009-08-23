pv.SvgScene.line = function(scenes) {
  if (!scenes.length) return;
  var s = scenes[0], d = s.scene;

  // TODO more efficient removal?
  for (var i = 0; i < scenes.length; i++) {
    if (scenes[i].state == pv.Scene.State.DELETE) {
      scenes.splice(i--, 1);
    }
  }
  if (!scenes.length) {
    scenes.parent.scene.g.removeChild(d.polyline);
    return;
  }

  switch (s.state) {
    case pv.Scene.State.CREATE: {
      d = s.scene = {};
      d.polyline = this.create("polyline");
      s.state = pv.Scene.State.UPDATE;
      // fall-through
    }
    case pv.Scene.State.UPDATE: {
      // TODO only re-append when created or resorted
      // TODO title property
      // TODO don't populate default attributes?
      if (s.visible) {
        var p = "";
        for (var i = 0; i < scenes.length; i++) {
          var si = scenes[i];
          if (isNaN(si.left)) si.left = 0;
          if (isNaN(si.top)) si.top = 0;
          p += si.left + "," + si.top + " ";
        }
        d.polyline.setAttribute("cursor", s.cursor);
        d.polyline.setAttribute("points", p);
        var fill = pv.color(s.fillStyle);
        d.polyline.setAttribute("fill", fill.color);
        d.polyline.setAttribute("fill-opacity", fill.opacity);
        var stroke = pv.color(s.strokeStyle);
        d.polyline.setAttribute("stroke", stroke.color);
        d.polyline.setAttribute("stroke-opacity", stroke.opacity);
        d.polyline.setAttribute("stroke-width", s.lineWidth);
        d.polyline.style.display = "";
      } else {
        d.polyline.style.display = "none";
      }
      scenes.parent.scene.g.appendChild(d.polyline)
      break;
    }
  }
};
