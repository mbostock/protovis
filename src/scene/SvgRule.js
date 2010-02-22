pv.SvgScene.rule = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var stroke = s.strokeStyle || pv.Color.none;
    if (!stroke.opacity) continue;

    e = this.expect(e, "line", {
        "shape-rendering": s.antialias ? null : "crispEdges",
        "cursor": s.cursor,
        "x1": s.left,
        "y1": s.top,
        "x2": s.left + s.width,
        "y2": s.top + s.height,
        "stroke": stroke.color,
        "stroke-opacity": stroke.opacity || null,
        "stroke-width": stroke.opacity ? s.lineWidth : null
      });
    e = this.append(e, scenes, i);
  }
  return e;
};
