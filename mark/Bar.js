pv.Bar = function() {
  pv.Mark.call(this);
};

pv.Bar.toString = function() {
  return "bar";
};

pv.Bar.prototype = pv.Mark.extend();
pv.Bar.prototype.type = pv.Bar;
pv.Bar.prototype.defineProperty("width");
pv.Bar.prototype.defineProperty("height");
pv.Bar.prototype.defineProperty("lineWidth");
pv.Bar.prototype.defineProperty("strokeStyle");
pv.Bar.prototype.defineProperty("fillStyle");

pv.Bar.defaults = new pv.Bar().extend(pv.Mark.defaults)
    .lineWidth(1.5)
    .strokeStyle(null)
    .fillStyle(pv.Colors.category20);

pv.Bar.Anchor = function() {
  pv.Mark.Anchor.call(this);
};

pv.Bar.Anchor.prototype = pv.Mark.Anchor.extend();
pv.Bar.Anchor.prototype.type = pv.Bar;

pv.Bar.Anchor.prototype.$left = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return bar.left() + bar.width() / 2;
    case "left": return bar.left();
  }
  return null;
};

pv.Bar.Anchor.prototype.$right = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return bar.right() + bar.width() / 2;
    case "right": return bar.right();
  }
  return null;
};

pv.Bar.Anchor.prototype.$top = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return bar.top() + bar.height() / 2;
    case "top": return bar.top();
  }
  return null;
};

pv.Bar.Anchor.prototype.$bottom = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return bar.bottom() + bar.height() / 2;
    case "bottom": return bar.bottom();
  }
  return null;
};

pv.Bar.Anchor.prototype.$textAlign = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "left": return "left";
    case "bottom":
    case "top":
    case "center": return "center";
    case "right": return "right";
  }
  return null;
};

pv.Bar.Anchor.prototype.$textBaseline = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "right":
    case "left":
    case "center": return "middle";
    case "top": return "top";
    case "bottom": return "bottom";
  }
  return null;
};

pv.Bar.prototype.updateInstance = function(s) {
  var v = s.svg;
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "rect");
    s.parent.svg.appendChild(v);
  }

  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  v.setAttribute("x", s.left);
  v.setAttribute("y", s.top);

  /* If width and height are exactly zero, the rect is not stroked! */
  v.setAttribute("width", Math.max(1E-10, s.width));
  v.setAttribute("height", Math.max(1E-10, s.height));

  /* TODO gradient, patterns */
  var fill = new pv.Style(s.fillStyle);
  v.setAttribute("fill", fill.color);
  v.setAttribute("fill-opacity", fill.opacity);
  var stroke = new pv.Style(s.strokeStyle);
  v.setAttribute("stroke", stroke.color);
  v.setAttribute("stroke-opacity", stroke.opacity);
  v.setAttribute("stroke-width", s.lineWidth);
};
