pv.Area = function() {
  pv.Mark.call(this);
};

pv.Area.toString = function() "area";

pv.Area.prototype = pv.Mark.extend();
pv.Area.prototype.type = pv.Area;
pv.Area.prototype.defineProperty("width");
pv.Area.prototype.defineProperty("height");
pv.Area.prototype.defineProperty("lineWidth");
pv.Area.prototype.defineProperty("strokeStyle");
pv.Area.prototype.defineProperty("fillStyle");

pv.Area.defaults = new pv.Area().extend(pv.Mark.defaults)
    .lineWidth(1.5)
    .strokeStyle(null)
    .fillStyle(pv.Colors.category20);

pv.Area.Anchor = function() {
  pv.Mark.Anchor.call(this);
};

pv.Area.Anchor.prototype = pv.Mark.Anchor.extend();
pv.Area.Anchor.prototype.type = pv.Area;

pv.Area.Anchor.prototype.$left = function(d) {
  var area = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return area.left() + area.width() / 2;
    case "right": return area.left() + area.width();
  }
  return null;
};

pv.Area.Anchor.prototype.$right = function(d) {
  var area = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return area.right() + area.width() / 2;
    case "left": return area.right() + area.width();
  }
  return null;
};

pv.Area.Anchor.prototype.$top = function(d) {
  var area = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return area.top() + area.height() / 2;
    case "bottom": return area.top() + area.height();
  }
  return null;
};

pv.Area.Anchor.prototype.$bottom = function(d) {
  var area = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return area.bottom() + area.height() / 2;
    case "top": return area.bottom() + area.height();
  }
  return null;
};

pv.Area.Anchor.prototype.$textAlign = function(d) {
  switch (this.get("name")) {
    case "left": return "right";
    case "bottom":
    case "top":
    case "center": return "center";
    case "right": return "left";
  }
  return null;
};

pv.Area.Anchor.prototype.$textBaseline = function(d) {
  switch (this.get("name")) {
    case "right":
    case "left":
    case "center": return "middle";
    case "top": return "bottom";
    case "bottom": return "top";
  }
  return null;
};

pv.Area.prototype.render = function(g) {
  this.renderState = [];
  if (this.get("visible")) {

    g.save();
    var move = true;
    var back = [];
    var data = this.get("data");
    this.root.renderData.unshift(null);

    this.index = -1;
    for each (let d in data) {
      pv.Mark.prototype.index = ++this.index;
      this.root.renderData[0] = d;

      var l = this.get("left");
      var r = this.get("right");
      var t = this.get("top");
      var b = this.get("bottom");
      var w = this.get("width");
      var h = this.get("height");

      var width = g.canvas.width - this.offset("right") - this.offset("left");
      var height = g.canvas.height - this.offset("bottom") - this.offset("top");
      if (w == null) {
        if (l == null) {
          l = width - r;
        } else {
          r = width - l;
        }
        if (t == null) {
          t = height - h - b;
        } else {
          b = height - h - t;
        }
      } else {
        if (l == null) {
          l = width - w - r;
        } else {
          r = width - w - l;
        }
        if (t == null) {
          t = height - b;
        } else {
          b = height - t;
        }
      }

      var x0 = l + this.offset("left");
      var x1 = g.canvas.width - r - this.offset("right");
      var y0 = t + this.offset("top");
      var y1 = g.canvas.height - b - this.offset("bottom");

      if (move) {
        move = false;
        g.beginPath();
        g.moveTo(x0, y0);
      } else {
        g.lineTo(x0, y0);
      }

      this.renderState[this.index] = {
          data : d,
          top : t,
          left : l,
          bottom : b,
          right : r,
          width : w,
          height : h,
        };

      back.push({ x: x1, y: y1 });
    }
  }
  delete this.index;
  pv.Mark.prototype.index = -1;

  back.reverse();
  for each (let v in back) {
    g.lineTo(v.x, v.y);
  }
  g.closePath();

  var fillStyle = this.get("fillStyle");
  if (fillStyle) {
    g.fillStyle = fillStyle;
    g.fill();
  }
  var strokeStyle = this.get("strokeStyle");
  if (strokeStyle) {
    g.lineWidth = this.get("lineWidth");
    g.strokeStyle = strokeStyle;
    g.stroke();
  }

  this.root.renderData.shift();
  g.restore();
};
