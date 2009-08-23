// TODO title property
// TODO don't populate default attributes?

pv.SvgScene.panel = function(scenes) {
  var parent = scenes.parent;
  var previous = null;

  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];
    if (!s.visible) continue;

    /* svg */
    if (!parent) {
      if (i && s.canvas.firstChild) {
        var svg = s.canvas.firstChild;
      } else {
        while (s.canvas.firstChild) s.canvas.removeChild(s.canvas.firstChild);
        var svg = s.canvas.appendChild(this.create("svg"));
        svg.setAttribute("width", s.width + s.left + s.right);
        svg.setAttribute("height", s.height + s.top + s.bottom);
      }
    }

    /* g */
    var g;
    if (s.left || s.top) {
      if (previous
          && (previous.left == s.left)
          && (previous.top == s.top)) {
        g = previous.scene.g;
      } else {
        g = (parent ? parent.scene.g : svg).appendChild(this.create("g"));
        g.setAttribute("transform", "translate(" + s.left + "," + s.top + ")");
        previous = s;
      }
    } else if (parent) {
      g = parent.scene.g;
    } else {
      g = svg;
    }

    /* scene */
    s.scene = {g: g};

    /* children */
    for (var j = 0; j < s.children.length; j++) {
      this.updateAll(s.children[j]);
    }

    /* fill, stroke */
    var fill = pv.color(s.fillStyle), stroke = pv.color(s.strokeStyle);
    if (fill.opacity || stroke.opacity) {
      var rect = g.appendChild(this.create("rect"));
      rect.setAttribute("cursor", s.cursor);
      rect.setAttribute("width", Math.max(1E-10, s.width));
      rect.setAttribute("height", Math.max(1E-10, s.height));
      rect.setAttribute("fill", fill.color);
      rect.setAttribute("fill-opacity", fill.opacity);
      rect.setAttribute("stroke", stroke.color);
      rect.setAttribute("stroke-opacity", stroke.opacity);
      rect.setAttribute("stroke-width", s.lineWidth);
    }
  }
};
