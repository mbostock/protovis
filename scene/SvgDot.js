pv.SvgScene.dot = function(scenes) {
  var g = this.group(scenes);
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;
    var fill = pv.color(s.fillStyle), stroke = pv.color(s.strokeStyle);
    if (!fill.opacity && !stroke.opacity) continue;

    /* points */
    var radius = Math.sqrt(s.size), fillPath = "", strokePath = "";
    switch (s.shape) {
      case "cross": {
        fillPath = "M" + -radius + "," + -radius
            + "L" + radius + "," + radius
            + "M" + radius + "," + -radius
            + "L" + -radius + "," + radius;
        break;
      }
      case "triangle": {
        var h = radius, w = radius * 2 / Math.sqrt(3);
        fillPath = "M0," + h
            + "L" + w +"," + -h
            + " " + -w + "," + -h
            + "Z";
        break;
      }
      case "diamond": {
        radius *= Math.sqrt(2);
        fillPath = "M0," + -radius
            + "L" + radius + ",0"
            + " 0," + radius
            + " " + -radius + ",0"
            + "Z";
        break;
      }
      case "square": {
        fillPath = "M" + -radius + "," + -radius
            + "L" + radius + "," + -radius
            + " " + radius + "," + radius
            + " " + -radius + "," + radius
            + "Z";
        break;
      }
      case "tick": {
        fillPath = "M0,0L0," + -s.size;
        break;
      }
      default: {
        function circle(r) {
          return "M0," + r
              + "A" + r + "," + r + " 0 1,1 0," + (-r)
              + "A" + r + "," + r + " 0 1,1 0," + r
              + "Z";
        }
        if (s.lineWidth / 2 > radius) strokePath = circle(s.lineWidth);
        fillPath = circle(radius);
        break;
      }
    }

    /* transform */
    var transform = "translate(" + s.left + "," + s.top + ")"
        + (s.angle ? " rotate(" + 180 * s.angle / Math.PI + ")" : "");

    /* The normal fill path. */
    var path = this.cache(s, "path", "fill");
    path.setAttribute("d", fillPath);
    path.setAttribute("transform", transform);
    path.setAttribute("fill", fill.color);
    path.setAttribute("fill-opacity", fill.opacity);
    path.setAttribute("cursor", s.cursor);
    if (strokePath) {
      path.setAttribute("stroke", "none");
    } else {
      path.setAttribute("stroke", stroke.color);
      path.setAttribute("stroke-opacity", stroke.opacity);
      path.setAttribute("stroke-width", s.lineWidth);
    }
    this.listen(path, scenes, i);
    g.appendChild(this.title(path, s));

    /* The special-case stroke path. */
    if (strokePath) {
      path = this.cache(s, "path", "stroke");
      path.setAttribute("d", strokePath);
      path.setAttribute("transform", transform);
      path.setAttribute("fill", stroke.color);
      path.setAttribute("fill-opacity", stroke.opacity);
      path.setAttribute("cursor", s.cursor);
      this.listen(path, scenes, i);
      g.appendChild(this.title(path, s));
    }
  }
};
