pv.SvgScene.image = function(scenes) {
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i], d = s.scene;
    switch (s.state) {
      case pv.Scene.State.CREATE: {
        // TODO only create elements when necessary
        d = s.scene = {};
        d.g = this.create("g");
        d.g.appendChild(d.fill = this.create("rect"));
        d.g.appendChild(d.image = this.create("image"));
        d.g.appendChild(d.stroke = this.create("rect"));
        d.image.setAttribute("preserveAspectRatio", "none");
        d.stroke.setAttribute("fill", "none");
        d.stroke.setAttribute("pointer-events", "all");
        s.state = pv.Scene.State.UPDATE;
        // fall-through
      }
      case pv.Scene.State.UPDATE: {
        // TODO only re-append when created or resorted
        // TODO title property
        // TODO don't populate default attributes?
        if (s.visible) {
          d.g.setAttribute("transform", "translate(" + s.left + "," + s.top + ")");
          d.image.setAttribute("width", s.width);
          d.image.setAttribute("height", s.height);
          d.image.setAttributeNS(pv.ns.xlink, "href", s.url);
          d.fill.setAttribute("width", s.width);
          d.fill.setAttribute("height", s.height);
          d.stroke.setAttribute("width", s.width);
          d.stroke.setAttribute("height", s.height);
          var fill = pv.color(s.fillStyle);
          d.fill.setAttribute("fill", fill.color);
          d.fill.setAttribute("fill-opacity", fill.opacity);
          var stroke = pv.color(s.strokeStyle);
          d.stroke.setAttribute("stroke", stroke.color);
          d.stroke.setAttribute("stroke-opacity", stroke.opacity);
          d.stroke.setAttribute("stroke-width", s.lineWidth);
          d.stroke.setAttribute("cursor", s.cursor);
          d.g.style.display = "";
        } else {
          d.g.style.display = "none";
        }
        scenes.parent.scene.g.appendChild(d.g)
        break;
      }
      case pv.Scene.State.DELETE: {
        // TODO more efficient removal?
        scenes.splice(i--, 1);
        scenes.parent.scene.g.removeChild(d.g);
        break;
      }
    }
  }
};
