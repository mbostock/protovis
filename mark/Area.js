/**
 * Represents an area mark: the solid area between two series of connected line
 * segments. Unsurprisingly, areas are used most frequently for area charts.
 *
 * <p>Just as a line represents a polyline, the {@code Area} mark type
 * represents a <i>polygon</i>. However, an area is not an arbitrary polygon;
 * vertices are paired either horizontally or vertically into parallel
 * <i>spans</i>, and each span corresponds to an associated datum. Either the
 * width or the height must be specified, but not both; this determines whether
 * the area is horizontally-oriented or vertically-oriented.  Like lines, areas
 * can be stroked and filled with arbitrary colors.
 */
pv.Area = function() {
  pv.Mark.call(this);
};
pv.Area.prototype = pv.extend(pv.Mark);
pv.Area.prototype.type = pv.Area;
pv.Area.toString = function() { return "area"; };

/**
 * The width of a given span; used for horizontal spans. If the width is
 * specified, the height property should be 0 (the default). Either the top or
 * bottom property should be used to space the spans vertically, typically as a
 * multiple of the index.
 */
pv.Area.prototype.defineProperty("width");

/**
 * The height of a given span; used for vertical spans. If the height is
 * specified, the width property should be 0 (the default). Either the left or
 * right property should be used to space the spans horizontally, typically as a
 * multiple of the index.
 */
pv.Area.prototype.defineProperty("height");

/**
 * The width of stroked lines in pixels; used in conjunction with {@code
 * strokeStyle} to stroke the perimeter of the area. Unlike the {@link Line}
 * mark type, the entire perimeter is stroked, rather than just one edge. The
 * default value of this property is 1.5, but since the default stroke style is
 * null, area marks are not stroked by default.
 *
 * <p>This property is <i>fixed</i>. See {@link Mark}.
 */
pv.Area.prototype.defineProperty("lineWidth");

/**
 * The style of stroked lines; used in conjunction with {@code lineWidth} to
 * stroke the perimeter of the area. Unlike the {@link Line} mark type, the
 * entire perimeter is stroked, rather than just one edge. The default value of
 * this property is null, meaning areas are not stroked by default.
 *
 * <p>This property is <i>fixed</i>. See {@link Mark}.
 */
pv.Area.prototype.defineProperty("strokeStyle");

/**
 * The area fill style; if non-null, the interior of the polygon forming the
 * area is filled with the specified color. The default value of this property
 * is a categorical color.
 *
 * <p>This property is <i>fixed</i>. See {@link Mark}.
 */
pv.Area.prototype.defineProperty("fillStyle");

/**
 * Default properties for areas.
 */
pv.Area.defaults = new pv.Area().extend(pv.Mark.defaults)
    .width(0)
    .height(0)
    .lineWidth(1.5)
    .strokeStyle(null)
    .fillStyle(pv.Colors.category20);

pv.Area.Anchor = function() {
  pv.Mark.Anchor.call(this);
};

pv.Area.Anchor.prototype = pv.extend(pv.Mark.Anchor);
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

pv.Area.prototype.buildImplied = function(s) {
  if (s.height == null) s.height = 0;
  if (s.width == null) s.width = 0;
  pv.Mark.prototype.buildImplied.call(this, s);
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
      p += si.left + "," + si.top + " ";
    }
    for (var i = this.scene.length - 1; i >= 0; i--) {
      var si = this.scene[i];
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
  var fill = pv.color(s.fillStyle);
  v.setAttribute("fill", fill.color);
  v.setAttribute("fill-opacity", fill.opacity);
  var stroke = pv.color(s.strokeStyle);
  v.setAttribute("stroke", stroke.color);
  v.setAttribute("stroke-opacity", stroke.opacity);
  v.setAttribute("stroke-width", s.lineWidth);
};
