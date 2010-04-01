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

  /** @private Computes the path for the range [i, j]. */
  function path(i, j) {
    var p1 = [], p2 = [];
    for (var k = j; i <= k; i++, j--) {
      var si = scenes[i],
          sj = scenes[j],
          pi = si.left + "," + si.top,
          pj = (sj.left + sj.width) + "," + (sj.top + sj.height);

      /* interpolate */
      if (i < k) {
        var sk = scenes[i + 1], sl = scenes[j - 1];
        switch (s.interpolate) {
          case "step-before": {
            pi += "V" + sk.top;
            pj += "H" + (sl.left + sl.width);
            break;
          }
          case "step-after": {
            pi += "H" + sk.left;
            pj += "V" + (sl.top + sl.height);
            break;
          }
        }
      }

      p1.push(pi);
      p2.push(pj);
    }
    return p1.concat(p2).join("L");
  }

  function pathCurve(i, j) {
    var pointsT = [], pointsB = [];
    for (var k = j; i <= k; i++, j--) {
      var si = scenes[i],
          sj = scenes[j];

      pointsT.push(pv.vector(si.left, si.top));
      pointsB.push(pv.vector(sj.left + sj.width, sj.top + sj.height));
    }
    return pointsT[0].x + "," + pointsT[0].y + pv.SvgScene.curvePathCardinal(pointsT, s.tension)
     +"L"+ pointsB[0].x + "," + pointsB[0].y + pv.SvgScene.curvePathCardinal(pointsB, s.tension);
  }

  /* points */
  var d = [], si, sj;
  for (var i = 0; i < scenes.length; i++) {
    si = scenes[i]; if (!si.width && !si.height) continue;
    for (var j = i + 1; j < scenes.length; j++) {
      sj = scenes[j]; if (!sj.width && !sj.height) break;
    }
    if (i && (s.interpolate != "step-after")) i--;
    if ((j < scenes.length) && (s.interpolate != "step-before")) j++;
    if (s.interpolate == "cardinal") {
      d.push(pathCurve(i, j - 1));
    } else {
      d.push(path(i, j - 1));
    }
    i = j - 1;
  }
  if (!d.length) return e;

  e = this.expect(e, "path", {
      "shape-rendering": s.antialias ? null : "crispEdges",
      "pointer-events": s.events,
      "cursor": s.cursor,
      "d": "M" + d.join("ZM") + "Z",
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
        "pointer-events": s1.events,
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
