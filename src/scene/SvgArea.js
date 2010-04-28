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

  /** @private Computes the straight path for the range [i, j]. */
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

  /** @private Computes the curved path for the range [i, j]. */
  function pathCurve(i, j) {
    var pointsT = [], pointsB = [], pathT, pathB;

    for (var k = j; i <= k; i++, j--) {
      var sj = scenes[j];
      pointsT.push(scenes[i]);
      pointsB.push({left: sj.left + sj.width, top: sj.top + sj.height});
    }

    if (s.interpolate == "basis") {
      pathT = pv.SvgScene.curveBasis(pointsT);
      pathB = pv.SvgScene.curveBasis(pointsB);
    } else if (s.interpolate == "cardinal") {
      pathT = pv.SvgScene.curveCardinal(pointsT, s.tension);
      pathB = pv.SvgScene.curveCardinal(pointsB, s.tension);
    } else { // monotone
      pathT = pv.SvgScene.curveMonotone(pointsT);
      pathB = pv.SvgScene.curveMonotone(pointsB);
    }

    return pointsT[0].left + "," + pointsT[0].top + pathT
         + "L" + pointsB[0].left + "," + pointsB[0].top + pathB;
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
    d.push(((j - i > 2
        && (s.interpolate == "basis"
        || s.interpolate == "cardinal"
        || s.interpolate == "monotone"))
        ? pathCurve : path)(i, j - 1));
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
  var e = scenes.$g.firstChild, s = scenes[0], pathsT, pathsB;
  if (s.interpolate == "basis"
      || s.interpolate == "cardinal"
      || s.interpolate == "monotone") {
    var pointsT = [], pointsB = [];

    for (var i = 0, n = scenes.length; i < n; i++) {
      var sj = scenes[n - i - 1];
      pointsT.push(scenes[i]);
      pointsB.push({left: sj.left + sj.width, top: sj.top + sj.height});
    }

    if (s.interpolate == "basis") {
      pathsT = this.curveBasisSegments(pointsT);
      pathsB = this.curveBasisSegments(pointsB);
    } else if (s.interpolate == "cardinal") {
      pathsT = this.curveCardinalSegments(pointsT, s.tension);
      pathsB = this.curveCardinalSegments(pointsB, s.tension);
    } else { // monotone
      pathsT = this.curveMonotoneSegments(pointsT);
      pathsB = this.curveMonotoneSegments(pointsB);
    }
  }

  for (var i = 0, n = scenes.length - 1; i < n; i++) {
    var s1 = scenes[i], s2 = scenes[i + 1];

    /* visible */
    if (!s1.visible || !s2.visible) continue;
    var fill = s1.fillStyle, stroke = s1.strokeStyle;
    if (!fill.opacity && !stroke.opacity) continue;

    var d;
    if (pathsT) {
      var pathT = pathsT[i],
          pathB = "L" + pathsB[n - i - 1].substr(1);

      d = pathT + pathB + "Z";
    } else {
      /* interpolate */
      var si = s1, sj = s2;
      switch (s1.interpolate) {
        case "step-before": si = s2; break;
        case "step-after": sj = s1; break;
      }

      /* path */
      d = "M" + s1.left + "," + si.top
        + "L" + s2.left + "," + sj.top
        + "L" + (s2.left + s2.width) + "," + (sj.top + sj.height)
        + "L" + (s1.left + s1.width) + "," + (si.top + si.height)
        + "Z";
    }

    e = this.expect(e, "path", {
        "shape-rendering": s1.antialias ? null : "crispEdges",
        "pointer-events": s1.events,
        "cursor": s1.cursor,
        "d": d,
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
