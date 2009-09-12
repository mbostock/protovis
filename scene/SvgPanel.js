pv.SvgScene.panel = function(scenes) {
  var parent = scenes.parent && this.group(scenes), marker = {};
  var previous;

  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* svg */
    if (!scenes.parent) {
      s.canvas.style.display = "inline-block";
      if (s.canvas.firstChild) {
        var svg = s.canvas.firstChild;
        if (svg.marker != marker) {
          while (svg.lastChild) svg.removeChild(svg.lastChild);
          previous = null;
        }
      } else {
        var svg = s.canvas.appendChild(this.cache(s, "svg", "svg"));
        svg.setAttribute("width", s.width + s.left + s.right);
        svg.setAttribute("height", s.height + s.top + s.bottom);
        svg.onclick
            = svg.onmousedown
            = svg.onmouseup
            = svg.onmousemove
            = svg.onmouseout
            = svg.onmouseover
            = pv.SvgScene.dispatch;
        previous = null;
      }
      svg.marker = marker;
      parent = svg;
    }

    /* g */
    var g = parent;
    if (s.left || s.top) {
      if (previous
          && (previous.left == s.left)
          && (previous.top == s.top)) {
        g = previous.scene.g;
      } else {
        g = this.cache(s, "g", "panel");
        g.setAttribute("transform", "translate(" + s.left + "," + s.top + ")");
        previous = s;
      }
    }
    (s.scene || (s.scene = {})).g = g;

    /* fill */
    var fill = pv.color(s.fillStyle);
    if (fill.opacity || s.cursor || s.title) {
      var rect = this.cache(s, "rect", "fill");
      rect.setAttribute("width", s.width);
      rect.setAttribute("height", s.height);
      rect.setAttribute("cursor", s.cursor);
      rect.setAttribute("pointer-events", "all");
      rect.setAttribute("fill", fill.color);
      rect.setAttribute("fill-opacity", fill.opacity);
      this.listen(rect, scenes, i);
      g.appendChild(this.title(rect, s));
    }

    /* children */
    for (var j = 0; j < s.children.length; j++) {
      this.updateAll(s.children[j]);
    }

    /* stroke */
    var stroke = pv.color(s.strokeStyle);
    if (stroke.opacity) {
      var rect = this.cache(s, "rect", "stroke");
      rect.setAttribute("width", Math.max(1E-10, s.width));
      rect.setAttribute("height", Math.max(1E-10, s.height));
      rect.setAttribute("cursor", s.cursor);
      rect.setAttribute("fill", "none");
      rect.setAttribute("stroke", stroke.color);
      rect.setAttribute("stroke-opacity", stroke.opacity);
      rect.setAttribute("stroke-width", s.lineWidth);
      this.listen(rect, scenes, i);
      g.appendChild(this.title(rect, s));
    }

    /*
     * WebKit appears has a bug where images are not rendered if the g element
     * is appended before it contained any elements. Creating the child elements
     * first and then appending them solves the problem and is more efficient.
     */
    if (s.scene.panel) parent.appendChild(g);
  }
};
