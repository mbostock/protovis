// TODO title property
// TODO don't populate default attributes?

pv.SvgScene.image = function(scenes) {
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* left, top */
    var g;
    if (s.left || s.top) {
      g = scenes.parent.scene.g.appendChild(this.create("g"));
      g.setAttribute("transform", "translate(" + s.left + "," + s.top + ")");
    } else {
      g = scenes.parent.scene.g;
    }

    /* fill */
    var fill = pv.color(s.fillStyle);
    if (fill.opacity) {
      var rect = g.appendChild(this.create("rect"));
      rect.setAttribute("width", s.width);
      rect.setAttribute("height", s.height);
      rect.setAttribute("fill", fill.color);
      rect.setAttribute("fill-opacity", fill.opacity);
    }

    /* image */
    var image = g.appendChild(this.create("image"));
    image.setAttribute("preserveAspectRatio", "none");
    image.setAttribute("width", s.width);
    image.setAttribute("height", s.height);
    image.setAttributeNS(pv.ns.xlink, "href", s.url);

    /* stroke */
    var stroke = pv.color(s.strokeStyle);
    if (stroke.opacity || s.cursor) {
      var rect = g.appendChild(this.create("rect"));
      rect.setAttribute("width", s.width);
      rect.setAttribute("height", s.height);
      rect.setAttribute("stroke", stroke.color);
      rect.setAttribute("stroke-opacity", stroke.opacity);
      rect.setAttribute("stroke-width", s.lineWidth);
      rect.setAttribute("cursor", s.cursor);
    }
  }
};
