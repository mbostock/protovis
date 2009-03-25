pv.Area = function() {
  pv.Mark.call(this);
};

pv.Area.toString = function() {
  return "area";
};

pv.Area.prototype = pv.Mark.extend();
pv.Area.prototype.type = pv.Area;
pv.Area.prototype.defineProperty("width");
pv.Area.prototype.defineProperty("height");
pv.Area.prototype.defineProperty("lineWidth");
pv.Area.prototype.defineProperty("strokeStyle");
pv.Area.prototype.defineProperty("fillStyle");

pv.Area.defaults = new pv.Area().extend(pv.Mark.defaults)
    .width(0)
    .height(0)
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
    case "left": return "left";
    case "bottom":
    case "top":
    case "center": return "center";
    case "right": return "right";
  }
  return null;
};

pv.Area.Anchor.prototype.$textBaseline = function(d) {
  switch (this.get("name")) {
    case "right":
    case "left":
    case "center": return "middle";
    case "top": return "top";
    case "bottom": return "bottom";
  }
  return null;
};

pv.Area.prototype.render = function(g) {
  g.save();
  var move = true;
  var back = [];

  for (var i = 0; i < this.scene.length; i++) {
    var s = this.scene[i];
    if (!s.visible) {
      continue; // TODO render fragment
    }

    var x0 = s.left;
    var x1 = x0 + s.width;
    var y0 = s.top;
    var y1 = y0 + s.height;

    if (move) {
      move = false;
      g.beginPath();
      g.moveTo(x0, y0);
    } else {
      g.lineTo(x0, y0);
    }

    back.push({ x: x1, y: y1 });
  }

  back.reverse();
  for (var i = 0; i < back.length; i++) {
    g.lineTo(back[i].x, back[i].y);
  }
  g.closePath();

  /* TODO variable fillStyle, strokeStyle, lineWidth */
  if (s) {
    if (s.fillStyle) {
      g.fillStyle = s.fillStyle;
      g.fill();
    }
    if (s.strokeStyle) {
      g.lineWidth = s.lineWidth;
      g.strokeStyle = s.strokeStyle;
      g.stroke();
    }
  }

  g.restore();
};
