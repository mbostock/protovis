// TODO stroke goes over children?

pv.SvgScene.panel = function(scenes) {
  var parent = this.parentNode(scenes);
  var previous = null;

  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* svg */
    if (!parent) {
      if (i && s.canvas.firstChild) {
        var svg = s.canvas.firstChild;
      } else {
        while (s.canvas.firstChild) s.canvas.removeChild(s.canvas.firstChild);
        var svg = s.canvas.appendChild(this.cache(s, "svg", "svg"));
        svg.setAttribute("width", s.width + s.left + s.right);
        svg.setAttribute("height", s.height + s.top + s.bottom);
      }
    }

    /* g */
    var g, append;
    if (s.left || s.top) {
      if (previous
          && (previous.left == s.left)
          && (previous.top == s.top)) {
        g = previous.scene.g;
      } else {
        g = this.cache(s, "g", "panel");
        g.setAttribute("transform", "translate(" + s.left + "," + s.top + ")");
        previous = s;
        append = parent || svg;
      }
    } else if (parent) {
      g = parent;
    } else {
      g = svg;
    }
    (s.scene || (s.scene = {})).g = g;

    /* children */
    for (var j = 0; j < s.children.length; j++) {
      this.updateAll(s.children[j]);
    }

    /* fill, stroke */
    var fill = pv.color(s.fillStyle), stroke = pv.color(s.strokeStyle);
    if (fill.opacity || stroke.opacity) {
      var rect = this.cache(s, "rect", "fill");
      rect.setAttribute("cursor", s.cursor);
      rect.setAttribute("width", Math.max(1E-10, s.width));
      rect.setAttribute("height", Math.max(1E-10, s.height));
      rect.setAttribute("fill", fill.color);
      rect.setAttribute("fill-opacity", fill.opacity);
      rect.setAttribute("stroke", stroke.color);
      rect.setAttribute("stroke-opacity", stroke.opacity);
      rect.setAttribute("stroke-width", s.lineWidth);
      g.appendChild(this.title(rect, s));
    }

    /*
     * WebKit appears has a bug where images are not rendered if the g element
     * is appended before it contained any elements. Creating the child elements
     * first and then appending them solves the problem and is more efficient.
     */
    if (append) append.appendChild(g);
  }
};
