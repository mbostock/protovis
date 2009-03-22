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

pv.Bar.prototype.renderInstance = function(g, d) {
  var l = this.get("left");
  var r = this.get("right");
  var t = this.get("top");
  var b = this.get("bottom");
  var w = this.get("width");
  var h = this.get("height");

  var width = g.canvas.width - this.offset("right") - this.offset("left");
  if (l == null) {
    l = width - w - r;
  } else if (r == null) {
    r = width - w - l;
  } else {
    w = width - r - l;
  }

  var height = g.canvas.height - this.offset("bottom") - this.offset("top");
  if (t == null) {
    t = height - h - b;
  } else if (b == null) {
    b = height - h - t;
  } else {
    h = height - t - b;
  }

  var x = l + this.offset("left");
  var y = t + this.offset("top");

  var fillStyle = this.get("fillStyle");
  var strokeStyle = this.get("strokeStyle");
  var lineWidth = this.get("lineWidth");

  g.save();
  if (fillStyle) {
    g.fillStyle = fillStyle;
    g.fillRect(x, y, w, h);
  }
  if (strokeStyle) {
    g.lineWidth = lineWidth;
    g.strokeStyle = strokeStyle;
    g.strokeRect(x, y, w, h);
  }
  g.restore();

  this.renderState[this.index] = {
      data : d,
      visible : true,
      top : t,
      left : l,
      bottom : b,
      right : r,
      width : w,
      height : h,
      fillStyle : fillStyle,
      strokeStyle : strokeStyle,
      lineWidth : lineWidth,
    };
};
