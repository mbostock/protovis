pv.SvgScene.bar = function(scenes) {
  var g = this.group(scenes);
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var fill = pv.color(s.fillStyle), stroke = pv.color(s.strokeStyle);
    if (!fill.opacity && !stroke.opacity) continue;

    var rect = this.cache(s, "rect", "bar");
    rect.setAttribute("cursor", s.cursor);
    rect.setAttribute("x", s.left);
    rect.setAttribute("y", s.top);
    rect.setAttribute("width", Math.max(1E-10, s.width));
    rect.setAttribute("height", Math.max(1E-10, s.height));
    rect.setAttribute("fill", fill.color);
    rect.setAttribute("fill-opacity", fill.opacity);
    rect.setAttribute("stroke", stroke.color);
    rect.setAttribute("stroke-opacity", stroke.opacity);
    rect.setAttribute("stroke-width", s.lineWidth);
    this.listen(rect, scenes, i);
    g.appendChild(this.title(rect, s));
  }
};
