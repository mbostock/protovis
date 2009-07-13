/**
 * Represents a bar: an axis-aligned rectangle that can be stroked and
 * filled. Bars are used for many chart types, including bar charts, histograms
 * and Gantt charts. Bars can also be used as decorations, for example to draw a
 * frame border around a panel; in fact, a panel is a special type (a subclass)
 * of bar.
 *
 * <p>Bars can be positioned in several ways. Most commonly, one of the four
 * corners is fixed using two margins, and then the width and height properties
 * determine the extent of the bar relative to this fixed location. For example,
 * using the bottom and left properties fixes the bottom-left corner; the width
 * then extends to the right, while the height extends to the top. As an
 * alternative to the four corners, a bar can be positioned exclusively using
 * margins; this is convenient as an inset from the containing panel, for
 * example.
 *
 * <p>See {@link Mark#buildImplied} for details on the prioritization of
 * redundant positioning properties.
 */
pv.Bar = function() {
  pv.Mark.call(this);
};
pv.Bar.prototype = pv.extend(pv.Mark);
pv.Bar.prototype.type = pv.Bar;
pv.Bar.toString = function() { return "bar"; };

/**
 * The width of the bar, in pixels. If the left position is specified, the bar
 * extends rightward from the left edge; if the right position is specified, the
 * bar extends leftward from the right edge.
 */
pv.Bar.prototype.defineProperty("width");

/**
 * The height of the bar, in pixels. If the bottom position is specified, the
 * bar extends upward from the bottom edge; if the top position is specified,
 * the bar extends downward from the top edge.
 */
pv.Bar.prototype.defineProperty("height");

/**
 * The width of stroked lines, in pixels; used in conjunction with {@code
 * strokeStyle} to stroke the bar's border.
 */
pv.Bar.prototype.defineProperty("lineWidth");

/**
 * The style of stroked lines; used in conjunction with {@code lineWidth} to
 * stroke the bar's border. The default value of this property is null, meaning
 * bars are not stroked by default.
 */
pv.Bar.prototype.defineProperty("strokeStyle");

/**
 * The bar fill style; if non-null, the interior of the bar is filled with the
 * specified color. The default value of this property is a categorical color.
 */
pv.Bar.prototype.defineProperty("fillStyle");

/**
 * Default properties for bars. By default, there is no stroke and the fill
 * style is a categorical color.
 */
pv.Bar.defaults = new pv.Bar().extend(pv.Mark.defaults)
    .lineWidth(1.5)
    .fillStyle(pv.Colors.category20);

/**
 * Represents an anchor for a bar mark. Bars support five different anchors:<ul>
 *
 * <li>top
 * <li>left
 * <li>center
 * <li>bottom
 * <li>right
 *
 * </ul>In addition to positioning properties (left, right, top bottom), the
 * anchors support text rendering properties (textAlign, textBaseline). Text is
 * rendered to appear inside the bar.
 *
 * <p>To facilitate stacking of bars, the anchors are defined in terms of their
 * opposite edge. For example, the top anchor defines the bottom property, such
 * that the bar grows upwards; the bottom anchor instead defines the top
 * property, such that the bar grows downwards. Of course, in general it is more
 * robust to use panels and the cousin accessor to define stacked bars; see
 * {@link Mark#scene} for an example.
 *
 * <p>Bar anchors also "smartly" specify position properties based on whether
 * the derived mark type supports the width and height properties. If the
 * derived mark type does not support these properties (e.g., Dot), the position
 * will be centered on the corresponding edge. Otherwise (e.g., Bar), the
 * position will be in the opposite side.
 */
pv.Bar.Anchor = function() {
  pv.Mark.Anchor.call(this);
};
pv.Bar.Anchor.prototype = pv.extend(pv.Mark.Anchor);
pv.Bar.Anchor.prototype.type = pv.Bar;

/** The left property; null for "left" anchors, non-null otherwise. */
pv.Bar.Anchor.prototype.$left = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return bar.left() + (this.type.prototype.width ? 0 : (bar.width() / 2));
    case "right": return bar.left() + bar.width();
  }
  return null;
};

/** The right property; null for "right" anchors, non-null otherwise. */
pv.Bar.Anchor.prototype.$right = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return bar.right() + (this.type.prototype.width ? 0 : (bar.width() / 2));
    case "left": return bar.right() + bar.width();
  }
  return null;
};

/** The top property; null for "top" anchors, non-null otherwise. */
pv.Bar.Anchor.prototype.$top = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return bar.top() + (this.type.prototype.height ? 0 : (bar.height() / 2));
    case "bottom": return bar.top() + bar.height();
  }
  return null;
};

/** The bottom property; null for "bottom" anchors, non-null otherwise. */
pv.Bar.Anchor.prototype.$bottom = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return bar.bottom() + (this.type.prototype.height ? 0 : (bar.height() / 2));
    case "top": return bar.bottom() + bar.height();
  }
  return null;
};

/** The text-align property, for horizontal alignment inside the bar. */
pv.Bar.Anchor.prototype.$textAlign = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "left": return "left";
    case "bottom":
    case "top":
    case "center": return "center";
    case "right": return "right";
  }
  return null;
};

/** The text-baseline property, for vertical alignment inside the bar. */
pv.Bar.Anchor.prototype.$textBaseline = function(d) {
  var bar = this.anchorTarget();
  switch (this.get("name")) {
    case "right":
    case "left":
    case "center": return "middle";
    case "top": return "top";
    case "bottom": return "bottom";
  }
  return null;
};

/**
 * Updates the display for the specified bar instance {@code s} in the scene
 * graph. This implementation handles the fill and stroke style for the bar, as
 * well as positional properties.
 *
 * @param s a node in the scene graph; the instance of the bar to update.
 */
pv.Bar.prototype.updateInstance = function(s) {
  var v = s.svg;
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "rect");
    s.parent.svg.appendChild(v);
  }

  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  /* left, top */
  v.setAttribute("x", s.left);
  v.setAttribute("y", s.top);

  /* If width and height are exactly zero, the rect is not stroked! */
  v.setAttribute("width", Math.max(1E-10, s.width));
  v.setAttribute("height", Math.max(1E-10, s.height));

  /* TODO gradient, patterns */
  var fill = pv.color(s.fillStyle);
  v.setAttribute("fill", fill.color);
  v.setAttribute("fill-opacity", fill.opacity);
  var stroke = pv.color(s.strokeStyle);
  v.setAttribute("stroke", stroke.color);
  v.setAttribute("stroke-opacity", stroke.opacity);
  v.setAttribute("stroke-width", s.lineWidth);
};
