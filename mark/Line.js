pv.Line = function() {
  pv.Mark.call(this);
};

pv.Line.toString = function() {
  return "line";
};

pv.Line.prototype = pv.Mark.extend();
pv.Line.prototype.type = pv.Line;
pv.Line.prototype.defineProperty("lineWidth");
pv.Line.prototype.defineProperty("strokeStyle");
pv.Line.prototype.defineProperty("fillStyle");

pv.Line.defaults = new pv.Line().extend(pv.Mark.defaults)
    .lineWidth(1.5)
    .strokeStyle(pv.Colors.category10);

pv.Line.prototype.update = function(g) {
  if (!this.scene.length) return;

  var s = this.scene[0], v = s.svg;
  if (s.visible) {
    if (!v) {
      v = s.svg = document.createElementNS(pv.ns.svg, "polyline");
      s.parent.svg.appendChild(v);
    }

    /* TODO allow points to be changed on events? */
    var p = "";
    for (var i = 0; i < this.scene.length; i++) {
      var si = this.scene[i];
      if (isNaN(si.left)) si.left = 0;
      if (isNaN(si.top)) si.top = 0;
      p += si.left + "," + si.top + " ";
    }
    v.setAttribute("points", p);

    this.updateInstance(s);
    v.removeAttribute("display");
  } else if (v) {
    v.setAttribute("display", "none");
  }
};

/**
 * For Lines, this method is only invoked after event handlers have updated the
 * scene graph; it is guaranteed to be called only from the first scene.
 */
pv.Line.prototype.updateInstance = function(s) {
  var v = s.svg;

  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  /* TODO gradient, patterns */
  var fill = new pv.Style(s.fillStyle);
  v.setAttribute("fill", fill.color);
  v.setAttribute("fill-opacity", fill.opacity);
  var stroke = new pv.Style(s.strokeStyle);
  v.setAttribute("stroke", stroke.color);
  v.setAttribute("stroke-opacity", stroke.opacity);
  v.setAttribute("stroke-width", s.lineWidth);
};
