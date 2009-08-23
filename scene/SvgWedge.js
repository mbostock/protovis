pv.SvgScene.wedge = function(scenes) {
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i], d = s.scene;
    switch (s.state) {
      case pv.Scene.State.CREATE: {
        // TODO only create path when necessary
        d = s.scene = {};
        d.path = this.create("path");
        d.path.setAttribute("fill-rule", "evenodd");
        s.state = pv.Scene.State.UPDATE;
        // fall-through
      }
      case pv.Scene.State.UPDATE: {
        // TODO only re-append when created or resorted
        // TODO title property
        // TODO don't populate default attributes?

        if (s.visible) {
          /* points */
          var r1 = s.innerRadius, r2 = s.outerRadius, a = Math.abs(s.angle), p;
          if (a >= 2 * Math.PI) {
            if (r1) {
              p = "M0," + r2
                  + "A" + r2 + "," + r2 + " 0 1,1 0," + (-r2)
                  + "A" + r2 + "," + r2 + " 0 1,1 0," + r2
                  + "M0," + r1
                  + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
                  + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
                  + "Z";
            } else {
              p = "M0," + r2
                  + "A" + r2 + "," + r2 + " 0 1,1 0," + (-r2)
                  + "A" + r2 + "," + r2 + " 0 1,1 0," + r2
                  + "Z";
            }
          } else {
            var sa = Math.min(s.startAngle, s.endAngle),
                ea = Math.max(s.startAngle, s.endAngle),
                c1 = Math.cos(sa), c2 = Math.cos(ea),
                s1 = Math.sin(sa), s2 = Math.sin(ea);
            if (r1) {
              p = "M" + r2 * c1 + "," + r2 * s1
                  + "A" + r2 + "," + r2 + " 0 "
                  + ((a < Math.PI) ? "0" : "1") + ",1 "
                  + r2 * c2 + "," + r2 * s2
                  + "L" + r1 * c2 + "," + r1 * s2
                  + "A" + r1 + "," + r1 + " 0 "
                  + ((a < Math.PI) ? "0" : "1") + ",0 "
                  + r1 * c1 + "," + r1 * s1 + "Z";
            } else {
              p = "M" + r2 * c1 + "," + r2 * s1
                  + "A" + r2 + "," + r2 + " 0 "
                  + ((a < Math.PI) ? "0" : "1") + ",1 "
                  + r2 * c2 + "," + r2 * s2 + "L0,0Z";
            }
          }

          d.path.setAttribute("cursor", s.cursor);
          d.path.setAttribute("transform", "translate(" + s.left + "," + s.top + ")");
          d.path.setAttribute("d", p);
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
