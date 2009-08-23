pv.SvgScene.panel = function(scenes) {
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i], d = s.scene;
    switch (s.state) {
      case pv.Scene.State.CREATE: {
        // TODO only create g and rect when necessary
        d = s.scene = {};
        d.g = this.create("g");
        d.g.appendChild(d.rect = this.create("rect"));
        if (!scenes.parent) {
          d.svg = s.canvas.firstChild || this.create("svg"); // XXX is this okay?
          d.svg.appendChild(d.g);
        }
        s.state = pv.Scene.State.UPDATE;
        // fall-through
      }
      case pv.Scene.State.UPDATE: {
        // TODO only re-append when created or resorted
        // TODO only create transform property when needed
        // TODO title property
        // TODO don't populate default attributes?
        // TODO more efficient children removal?
        // TODO remove children when invisible?

        if (s.visible) {
          for (var j = 0; j < s.children.length; j++) {
            var c = s.children[j];
            if (c.state == pv.Scene.State.DELETE) {
              for (var k = 0; k < c.length; k++) {
                c[k].state = pv.Scene.State.DELETE;
              }
              s.children.splice(j--, 1);
            }
            this.updateAll(c);
          }

          d.rect.setAttribute("cursor", s.cursor);
          d.rect.setAttribute("width", Math.max(1E-10, s.width));
          d.rect.setAttribute("height", Math.max(1E-10, s.height));
          var fill = pv.color(s.fillStyle);
          d.rect.setAttribute("fill", fill.color);
          d.rect.setAttribute("fill-opacity", fill.opacity);
          var stroke = pv.color(s.strokeStyle);
          d.rect.setAttribute("stroke", stroke.color);
          d.rect.setAttribute("stroke-opacity", stroke.opacity);
          d.rect.setAttribute("stroke-width", s.lineWidth);
          d.g.setAttribute("transform", "translate(" + s.left + "," + s.top + ")");
          if (scenes.parent) {
            d.g.style.display = "";
          } else {
            d.svg.style.display = "";
            d.svg.setAttribute("width", s.width + s.left + s.right);
            d.svg.setAttribute("height", s.height + s.top + s.bottom);
          }
        } else {
          if (scenes.parent) {
            d.g.style.display = "none";
          } else {
            d.svg.style.display = "none";
          }
        }
        if (scenes.parent) {
          scenes.parent.scene.g.appendChild(d.g)
        } else {
          s.canvas.appendChild(d.svg);
        }
        break;
      }
      case pv.Scene.State.DELETE: {
        // TODO more efficient removal?
        scenes.splice(i--, 1);
        if (scenes.parent) {
          scenes.parent.scene.g.removeChild(d.g);
        } else {
          s.canvas.removeChild(d.svg);
        }
        break;
      }
    }
  }
};
