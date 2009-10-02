pv.SvgScene.panel = function(scenes) {
  var g = scenes.$g, e = g && g.firstChild;
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* svg */
    if (!scenes.parent) {
      s.canvas.style.display = "inline-block";
      g = s.canvas.firstChild;
      if (!g) {
        g = s.canvas.appendChild(this.create("svg"));
        g.onclick
            = g.onmousedown
            = g.onmouseup
            = g.onmousemove
            = g.onmouseout
            = g.onmouseover
            = pv.SvgScene.dispatch;
      }
      scenes.$g = g;
      g.setAttribute("width", s.width + s.left + s.right);
      g.setAttribute("height", s.height + s.top + s.bottom);
      e = g.firstChild;
    }

    /* fill */
    e = this.fill(e, scenes, i);

    /* children */
    for (var j = 0; j < s.children.length; j++) {
      s.children[j].$g = e = this.expect("g", e);
      e.setAttribute("transform", "translate(" + s.left + "," + s.top + ")");
      this.updateAll(s.children[j]);

      if (!e.parentNode) g.appendChild(e);
      e = e.nextSibling;
    }

    /* stroke */
    e = this.stroke(e, scenes, i);
  }
  return e;
};

pv.SvgScene.fill = function(e, scenes, i) {
  var s = scenes[i], fill = pv.color(s.fillStyle);
  if (fill.opacity) {
    e = this.expect("rect", e);
    e.setAttribute("x", s.left);
    e.setAttribute("y", s.top);
    e.setAttribute("width", s.width);
    e.setAttribute("height", s.height);
    e.setAttribute("cursor", s.cursor);
    e.setAttribute("fill", fill.color);
    e.setAttribute("fill-opacity", fill.opacity);
    this.listen(e, scenes, i);
    // TODO title

    if (!e.parentNode) scenes.$g.appendChild(e);
    e = e.nextSibling;
  }
  return e;
};

pv.SvgScene.stroke = function(e, scenes, i) {
  var s = scenes[i], stroke = pv.color(s.strokeStyle);
  if (stroke.opacity) {
    e = this.expect("rect", e);
    e.setAttribute("x", s.left);
    e.setAttribute("y", s.top);
    e.setAttribute("width", Math.max(1E-10, s.width));
    e.setAttribute("height", Math.max(1E-10, s.height));
    e.setAttribute("cursor", s.cursor);
    e.setAttribute("fill", "none");
    e.setAttribute("stroke", stroke.color);
    e.setAttribute("stroke-opacity", stroke.opacity);
    e.setAttribute("stroke-width", s.lineWidth);
    this.listen(e, scenes, i);
    // TODO title

    if (!e.parentNode) scenes.$g.appendChild(e);
    e = e.nextSibling;
  }
  return e;
};
