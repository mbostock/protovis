pv.SvgScene.dot = function(scenes) {
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* fill, stroke */
    var fill = pv.color(s.fillStyle), stroke = pv.color(s.strokeStyle);
    if (!fill.opacity && !stroke.opacity) continue;

    /* points */
    var radius = Math.sqrt(s.size);
    var p;
    switch (s.shape) {
      case "cross": {
        p = "M" + -radius + "," + -radius
            + "L" + radius + "," + radius
            + "M" + radius + "," + -radius
            + "L" + -radius + "," + radius;
        break;
      }
      case "triangle": {
        var h = radius, w = radius * 2 / Math.sqrt(3);
        p = "M0," + h
            + "L" + w +"," + -h
            + " " + -w + "," + -h
            + "Z";
        break;
      }
      case "diamond": {
        radius *= Math.sqrt(2);
        p = "M0," + -radius
            + "L" + radius + ",0"
            + " 0," + radius
            + " " + -radius + ",0"
            + "Z";
        break;
      }
      case "square": {
        p = "M" + -radius + "," + -radius
            + "L" + radius + "," + -radius
            + " " + radius + "," + radius
            + " " + -radius + "," + radius
            + "Z";
        break;
      }
      case "tick": {
        p = "M0,0L0," + -s.size;
        break;
      }
      default: { // circle
        p = "M0," + radius
            + "A" + radius + "," + radius + " 0 1,1 0," + (-radius)
            + "A" + radius + "," + radius + " 0 1,1 0," + radius
            + "Z";
        break;
      }
    }

    var path = this.create("path");
    path.setAttribute("cursor", s.cursor);
    path.setAttribute("d", p);
    path.setAttribute("transform",
        "translate(" + s.left + "," + s.top + ")"
        + (s.angle ? " rotate(" + 180 * s.angle / Math.PI + ")" : ""));
    path.setAttribute("fill", fill.color);
    path.setAttribute("fill-opacity", fill.opacity);
    path.setAttribute("stroke", stroke.color);
    path.setAttribute("stroke-opacity", stroke.opacity);
    path.setAttribute("stroke-width", s.lineWidth);
    scenes.parent.scene.g.appendChild(this.title(path, s));
  }
};
