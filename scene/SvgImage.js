pv.SvgScene.image = function(scenes) {
  var g = this.group(scenes);
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* left, top */
    var gi = g;
    if (s.left || s.top) {
      gi = this.cache(s, "g", "g");
      gi.setAttribute("transform", "translate(" + s.left + "," + s.top + ")");
      g.appendChild(gi);
    }

    /* fill */
    var fill = pv.color(s.fillStyle);
    if (fill.opacity) {
      var rect = this.cache(s, "rect", "fill");
      rect.setAttribute("width", s.width);
      rect.setAttribute("height", s.height);
      rect.setAttribute("fill", fill.color);
      rect.setAttribute("fill-opacity", fill.opacity);
      gi.appendChild(rect);
    }

    /* image */
    var image = this.cache(s, "image", "image");
    image.setAttribute("preserveAspectRatio", "none");
    image.setAttribute("width", s.width);
    image.setAttribute("height", s.height);
    image.setAttributeNS(pv.ns.xlink, "href", s.url);
    this.listen(image, scenes, i);
    gi.appendChild(image);

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
      this.listen(rect, scenes, i);
      gi.appendChild(this.title(rect, s));
    }
  }
};
