pv.SvgScene.dot = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var fill = s.fillStyle, stroke = s.strokeStyle;
    if (!fill.opacity && !stroke.opacity) continue;

    /* points */
    var radius = s.radius, path;
    switch (s.shape) {
      case "cross": {
        path = "M" + -radius + "," + -radius
            + "L" + radius + "," + radius
            + "M" + radius + "," + -radius
            + "L" + -radius + "," + radius;
        break;
      }
      case "triangle": {
        var h = radius, w = radius * 1.1547; // 2 / Math.sqrt(3)
        path = "M0," + h
            + "L" + w +"," + -h
            + " " + -w + "," + -h
            + "Z";
        break;
      }
      case "diamond": {
        radius *= 1.414214; // Math.sqrt(2)
        path = "M0," + -radius
            + "L" + radius + ",0"
            + " 0," + radius
            + " " + -radius + ",0"
            + "Z";
        break;
      }
      case "square": {
        path = "M" + -radius + "," + -radius
            + "L" + radius + "," + -radius
            + " " + radius + "," + radius
            + " " + -radius + "," + radius
            + "Z";
        break;
      }
      case "tick": {
        path = "M0,0L0," + -s.size;
        break;
      }
    }

    /* Use <circle> for circles, <path> for everything else. */
    var svg = {
      "shape-rendering": s.antialias ? null : "crispEdges",
      "fill": fill.color,
      "fill-opacity": fill.opacity || null,
      "stroke": stroke.color,
      "stroke-opacity": stroke.opacity || null,
      "stroke-width": stroke.opacity ? s.lineWidth / this.scale : null
    };
    if (path) {
      svg.transform = "translate(" + s.left + "," + s.top + ")";
      if (s.angle) svg.transform += " rotate(" + 180 * s.angle / Math.PI + ")";
      svg.d = path;
      e = this.expect(e, "path", svg);
    } else {
      svg.cx = s.left;
      svg.cy = s.top;
      svg.r = radius;
      e = this.expect(e, "circle", svg);
    }
    e = this.append(e, scenes, i);
  }
  return e;
};
