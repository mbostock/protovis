// TODO strokeStyle for areaSegment?

pv.SvgScene.area = function(scenes) {
  var e = scenes.$g.firstChild;
  if (!scenes.length) return e;
  var s = scenes[0];

  /* segmented */
  if (s.segmented) return this.areaSegment(scenes);

  /* visible */
  if (!s.visible) return e;
  var fill = s.fillStyle, stroke = s.strokeStyle;
  if (!fill.opacity && !stroke.opacity) return e;

  /* points */
  var p1 = "", p2 = "";
  for (var i = 0, j = scenes.length - 1; j >= 0; i++, j--) {
    var si = scenes[i], sj = scenes[j];
    p1 += si.left + "," + si.top + " ";
    p2 += (sj.left + sj.width) + "," + (sj.top + sj.height) + " ";

    /* interpolate (assume linear by default) */
    if (i < scenes.length - 1) {
      var sk = scenes[i + 1], sl = scenes[j - 1];
      switch (s.interpolate) {
        case "step-before": {
          p1 += si.left + "," + sk.top + " ";
          p2 += (sl.left + sl.width) + "," + (sj.top + sj.height) + " ";
          break;
        }
        case "step-after": {
          p1 += sk.left + "," + si.top + " ";
          p2 += (sj.left + sj.width) + "," + (sl.top + sl.height) + " ";
          break;
        }
      }
    }
  }

  e = this.expect(e, "polygon", {
      "shape-rendering": s.antialias ? null : "crispEdges",
      "cursor": s.cursor,
      "points": p1 + p2,
      "fill": fill.color,
      "fill-opacity": fill.opacity || null,
      "stroke": stroke.color,
      "stroke-opacity": stroke.opacity || null,
      "stroke-width": stroke.opacity ? s.lineWidth / this.scale : null
    });
  return this.append(e, scenes, 0);
};

pv.SvgScene.areaSegment = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0, n = scenes.length - 1; i < n; i++) {
    var s1 = scenes[i], s2 = scenes[i + 1];

    /* visible */
    if (!s1.visible || !s2.visible) continue;
    var fill = s1.fillStyle, stroke = s1.strokeStyle;
    if (!fill.opacity && !stroke.opacity) continue;

    /* interpolate */
    var si = s1, sj = s2;
    switch (s1.interpolate) {
      case "step-before": si = s2; break;
      case "step-after": sj = s1; break;
    }

    /* points */
    var p = s1.left + "," + si.top + " "
        + s2.left + "," + sj.top + " "
        + (s2.left + s2.width) + "," + (sj.top + sj.height) + " "
        + (s1.left + s1.width) + "," + (si.top + si.height);

    e = this.expect(e, "polygon", {
        "shape-rendering": s1.antialias ? null : "crispEdges",
        "cursor": s1.cursor,
        "points": p,
        "fill": fill.color,
        "fill-opacity": fill.opacity || null,
        "stroke": stroke.color,
        "stroke-opacity": stroke.opacity || null,
        "stroke-width": stroke.opacity ? s1.lineWidth / this.scale : null
      });
    e = this.append(e, scenes, i);
  }
  return e;
};
