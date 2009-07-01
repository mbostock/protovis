pv.Rule = function() {
  pv.Mark.call(this);
};

pv.Rule.toString = function() {
  return "rule";
};

pv.Rule.prototype = pv.extend(pv.Mark);
pv.Rule.prototype.type = pv.Rule;
pv.Rule.prototype.defineProperty("lineWidth");
pv.Rule.prototype.defineProperty("strokeStyle");

pv.Rule.defaults = new pv.Rule().extend(pv.Mark.defaults)
    .lineWidth(1)
    .strokeStyle("black");

pv.Rule.Anchor = function() {
  pv.Mark.Anchor.call(this);
};

pv.Rule.Anchor.prototype = pv.extend(pv.Mark.Anchor);
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

pv.Rule.prototype.buildImplied = function(s) {
  s.width = s.height = 0;

  var l = s.left;
  var r = s.right;
  var t = s.top;
  var b = s.bottom;

  /* Determine horizontal or vertical orientation. */
  if (((l == null) && (r == null)) || ((r != null) && (l != null))) {
    s.width = s.parent.width - (l = l || 0) - (r = r || 0);
  } else {
    s.height = s.parent.height - (t = t || 0) - (b = b || 0);
  }

  s.left = l;
  s.right = r;
  s.top = t;
  s.bottom = b;

  pv.Mark.prototype.buildImplied.call(this, s);
};

pv.Rule.prototype.updateInstance = function(s) {
  var v = s.svg;
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "line");
    s.parent.svg.appendChild(v);
  }

  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  v.setAttribute("x1", s.left);
  v.setAttribute("y1", s.top);
  v.setAttribute("x2", s.left + s.width);
  v.setAttribute("y2", s.top + s.height);

  /* TODO gradient, patterns? */
  var stroke = new pv.Style(s.strokeStyle);
  v.setAttribute("stroke", stroke.color);
  v.setAttribute("stroke-opacity", stroke.opacity);
  v.setAttribute("stroke-width", s.lineWidth);
};
