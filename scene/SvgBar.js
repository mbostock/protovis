pv.SvgScene.bar = function(scenes) {
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i], d = s.scene;
    switch (s.state) {
      case pv.Scene.State.CREATE: {
        // TODO only create rect when necessary
        d = s.scene = {};
        d.rect = this.create("rect");
        s.state = pv.Scene.State.UPDATE;
        // fall-through
      }
      case pv.Scene.State.UPDATE: {
        // TODO only re-append when created or resorted
        // TODO title property
        // TODO don't populate default attributes?
        if (s.visible) {
          d.rect.setAttribute("cursor", s.cursor);
          d.rect.setAttribute("x", s.left);
          d.rect.setAttribute("y", s.top);
          d.rect.setAttribute("width", Math.max(1E-10, s.width));
          d.rect.setAttribute("height", Math.max(1E-10, s.height));
          var fill = pv.color(s.fillStyle);
          d.rect.setAttribute("fill", fill.color);
          d.rect.setAttribute("fill-opacity", fill.opacity);
          var stroke = pv.color(s.strokeStyle);
          d.rect.setAttribute("stroke", stroke.color);
          d.rect.setAttribute("stroke-opacity", stroke.opacity);
          d.rect.setAttribute("stroke-width", s.lineWidth);
          d.rect.style.display = "";
        } else {
          d.rect.style.display = "none";
        }
        scenes.parent.scene.g.appendChild(d.rect)
        break;
      }
      case pv.Scene.State.DELETE: {
        // TODO more efficient removal?
        scenes.splice(i--, 1);
        scenes.parent.scene.g.removeChild(d.rect);
        break;
      }
    }
  }
};
