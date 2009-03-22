pv.Rule = function() {
  pv.Mark.call(this);
};

pv.Rule.toString = function() {
  return "rule";
};

pv.Rule.prototype = pv.Mark.extend();
pv.Rule.prototype.type = pv.Rule;
pv.Rule.prototype.defineProperty("lineWidth");
pv.Rule.prototype.defineProperty("strokeStyle");

pv.Rule.defaults = new pv.Rule().extend(pv.Mark.defaults)
    .lineWidth(1)
    .strokeStyle("black");

pv.Rule.Anchor = function() {
  pv.Mark.Anchor.call(this);
};

pv.Rule.Anchor.prototype = pv.Mark.Anchor.extend();
pv.Rule.Anchor.prototype.type = pv.Rule;

pv.Rule.Anchor.prototype.$left = function(d) {
  var rule = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "left": return rule.left();
  }
 return null;
};

pv.Rule.Anchor.prototype.$right = function(d) {
  var rule = this.anchorTarget();
  switch (this.get("name")) {
    case "right": return rule.right();
  }
  return null;
};

pv.Rule.Anchor.prototype.$top = function(d) {
  var rule = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "top": return rule.top();
  }
  return null;
};

pv.Rule.Anchor.prototype.$bottom = function(d) {
  var rule = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom": return rule.bottom();
  }
  return null;
};

pv.Rule.Anchor.prototype.$textAlign = function(d) {
  switch (this.get("name")) {
    case "top":
    case "bottom": return "center";
    case "right": return "left";
    case "left": return "right";
  }
  return null;
};

pv.Rule.Anchor.prototype.$textBaseline = function(d) {
  switch (this.get("name")) {
    case "right":
    case "left": return "middle";
    case "top": return "bottom";
    case "bottom": return "top";
  }
  return null;
};

pv.Rule.prototype.renderInstance = function(g, d) {
  var l = this.get("left");
  var r = this.get("right");
  var t = this.get("top");
  var b = this.get("bottom");

  var x0, x1;
  if (l == null) {
    if (r == null) { // horizontal: top, bottom
      l = r = 0;
      x0 = this.offset("left");
      x1 = g.canvas.width - this.offset("right");
    } else { // vertical: right, right + top + bottom
      l = g.canvas.width - this.offset("right") - this.offset("left") - r;
      x0 = x1 = l + this.offset("left");
    }
  } else if (r == null) { // vertical: left, left + top + bottom
    r = g.canvas.width - this.offset("right") - this.offset("left") - l;
    x0 = x1 = l + this.offset("left");
  } else { // horizontal: top + left + right, bottom + left + right
    x0 = l + this.offset("left");
    x1 = g.canvas.width - this.offset("right") - r;
  }

  var y0, y1;
  if (t == null) {
    if (b == null) { // vertical: left, right
      b = t = 0;
      y0 = this.offset("top");
      y1 = g.canvas.height - this.offset("bottom");
    } else { // horizontal: bottom, bottom + left + right
      t = g.canvas.height - this.offset("bottom") - this.offset("top") - b;
      y0 = y1 = t + this.offset("top");
    }
  } else if (b == null) { // horizontal: top, top + left + right
    b = g.canvas.height - this.offset("bottom") - this.offset("top") - t;
    y0 = y1 = t + this.offset("top");
  } else { // vertical: left + top + bottom, right + top + bottom
    y0 = t + this.offset("top");
    y1 = g.canvas.height - this.offset("bottom") - b;
  }

  var strokeStyle = this.get("strokeStyle");
  var lineWidth = this.get("lineWidth");

  if (strokeStyle) {
    g.save();
    g.lineWidth = lineWidth;
    g.strokeStyle = strokeStyle;
    g.beginPath();
    g.moveTo(x0, y0);
    g.lineTo(x1, y1);
    g.stroke();
    g.restore();
  }

  this.renderState[this.index] = {
      data : d,
      visible : true,
      top : t,
      left : l,
      bottom : b,
      right : r,
      strokeStyle : strokeStyle,
      lineWidth : lineWidth,
    };
};
