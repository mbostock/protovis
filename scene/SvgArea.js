pv.SvgScene.area = function(scenes) {
  if (!scenes.length) return;
  var s = scenes[0], d = s.scene;

  // TODO more efficient removal?
  for (var i = 0; i < scenes.length; i++) {
    if (scenes[i].state == pv.Scene.State.DELETE) {
      scenes.splice(i--, 1);
    }
  }
  if (!scenes.length) {
    scenes.parent.scene.g.removeChild(d.polygon);
    return;
  }

  switch (s.state) {
    case pv.Scene.State.CREATE: {
      d = s.scene = {};
      d.polygon = this.create("polygon");
      s.state = pv.Scene.State.UPDATE;
      // fall-through
    }
    case pv.Scene.State.UPDATE: {
      // TODO only re-append when created or resorted
      // TODO title property
      // TODO don't populate default attributes?
      if (s.visible) {
        var p1 = "", p2 = "";
        for (var i = 0, j = scenes.length - 1; j >= 0; i++, j--) {
          var si = scenes[i], sj = scenes[j];
          p1 += si.left + "," + si.top + " ";
          p2 += (sj.left + sj.width) + "," + (sj.top + sj.height) + " ";
        }
        d.polygon.setAttribute("cursor", s.cursor);
        d.polygon.setAttribute("points", p1 + p2);
        var fill = pv.color(s.fillStyle);
        d.polygon.setAttribute("fill", fill.color);
        d.polygon.setAttribute("fill-opacity", fill.opacity);
        var stroke = pv.color(s.strokeStyle);
        d.polygon.setAttribute("stroke", stroke.color);
        d.polygon.setAttribute("stroke-opacity", stroke.opacity);
        d.polygon.setAttribute("stroke-width", s.lineWidth);
        d.polygon.style.display = "";
      } else {
        d.polygon.style.display = "none";
      }
      scenes.parent.scene.g.appendChild(d.polygon)
      break;
    }
  }
};
