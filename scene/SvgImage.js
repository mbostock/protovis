pv.SvgScene.image = function(scenes) {
  var parent = this.parentNode(scenes);
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* left, top */
    var g = parent;
    if (s.left || s.top) {
      g = g.appendChild(this.create("g"));
      g.setAttribute("transform", "translate(" + s.left + "," + s.top + ")");
    }

    /* fill */
    var fill = pv.color(s.fillStyle);
    if (fill.opacity) {
      var rect = this.cache(s, "rect", "fill");
      rect.setAttribute("width", s.width);
      rect.setAttribute("height", s.height);
      rect.setAttribute("fill", fill.color);
      rect.setAttribute("fill-opacity", fill.opacity);
      g.appendChild(rect);
    }

    /* image */
    var image = this.cache(s, "image", "image");
    image.setAttribute("preserveAspectRatio", "none");
    image.setAttribute("width", s.width);
    image.setAttribute("height", s.height);
    image.setAttributeNS(pv.ns.xlink, "href", s.url);
    g.appendChild(image);

    /* stroke */
    var stroke = pv.color(s.strokeStyle);
    if (stroke.opacity || s.cursor || s.title) {
      var rect = this.cache(s, "rect", "stroke");
      rect.setAttribute("width", s.width);
      rect.setAttribute("height", s.height);
      rect.setAttribute("fill", "none");
      rect.setAttribute("pointer-events", "all");
      rect.setAttribute("stroke", stroke.color);
      rect.setAttribute("stroke-opacity", stroke.opacity);
      rect.setAttribute("stroke-width", s.lineWidth);
      rect.setAttribute("cursor", s.cursor);
      g.appendChild(this.title(rect, s));

      /* events */
      this.listen(rect, scenes, i);
    } else {
      this.listen(image, scenes, i);
    }
  }
};
