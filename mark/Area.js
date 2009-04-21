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

pv.Area.prototype.update = function(g) {
  if (!this.scene.length) return;

  var s = this.scene[0], v = s.svg;
  if (s.visible) {
    if (!v) {
      v = s.svg = document.createElementNS(pv.ns.svg, "polygon");
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
    for (var i = this.scene.length - 1; i >= 0; i--) {
      var si = this.scene[i];
      if (isNaN(si.width)) si.width = 0;
      if (isNaN(si.height)) si.height = 0;
      p += (si.left + si.width) + "," + (si.top + si.height) + " ";
    }
    v.setAttribute("points", p);

    this.updateInstance(s);
    v.removeAttribute("display");
  } else if (v) {
    v.setAttribute("display", "none");
  }
};

/**
 * For Areas, this method is only invoked after event handlers have updated the
 * scene graph; it is guaranteed to be called only from the first scene.
 */
pv.Area.prototype.updateInstance = function(s) {
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
