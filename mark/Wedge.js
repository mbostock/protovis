pv.Wedge = function() {
  pv.Mark.call(this);
};

pv.Wedge.toString = function() "wedge";

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

pv.Wedge.defaults = pv.Mark.defaults.extend(pv.Wedge)
    .startAngle(function() this.index ? this.previous().endAngle : -Math.PI / 2)
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

pv.Wedge.Anchor.prototype.$left = function(d) {
  var wedge = this.anchorTarget();
  function cos(a) wedge.midRadius() * Math.cos(a);
  switch (this.get("name")) {
    case "start": return wedge.left() + cos(wedge.startAngle());
    case "center": return wedge.left() + cos(wedge.midAngle());
    case "end": return wedge.left() + cos(wedge.endAngle());
  }
  return null;
};

pv.Wedge.Anchor.prototype.$right = function(d) {
  var wedge = this.anchorTarget();
  function cos(a) wedge.midRadius() * Math.cos(a);
  switch (this.get("name")) {
    case "start": return wedge.right() + cos(wedge.startAngle());
    case "center": return wedge.right() + cos(wedge.midAngle());
    case "end": return wedge.right() + cos(wedge.endAngle());
  }
  return null;
};

pv.Wedge.Anchor.prototype.$top = function(d) {
  var wedge = this.anchorTarget();
  function sin(a) wedge.midRadius() * Math.sin(a);
  switch (this.get("name")) {
    case "start": return wedge.top() + sin(wedge.startAngle());
    case "center": return wedge.top() + sin(wedge.midAngle());
    case "end": return wedge.top() + sin(wedge.endAngle());
  }
  return null;
};

pv.Wedge.Anchor.prototype.$bottom = function(d) {
  var wedge = this.anchorTarget();
  function sin(a) wedge.midRadius() * Math.sin(a);
  switch (this.get("name")) {
    case "start": return wedge.bottom() + sin(wedge.startAngle());
    case "center": return wedge.bottom() + sin(wedge.midAngle());
    case "end": return wedge.bottom() + sin(wedge.endAngle());
  }
  return null;
};

pv.Wedge.Anchor.prototype.$textAlign = function(d) {
  switch (this.get("name")) {
    case "start": return "right";
    case "center": return "center";
    case "end": return "left";
  }
  return null;
};

pv.Wedge.Anchor.prototype.$textBaseline = function(d) {
  switch (this.get("name")) {
    case "start":
    case "end":
    case "center": return "middle";
  }
  return null;
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
