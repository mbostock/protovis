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

pv.Dot.prototype.updateInstance = function(s) {
  var v = s.svg;
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "path");
    s.parent.svg.appendChild(v);
  }

  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  v.setAttribute("transform", "translate(" + s.left + "," + s.top +")"
      + (s.angle ? " rotate(" + 180 * s.angle / Math.PI + ")" : ""));

  /* TODO gradient, patterns? */
  var fill = new pv.Style(s.fillStyle);
  v.setAttribute("fill", fill.color);
  v.setAttribute("fill-opacity", fill.opacity);
  var stroke = new pv.Style(s.strokeStyle);
  v.setAttribute("stroke", stroke.color);
  v.setAttribute("stroke-opacity", stroke.opacity);
  v.setAttribute("stroke-width", s.lineWidth);

  var radius = Math.sqrt(s.size);

  var d;
  switch (s.shape) {
    case "cross": {
      d = "M" + -radius + "," + -radius
          + "L" + radius + "," + radius
          + "M" + radius + "," + -radius
          + "L" + -radius + "," + radius;
      break;
    }
    case "triangle": {
      var h = radius, w = radius * 2 / Math.sqrt(3);
      d = "M0," + h
          + "L" + w +"," + -h
          + " " + -w + "," + -h
          + "Z";
      break;
    }
    case "diamond": {
      radius *= Math.sqrt(2);
      d = "M0," + -radius
          + "L" + radius + ",0"
          + " 0," + radius
          + " " + -radius + ",0"
          + "Z";
      break;
    }
    case "square": {
      d = "M" + -radius + "," + -radius
          + "L" + radius + "," + -radius
          + " " + radius + "," + radius
          + " " + -radius + "," + radius
          + "Z";
      break;
    }
    case "tick": {
      d = "M0,0L0," + -s.size;
      break;
    }
    default: { // circle
      d = "M0," + radius
          + "A" + radius + "," + radius + " 0 1,1 0," + (-radius)
          + "A" + radius + "," + radius + " 0 1,1 0," + radius
          + "Z";
      break;
    }
  }
  v.setAttribute("d", d);
};
