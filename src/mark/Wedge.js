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
 * The wedge can be stroked and filled, similar to {@link pv.Bar}.
 *
 * <p>See also the <a href="../../api/Wedge.html">Wedge guide</a>.
 *
 * @extends pv.Mark
 */
pv.Wedge = function() {
  pv.Mark.call(this);
};

pv.Wedge.prototype = pv.extend(pv.Mark)
    .property("startAngle", Number)
    .property("endAngle", Number)
    .property("angle", Number)
    .property("innerRadius", Number)
    .property("outerRadius", Number)
    .property("lineWidth", Number)
    .property("strokeStyle", pv.color)
    .property("fillStyle", pv.color);

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

/**
 * The end angle of the wedge, in radians. If not specified, the end angle is
 * implied as the start angle plus the {@link #angle}.
 *
 * @type number
 * @name pv.Wedge.prototype.endAngle
 */

/**
 * The angular span of the wedge, in radians. This property is used if end angle
 * is not specified.
 *
 * @type number
 * @name pv.Wedge.prototype.angle
 */

/**
 * The inner radius of the wedge, in pixels. The default value of this property
 * is zero; a positive value will produce a donut slice rather than a pie slice.
 * The inner radius can vary per-wedge.
 *
 * @type number
 * @name pv.Wedge.prototype.innerRadius
 */

/**
 * The outer radius of the wedge, in pixels. This property is required. For
 * pies, only this radius is required; for donuts, the inner radius must be
 * specified as well. The outer radius can vary per-wedge.
 *
 * @type number
 * @name pv.Wedge.prototype.outerRadius
 */

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the wedge's border.
 *
 * @type number
 * @name pv.Wedge.prototype.lineWidth
 */

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the wedge's border. The default value of this property is null,
 * meaning wedges are not stroked by default.
 *
 * @type string
 * @name pv.Wedge.prototype.strokeStyle
 * @see pv.color
 */

/**
 * The wedge fill style; if non-null, the interior of the wedge is filled with
 * the specified color. The default value of this property is a categorical
 * color.
 *
 * @type string
 * @name pv.Wedge.prototype.fillStyle
 * @see pv.color
 */

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
    .fillStyle(pv.Colors.category20().by(pv.index));

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
 * Constructs a new wedge anchor with default properties. Wedges support five
 * different anchors:<ul>
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
 * @param {string} name the anchor name; either a string or a property function.
 * @returns {pv.Anchor}
 */
pv.Wedge.prototype.anchor = function(name) {
  function partial(s) { return s.innerRadius || s.angle < 2 * Math.PI; }
  function midRadius(s) { return (s.innerRadius + s.outerRadius) / 2; }
  function midAngle(s) { return (s.startAngle + s.endAngle) / 2; }
  return pv.Mark.prototype.anchor.call(this, name)
    .left(function() {
        var s = this.scene.target[this.index];
        if (partial(s)) switch (this.name()) {
          case "outer": return s.left + s.outerRadius * Math.cos(midAngle(s));
          case "inner": return s.left + s.innerRadius * Math.cos(midAngle(s));
          case "start": return s.left + midRadius(s) * Math.cos(s.startAngle);
          case "center": return s.left + midRadius(s) * Math.cos(midAngle(s));
          case "end": return s.left + midRadius(s) * Math.cos(s.endAngle);
        }
        return s.left;
      })
    .top(function() {
        var s = this.scene.target[this.index];
        if (partial(s)) switch (this.name()) {
          case "outer": return s.top + s.outerRadius * Math.sin(midAngle(s));
          case "inner": return s.top + s.innerRadius * Math.sin(midAngle(s));
          case "start": return s.top + midRadius(s) * Math.sin(s.startAngle);
          case "center": return s.top + midRadius(s) * Math.sin(midAngle(s));
          case "end": return s.top + midRadius(s) * Math.sin(s.endAngle);
        }
        return s.top;
      })
    .textAlign(function() {
        var s = this.scene.target[this.index];
        if (partial(s)) switch (this.name()) {
          case "outer": return pv.Wedge.upright(midAngle(s)) ? "right" : "left";
          case "inner": return pv.Wedge.upright(midAngle(s)) ? "left" : "right";
        }
        return "center";
      })
    .textBaseline(function() {
        var s = this.scene.target[this.index];
        if (partial(s)) switch (this.name()) {
          case "start": return pv.Wedge.upright(s.startAngle) ? "top" : "bottom";
          case "end": return pv.Wedge.upright(s.endAngle) ? "bottom" : "top";
        }
        return "middle";
      })
    .textAngle(function() {
        var s = this.scene.target[this.index], a = 0;
        if (partial(s)) switch (this.name()) {
          case "center":
          case "inner":
          case "outer": a = midAngle(s); break;
          case "start": a = s.startAngle; break;
          case "end": a = s.endAngle; break;
        }
        return pv.Wedge.upright(a) ? a : (a + Math.PI);
      });
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
  return (angle < Math.PI / 2) || (angle >= 3 * Math.PI / 2);
};

/** @private Sets angle based on endAngle or vice versa. */
pv.Wedge.prototype.buildImplied = function(s) {
  if (s.angle == null) s.angle = s.endAngle - s.startAngle;
  else if (s.endAngle == null) s.endAngle = s.startAngle + s.angle;
  pv.Mark.prototype.buildImplied.call(this, s);
};
