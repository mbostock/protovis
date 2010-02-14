pv.SvgScene.dot = function(scenes) {
  var e = scenes.$g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var fill = s.fillStyle || none, stroke = s.strokeStyle || none;
    if (!fill.opacity && !stroke.opacity) continue;

    /* points */
    var radius = Math.sqrt(s.size), path;
    switch (s.shape) {
      case "cross": {
        path = "M" + -radius + "," + -radius
            + "L" + radius + "," + radius
            + "M" + radius + "," + -radius
            + "L" + -radius + "," + radius;
        break;
      }
      case "triangle": {
        var h = radius, w = radius * 2 / Math.sqrt(3);
        path = "M0," + h
            + "L" + w +"," + -h
            + " " + -w + "," + -h
            + "Z";
        break;
      }
      case "diamond": {
        radius *= Math.sqrt(2);
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

    /* transform */
    var transform = "translate(" + s.left + "," + s.top + ")";

    /* Use <circle> for circles, <path> for everything else. */
    if (path) {
      if (s.angle) transform += " rotate(" + 180 * s.angle / Math.PI + ")";
      e = this.expect("path", e);
      e.setAttribute("d", path);
    } else {
      e = this.expect("circle", e);
      e.setAttribute("r", radius);
    }

    e.setAttribute("shape-rendering", s.antialias ? "auto" : "crispEdges");
    e.setAttribute("transform", transform);
    e.setAttribute("fill", fill.color);
    e.setAttribute("fill-opacity", fill.opacity);
    e.setAttribute("cursor", s.cursor);
    e.setAttribute("stroke", stroke.color);
    e.setAttribute("stroke-opacity", stroke.opacity);
    e.setAttribute("stroke-width", s.lineWidth);
    e = this.append(e, scenes, i);
  }
  return e;
};
