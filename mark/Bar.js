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

pv.Bar.renderStyle = function(style, g, w, h) {
  return (style instanceof pv.Gradient) ? style.create(g, w, h) : style;
};

pv.Bar.prototype.renderInstance = function(g, s) {
  var x = s.left, y = s.top, w = s.width, h = s.height;
  g.save();
  g.translate(x, y);
  if (s.fillStyle) {
    g.fillStyle = pv.Bar.renderStyle(s.fillStyle, g, w, h);
    g.fillRect(0, 0, w, h);
  }
  if (s.strokeStyle) {
    g.lineWidth = s.lineWidth;
    g.strokeStyle = pv.Bar.renderStyle(s.strokeStyle, g, w, h);
    g.strokeRect(0, 0, w, h);
  }
  g.restore();
};

pv.Bar.prototype.contains = function(x, y, s) {
  var p = s.strokeStyle ? s.lineWidth : 0;
  return ((s.left - p) <= x) && (x < (s.left + s.width + p))
      && ((s.top - p) <= y) && (y < (s.top + s.height + p));
};
