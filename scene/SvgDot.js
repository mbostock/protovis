pv.SvgScene.dot = function(scenes) {
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i], d = s.scene;
    switch (s.state) {
      case pv.Scene.State.CREATE: {
        // TODO only create path when necessary
        d = s.scene = {};
        d.path = this.create("path");
        s.state = pv.Scene.State.UPDATE;
        // fall-through
      }
      case pv.Scene.State.UPDATE: {
        // TODO only re-append when created or resorted
        // TODO title property
        // TODO don't populate default attributes?

        if (s.visible) {
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

          d.path.setAttribute("cursor", s.cursor);
          d.path.setAttribute("d", p);
          d.path.setAttribute("transform",
              "translate(" + s.left + "," + s.top + ")"
              + (s.angle ? " rotate(" + 180 * s.angle / Math.PI + ")" : ""));
          var fill = pv.color(s.fillStyle);
          d.path.setAttribute("fill", fill.color);
          d.path.setAttribute("fill-opacity", fill.opacity);
          var stroke = pv.color(s.strokeStyle);
          d.path.setAttribute("stroke", stroke.color);
          d.path.setAttribute("stroke-opacity", stroke.opacity);
          d.path.setAttribute("stroke-width", s.lineWidth);
          d.path.style.display = "";
        } else {
          d.path.style.display = "none";
        }
        scenes.parent.scene.g.appendChild(d.path)
        break;
      }
      case pv.Scene.State.DELETE: {
        // TODO more efficient removal?
        scenes.splice(i--, 1);
        scenes.parent.scene.g.removeChild(d.path);
        break;
      }
    }
  }
};
