pv.Dot = function() {
  pv.Mark.call(this);
};

pv.Dot.toString = function() {
  return "dot";
};

pv.Dot.prototype = pv.Mark.extend();
pv.Dot.prototype.type = pv.Dot;
pv.Dot.prototype.defineProperty("size");
pv.Dot.prototype.defineProperty("shape");
pv.Dot.prototype.defineProperty("angle");
pv.Dot.prototype.defineProperty("lineWidth");
pv.Dot.prototype.defineProperty("strokeStyle");
pv.Dot.prototype.defineProperty("fillStyle");

pv.Dot.defaults = new pv.Dot().extend(pv.Mark.defaults)
    .size(20)
    .shape("circle")
    .angle(0)
    .lineWidth(1.5)
    .strokeStyle(pv.Colors.category10)
    .fillStyle(null);

pv.Dot.Anchor = function() {
  pv.Mark.Anchor.call(this);
};

pv.Dot.Anchor.prototype = pv.Mark.Anchor.extend();
pv.Dot.Anchor.prototype.type = pv.Dot;

pv.Dot.Anchor.prototype.$left = function(d) {
  var dot = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return dot.left();
    case "left": return dot.left() - dot.radius();
  }
  return null;
};

pv.Dot.Anchor.prototype.$right = function(d) {
  var dot = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return dot.right();
    case "right": return dot.right() - dot.radius();
  }
  return null;
};

pv.Dot.Anchor.prototype.$top = function(d) {
  var dot = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return dot.top();
    case "top": return dot.top() - dot.radius();
  }
  return null;
};

pv.Dot.Anchor.prototype.$bottom = function(d) {
  var dot = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return dot.bottom();
    case "bottom": return dot.bottom() - dot.radius();
  }
  return null;
};

pv.Dot.Anchor.prototype.$textAlign = function(d) {
  switch (this.get("name")) {
    case "left": return "right";
    case "bottom":
    case "top":
    case "center": return "center";
    case "right": return "left";
  }
  return null;
};

pv.Dot.Anchor.prototype.$textBaseline = function(d) {
  switch (this.get("name")) {
    case "right":
    case "left":
    case "center": return "middle";
    case "top": return "bottom";
    case "bottom": return "top";
  }
  return null;
};

pv.Dot.prototype.radius = function() {
  return Math.sqrt(this.size());
};

pv.Dot.prototype.renderInstance = function(g, d) {
  var l = this.get("left");
  var r = this.get("right");
  var t = this.get("top");
  var b = this.get("bottom");

  function path(shape, size) {
    g.beginPath();
    var radius = Math.sqrt(size);
    switch (shape) {
      case "cross": {
        g.moveTo(-radius, -radius);
        g.lineTo(radius, radius);
        g.moveTo(radius, -radius);
        g.lineTo(-radius, radius);
        break;
      }
      case "triangle": {
        var h = radius;
        var w = radius * 2 / Math.sqrt(3);
        g.moveTo(0, h);
        g.lineTo(w, -h);
        g.lineTo(-w, -h);
        g.closePath();
        break;
      }
      case "diamond": {
        radius *= Math.sqrt(2);
        g.moveTo(0, -radius);
        g.lineTo(radius, 0);
        g.lineTo(0, radius);
        g.lineTo(-radius, 0);
        g.closePath();
        break;
      }
      case "square": {
        g.moveTo(-radius, -radius);
        g.lineTo(radius, -radius);
        g.lineTo(radius, radius);
        g.lineTo(-radius, radius);
        g.closePath();
        break;
      }
      case "tick": {
        g.moveTo(0, 0);
        g.lineTo(0, -size);
        break;
      }
      default: {
        g.arc(0, 0, radius, 0, 2.0 * Math.PI, false);
        break;
      }
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

  var fillStyle = this.get("fillStyle");
  var strokeStyle = this.get("strokeStyle");
  var lineWidth = this.get("lineWidth");
  var size = this.get("size");
  var shape = this.get("shape");
  var angle = this.get("angle");

  g.save();
  g.translate(x, y);
  g.rotate(angle);
  path(shape, size);
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
      size : size,
      shape : shape,
      fillStyle : fillStyle,
      strokeStyle : strokeStyle,
      lineWidth : lineWidth,
      angle : angle,
    };
};
