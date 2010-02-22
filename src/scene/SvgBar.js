pv.SvgScene.bar = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var fill = s.fillStyle || pv.Color.none,
        stroke = s.strokeStyle || pv.Color.none;
    if (!fill.opacity && !stroke.opacity) continue;

    e = this.expect("rect", e);
    e.setAttribute("shape-rendering", s.antialias ? "auto" : "crispEdges");
    e.setAttribute("cursor", s.cursor);
    e.setAttribute("x", s.left);
    e.setAttribute("y", s.top);
    e.setAttribute("width", Math.max(1E-10, s.width));
    e.setAttribute("height", Math.max(1E-10, s.height));
    e.setAttribute("fill", fill.color);
    e.setAttribute("fill-opacity", fill.opacity);
    e.setAttribute("stroke", stroke.color);
    e.setAttribute("stroke-opacity", stroke.opacity);
    e.setAttribute("stroke-width", s.lineWidth);
    e = this.append(e, scenes, i);
  }
  return e;
};
