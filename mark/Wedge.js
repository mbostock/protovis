/**
 * Constructs a new wedge with default properties. Wedges are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents a wedge, or pie slice. Specified in terms of start and end
 * angle, inner and outer radius, wedges can be used to construct donut charts
 * and polar bar charts as well. If the {@link #angle} property is used, the end
 * angle is implied by adding this value to start angle. By default, the start
 * angle is the previously-generated wedge's end angle. This design allows
 * explicit control over the wedge placement if desired, while offering
 * convenient defaults for the construction of radial graphs.
 *
 * <p>The center point of the circle is positioned using the standard box model.
 * The wedge can be stroked and filled, similar to {link Bar}.
 *
 * <p>See also the <a href="../../api/Wedge.html">Wedge guide</a>.
 *
 * @extends pv.Mark
 */
pv.Wedge = function() {
  pv.Mark.call(this);
};
pv.Wedge.prototype = pv.extend(pv.Mark);
pv.Wedge.prototype.type = "wedge";

/**
 * The start angle of the wedge, in radians. The start angle is measured
 * clockwise from the 3 o'clock position. The default value of this property is
 * the end angle of the previous instance (the {@link Mark#sibling}), or -PI / 2
 * for the first wedge; for pie and donut charts, typically only the
 * {@link #angle} property needs to be specified.
 *
 * @type number
 * @name pv.Wedge.prototype.startAngle
 */
pv.Wedge.prototype.defineProperty("startAngle");

/**
 * The end angle of the wedge, in radians. If not specified, the end angle is
 * implied as the start angle plus the {@link #angle}.
 *
 * @type number
 * @name pv.Wedge.prototype.endAngle
 */
pv.Wedge.prototype.defineProperty("endAngle");

/**
 * The angular span of the wedge, in radians. This property is used if end angle
 * is not specified.
 *
 * @type number
 * @name pv.Wedge.prototype.angle
 */
pv.Wedge.prototype.defineProperty("angle");

/**
 * The inner radius of the wedge, in pixels. The default value of this property
 * is zero; a positive value will produce a donut slice rather than a pie slice.
 * The inner radius can vary per-wedge.
 *
 * @type number
 * @name pv.Wedge.prototype.innerRadius
 */
pv.Wedge.prototype.defineProperty("innerRadius");

/**
 * The outer radius of the wedge, in pixels. This property is required. For
 * pies, only this radius is required; for donuts, the inner radius must be
 * specified as well. The outer radius can vary per-wedge.
 *
 * @type number
 * @name pv.Wedge.prototype.outerRadius
 */
pv.Wedge.prototype.defineProperty("outerRadius");

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the wedge's border.
 *
 * @type number
 * @name pv.Wedge.prototype.lineWidth
 */
pv.Wedge.prototype.defineProperty("lineWidth");

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the wedge's border. The default value of this property is null,
 * meaning wedges are not stroked by default.
 *
 * @type string
 * @name pv.Wedge.prototype.strokeStyle
 * @see pv.color
 */
pv.Wedge.prototype.defineProperty("strokeStyle");

/**
 * The wedge fill style; if non-null, the interior of the wedge is filled with
 * the specified color. The default value of this property is a categorical
 * color.
 *
 * @type string
 * @name pv.Wedge.prototype.fillStyle
 * @see pv.color
 */
pv.Wedge.prototype.defineProperty("fillStyle");

/**
 * Default properties for wedges. By default, there is no stroke and the fill
 * style is a categorical color.
 *
 * @type pv.Wedge
 */
pv.Wedge.prototype.defaults = new pv.Wedge()
    .extend(pv.Mark.prototype.defaults)
    .startAngle(function() {
        var s = this.sibling();
        return s ? s.endAngle : -Math.PI / 2;
      })
    .innerRadius(0)
    .lineWidth(1.5)
    .strokeStyle(null)
    .fillStyle(pv.Colors.category20.index);

/**
 * Returns the mid-radius of the wedge, which is defined as half-way between the
 * inner and outer radii.
 *
 * @see #innerRadius
 * @see #outerRadius
 * @returns {number} the mid-radius, in pixels.
 */
pv.Wedge.prototype.midRadius = function() {
  return (this.innerRadius() + this.outerRadius()) / 2;
};

/**
 * Returns the mid-angle of the wedge, which is defined as half-way between the
 * start and end angles.
 *
 * @see #startAngle
 * @see #endAngle
 * @returns {number} the mid-angle, in radians.
 */
pv.Wedge.prototype.midAngle = function() {
  return (this.startAngle() + this.endAngle()) / 2;
};

/**
 * Constructs a new wedge anchor with default properties.
 *
 * @class Represents an anchor for a wedge mark. Wedges support five different
 * anchors:<ul>
 *
 * <li>outer
 * <li>inner
 * <li>center
 * <li>start
 * <li>end
 *
 * </ul>In addition to positioning properties (left, right, top bottom), the
 * anchors support text rendering properties (text-align, text-baseline,
 * textAngle). Text is rendered to appear inside the wedge.
 *
 * @extends pv.Mark.Anchor
 */
pv.Wedge.Anchor = function() {
  pv.Mark.Anchor.call(this);
};
pv.Wedge.prototype.Anchor = pv.Wedge.Anchor;
pv.Wedge.Anchor.prototype = pv.extend(pv.Mark.Anchor);

/**
 * The left property; non-null.
 *
 * @type number
 * @name pv.Wedge.Anchor.prototype.left
 */ /** @private */
pv.Wedge.Anchor.prototype.$left = function() {
  var w = this.anchorTarget();
  switch (this.$("name")) {
    case "outer": return w.left() + w.outerRadius() * Math.cos(w.midAngle());
    case "inner": return w.left() + w.innerRadius() * Math.cos(w.midAngle());
    case "start": return w.left() + w.midRadius() * Math.cos(w.startAngle());
    case "center": return w.left() + w.midRadius() * Math.cos(w.midAngle());
    case "end": return w.left() + w.midRadius() * Math.cos(w.endAngle());
  }
  return null;
};

/**
 * The right property; non-null.
 *
 * @type number
 * @name pv.Wedge.Anchor.prototype.right
 */ /** @private */
pv.Wedge.Anchor.prototype.$right = function() {
  var w = this.anchorTarget();
  switch (this.$("name")) {
    case "outer": return w.right() + w.outerRadius() * Math.cos(w.midAngle());
    case "inner": return w.right() + w.innerRadius() * Math.cos(w.midAngle());
    case "start": return w.right() + w.midRadius() * Math.cos(w.startAngle());
    case "center": return w.right() + w.midRadius() * Math.cos(w.midAngle());
    case "end": return w.right() + w.midRadius() * Math.cos(w.endAngle());
  }
  return null;
};

/**
 * The top property; non-null.
 *
 * @type number
 * @name pv.Wedge.Anchor.prototype.top
 */ /** @private */
pv.Wedge.Anchor.prototype.$top = function() {
  var w = this.anchorTarget();
  switch (this.$("name")) {
    case "outer": return w.top() + w.outerRadius() * Math.sin(w.midAngle());
    case "inner": return w.top() + w.innerRadius() * Math.sin(w.midAngle());
    case "start": return w.top() + w.midRadius() * Math.sin(w.startAngle());
    case "center": return w.top() + w.midRadius() * Math.sin(w.midAngle());
    case "end": return w.top() + w.midRadius() * Math.sin(w.endAngle());
  }
  return null;
};

/**
 * The bottom property; non-null.
 *
 * @type number
 * @name pv.Wedge.Anchor.prototype.bottom
 */ /** @private */
pv.Wedge.Anchor.prototype.$bottom = function() {
  var w = this.anchorTarget();
  switch (this.$("name")) {
    case "outer": return w.bottom() + w.outerRadius() * Math.sin(w.midAngle());
    case "inner": return w.bottom() + w.innerRadius() * Math.sin(w.midAngle());
    case "start": return w.bottom() + w.midRadius() * Math.sin(w.startAngle());
    case "center": return w.bottom() + w.midRadius() * Math.sin(w.midAngle());
    case "end": return w.bottom() + w.midRadius() * Math.sin(w.endAngle());
  }
  return null;
};

/**
 * The text-align property, for horizontal alignment inside the wedge.
 *
 * @type string
 * @name pv.Wedge.Anchor.prototype.textAlign
 */ /** @private */
pv.Wedge.Anchor.prototype.$textAlign = function() {
  var w = this.anchorTarget();
  switch (this.$("name")) {
    case "outer": return pv.Wedge.upright(w.midAngle()) ? "right" : "left";
    case "inner": return pv.Wedge.upright(w.midAngle()) ? "left" : "right";
    default: return "center";
  }
};

/**
 * The text-baseline property, for vertical alignment inside the wedge.
 *
 * @type string
 * @name pv.Wedge.Anchor.prototype.textBaseline
 */ /** @private */
pv.Wedge.Anchor.prototype.$textBaseline = function() {
  var w = this.anchorTarget();
  switch (this.$("name")) {
    case "start": return pv.Wedge.upright(w.startAngle()) ? "top" : "bottom";
    case "end": return pv.Wedge.upright(w.endAngle()) ? "bottom" : "top";
    default: return "middle";
  }
};

/**
 * The text-angle property, for text rotation inside the wedge.
 *
 * @type number
 * @name pv.Wedge.Anchor.prototype.textAngle
 */ /** @private */
pv.Wedge.Anchor.prototype.$textAngle = function() {
  var w = this.anchorTarget();
  var a = 0;
  switch (this.$("name")) {
    case "center":
    case "inner":
    case "outer": a = w.midAngle(); break;
    case "start": a = w.startAngle(); break;
    case "end": a = w.endAngle(); break;
  }
  return pv.Wedge.upright(a) ? a : (a + Math.PI);
};

/**
 * Returns true if the specified angle is considered "upright", as in, text
 * rendered at that angle would appear upright. If the angle is not upright,
 * text is rotated 180 degrees to be upright, and the text alignment properties
 * are correspondingly changed.
 *
 * @param {number} angle an angle, in radius.
 * @returns {boolean} true if the specified angle is upright.
 */
pv.Wedge.upright = function(angle) {
  angle = angle % (2 * Math.PI);
  angle = (angle < 0) ? (2 * Math.PI + angle) : angle;
  return (angle < Math.PI / 2) || (angle > 3 * Math.PI / 2);
};

/**
 * Overrides the default behavior of {@link Mark#buildImplied} such that the end
 * angle is computed from the start angle and angle (angular span) if not
 * specified.
 *
 * @param s a node in the scene graph; the instance of the wedge to build.
 */
pv.Wedge.prototype.buildImplied = function(s) {
  pv.Mark.prototype.buildImplied.call(this, s);

  /*
   * TODO If the angle or endAngle is updated by an event handler, the implied
   * properties won't recompute correctly, so this will lead to potentially
   * buggy redraw. How to re-evaluate implied properties on update?
   */
  if (s.endAngle == null) s.endAngle = s.startAngle + s.angle;
  if (s.angle == null) s.angle = s.endAngle - s.startAngle;
};
