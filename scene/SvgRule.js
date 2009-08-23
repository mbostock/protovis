pv.SvgScene.rule = function(scenes) {
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i], d = s.scene;
    switch (s.state) {
      case pv.Scene.State.CREATE: {
        // TODO only create line when necessary
        d = s.scene = {};
        d.line = this.create("line");
        s.state = pv.Scene.State.UPDATE;
        // fall-through
      }
      case pv.Scene.State.UPDATE: {
        // TODO only re-append when created or resorted
        // TODO title property
        // TODO don't populate default attributes?
        if (s.visible) {
          d.line.setAttribute("cursor", s.cursor);
          d.line.setAttribute("x1", s.left);
          d.line.setAttribute("y1", s.top);
          d.line.setAttribute("x2", s.left + s.width);
          d.line.setAttribute("y2", s.top + s.height);
          var stroke = pv.color(s.strokeStyle);
          d.line.setAttribute("stroke", stroke.color);
          d.line.setAttribute("stroke-opacity", stroke.opacity);
          d.line.setAttribute("stroke-width", s.lineWidth);
          d.line.style.display = "";
        } else {
          d.line.style.display = "none";
        }
        scenes.parent.scene.g.appendChild(d.line)
        break;
      }
      case pv.Scene.State.DELETE: {
        // TODO more efficient removal?
        scenes.splice(i--, 1);
        scenes.parent.scene.g.removeChild(d.line);
        break;
      }
    }
  }
};
