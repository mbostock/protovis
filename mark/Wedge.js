pv.Wedge = function() {
  pv.Mark.call(this);
};

pv.Wedge.toString = function() {
  return "wedge";
};

pv.Wedge.prototype = pv.Mark.extend();
pv.Wedge.prototype.type = pv.Wedge;
pv.Wedge.prototype.defineProperty("startAngle");
pv.Wedge.prototype.defineProperty("endAngle");
pv.Wedge.prototype.defineProperty("angle");
pv.Wedge.prototype.defineProperty("innerRadius");
pv.Wedge.prototype.defineProperty("outerRadius");
pv.Wedge.prototype.defineProperty("lineWidth");
pv.Wedge.prototype.defineProperty("strokeStyle");
pv.Wedge.prototype.defineProperty("fillStyle");

pv.Wedge.defaults = new pv.Wedge().extend(pv.Mark.defaults)
    .startAngle(function() {
        var s = this.sibling();
        return s ? s.endAngle : -Math.PI / 2;
      })
    .innerRadius(0)
    .lineWidth(1.5)
    .strokeStyle(null)
    .fillStyle(pv.Colors.category20.unique);

pv.Wedge.prototype.midRadius = function() {
  return (this.innerRadius() + this.outerRadius()) / 2;
};

pv.Wedge.prototype.midAngle = function() {
  return (this.startAngle() + this.endAngle()) / 2;
};

pv.Wedge.Anchor = function() {
  pv.Mark.Anchor.call(this);
};

pv.Wedge.Anchor.prototype = pv.Mark.Anchor.extend();
pv.Wedge.Anchor.prototype.type = pv.Wedge;

pv.Wedge.Anchor.prototype.$left = function() {
  var w = this.anchorTarget();
  switch (this.get("name")) {
    case "outer": return w.left() + w.outerRadius() * Math.cos(w.midAngle());
    case "inner": return w.left() + w.innerRadius() * Math.cos(w.midAngle());
    case "start": return w.left() + w.midRadius() * Math.cos(w.startAngle());
    case "center": return w.left() + w.midRadius() * Math.cos(w.midAngle());
    case "end": return w.left() + w.midRadius() * Math.cos(w.endAngle());
  }
  return null;
};

pv.Wedge.Anchor.prototype.$right = function() {
  var w = this.anchorTarget();
  switch (this.get("name")) {
    case "outer": return w.right() + w.outerRadius() * Math.cos(w.midAngle());
    case "inner": return w.right() + w.innerRadius() * Math.cos(w.midAngle());
    case "start": return w.right() + w.midRadius() * Math.cos(w.startAngle());
    case "center": return w.right() + w.midRadius() * Math.cos(w.midAngle());
    case "end": return w.right() + w.midRadius() * Math.cos(w.endAngle());
  }
  return null;
};

pv.Wedge.Anchor.prototype.$top = function() {
  var w = this.anchorTarget();
  switch (this.get("name")) {
    case "outer": return w.top() + w.outerRadius() * Math.sin(w.midAngle());
    case "inner": return w.top() + w.innerRadius() * Math.sin(w.midAngle());
    case "start": return w.top() + w.midRadius() * Math.sin(w.startAngle());
    case "center": return w.top() + w.midRadius() * Math.sin(w.midAngle());
    case "end": return w.top() + w.midRadius() * Math.sin(w.endAngle());
  }
  return null;
};

pv.Wedge.Anchor.prototype.$bottom = function() {
  var w = this.anchorTarget();
  switch (this.get("name")) {
    case "outer": return w.bottom() + w.outerRadius() * Math.sin(w.midAngle());
    case "inner": return w.bottom() + w.innerRadius() * Math.sin(w.midAngle());
    case "start": return w.bottom() + w.midRadius() * Math.sin(w.startAngle());
    case "center": return w.bottom() + w.midRadius() * Math.sin(w.midAngle());
    case "end": return w.bottom() + w.midRadius() * Math.sin(w.endAngle());
  }
  return null;
};

pv.Wedge.Anchor.prototype.$textAlign = function() {
  var w = this.anchorTarget();
  switch (this.get("name")) {
    case "outer": return pv.Wedge.upright(w.midAngle()) ? "right" : "left";
    case "inner": return pv.Wedge.upright(w.midAngle()) ? "left" : "right";
    default: return "center";
  }
};

pv.Wedge.Anchor.prototype.$textBaseline = function() {
  var w = this.anchorTarget();
  switch (this.get("name")) {
    case "start": return pv.Wedge.upright(w.startAngle()) ? "top" : "bottom";
    case "end": return pv.Wedge.upright(w.endAngle()) ? "bottom" : "top";
    default: return "middle";
  }
};

pv.Wedge.Anchor.prototype.$textAngle = function() {
  var w = this.anchorTarget();
  var a = 0;
  switch (this.get("name")) {
    case "center":
    case "inner":
    case "outer": a = w.midAngle(); break;
    case "start": a = w.startAngle(); break;
    case "end": a = w.endAngle(); break;
  }
  return pv.Wedge.upright(a) ? a : (a + Math.PI);
};

pv.Wedge.upright = function(angle) {
  angle = angle % (2 * Math.PI);
  angle = (angle < 0) ? (2 * Math.PI + angle) : angle;
  return (angle < Math.PI / 2) || (angle > 3 * Math.PI / 2);
};

pv.Wedge.prototype.renderInstance = function(g, d) {
  var l = this.get("left");
  var r = this.get("right");
  var t = this.get("top");
  var b = this.get("bottom");

  function path(a0, a1, r0, r1) {
    g.beginPath();
    if (r0 == 0) {
      g.moveTo(0, 0);
      g.arc(0, 0, r1, a0, a1, false);
    } else if (r0 == r1) {
      g.arc(0, 0, r0, a0, a1, false);
    } else {
      g.arc(0, 0, r0, a0, a1, false);
      g.arc(0, 0, r1, a1, a0, true);
    }
    if (a0 != a1) {
      g.closePath();
    }
  }

  var width = g.canvas.width - this.offset("right") - this.offset("left");
  if (l == null) {
    l = width - r;
  } else {
    r = width - l;
  }

  var height = g.canvas.height - this.offset("bottom") - this.offset("top");
  if (t == null) {
    t = height - b;
  } else {
    b = height - t;
  }

  var x = l + this.offset("left");
  var y = t + this.offset("top");

  var a0 = this.get("startAngle");
  var a1 = this.get("endAngle");

  if (a1 == null) {
    a1 = a0 + this.get("angle");
  }

  var r0 = this.get("innerRadius");
  var r1 = this.get("outerRadius");

  var fillStyle = this.get("fillStyle");
  var strokeStyle = this.get("strokeStyle");
  var lineWidth = this.get("lineWidth");

  g.save();
  g.translate(x, y);
  path(a0, a1, r0, r1);
  if (fillStyle) {
    g.fillStyle = fillStyle;
    g.fill();
  }
  if (strokeStyle) {
    g.lineWidth = lineWidth;
    g.strokeStyle = strokeStyle;
    g.stroke();
  }
  g.restore();

  this.renderState[this.index] = {
      data : d,
      visible : true,
      top : t,
      left : l,
      bottom : b,
      right : r,
      startAngle : a0,
      endAngle : a1,
      angle : a1 - a0,
      innerRadius : r0,
      outerRadius : r1,
      fillStyle : fillStyle,
      strokeStyle : strokeStyle,
      lineWidth : lineWidth,
    };
};
