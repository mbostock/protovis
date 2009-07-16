/**
 * Constructs a new dot mark with default properties. Dots are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents a dot; a dot is simply a sized glyph centered at a given
 * point that can also be stroked and filled. The <tt>size</tt> property is
 * proportional to the area of the rendered glyph to encourage meaningful visual
 * encodings. Dots can visually encode up to eight dimensions of data, though
 * this may be unwise due to integrality. See {@link pv.Mark#buildImplied} for
 * details on the prioritization of redundant positioning properties.
 *
 * <p>See also the <a href="../../api/Dot.html">Dot guide</a>.
 *
 * @extends pv.Mark
 */
pv.Dot = function() {
  pv.Mark.call(this);
};
pv.Dot.prototype = pv.extend(pv.Mark);
pv.Dot.prototype.type = pv.Dot;

/**
 * Returns "dot".
 *
 * @returns {string} "dot".
 */
pv.Dot.toString = function() { return "dot"; };

/**
 * The size of the dot, in square pixels. Square pixels are used such that the
 * area of the dot is linearly proportional to the value of the size property,
 * facilitating representative encodings.
 *
 * @see #radius
 * @type number
 * @name pv.Dot.prototype.size
 */
pv.Dot.prototype.defineProperty("size");

/**
 * The shape name. Several shapes are supported:<ul>
 *
 * <li>cross
 * <li>triangle
 * <li>diamond
 * <li>square
 * <li>tick
 * <li>circle
 *
 * </ul>These shapes can be further changed using the {@link #angle} property;
 * for instance, a cross can be turned into a plus by rotating. Similarly, the
 * tick, which is vertical by default, can be rotated horizontally. Note that
 * some shapes (cross and tick) do not have interior areas, and thus do not
 * support fill style meaningfully.
 *
 * <p>TODO It's probably better to use the Rule mark type rather than a
 * tick-shaped Dot. However, the Rule mark doesn't support the width and height
 * properties, so it's a bit clumsy to use. It should be possible to add support
 * for width and height to rule, and then remove the tick shape.
 *
 * @type string
 * @name pv.Dot.prototype.shape
 */
pv.Dot.prototype.defineProperty("shape");

/**
 * The rotation angle, in radians. Used to rotate shapes, such as to turn a
 * cross into a plus.
 *
 * @type number
 * @name pv.Dot.prototype.angle
 */
pv.Dot.prototype.defineProperty("angle");

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the dot's shape.
 *
 * @type number
 * @name pv.Dot.prototype.lineWidth
 */
pv.Dot.prototype.defineProperty("lineWidth");

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the dot's shape. The default value of this property is a categorical
 * color.
 *
 * @type string
 * @name pv.Dot.prototype.strokeStyle
 * @see pv.color
 */
pv.Dot.prototype.defineProperty("strokeStyle");

/**
 * The fill style; if non-null, the interior of the dot is filled with the
 * specified color. The default value of this property is null, meaning dots are
 * not filled by default.
 *
 * @type string
 * @name pv.Dot.prototype.fillStyle
 * @see pv.color
 */
pv.Dot.prototype.defineProperty("fillStyle");

/**
 * Default properties for dots. By default, there is no fill and the stroke
 * style is a categorical color. The default shape is "circle" with size 20.
 *
 * @type pv.Dot
 */
pv.Dot.defaults = new pv.Dot().extend(pv.Mark.defaults)
    .size(20)
    .shape("circle")
    .lineWidth(1.5)
    .strokeStyle(pv.Colors.category10);

/**
 * Constructs a new dot anchor with default properties.
 *
 * @class Represents an anchor for a dot mark. Dots support five different
 * anchors:<ul>
 *
 * <li>top
 * <li>left
 * <li>center
 * <li>bottom
 * <li>right
 *
 * </ul>In addition to positioning properties (left, right, top bottom), the
 * anchors support text rendering properties (text-align, text-baseline). Text is
 * rendered to appear outside the dot. Note that this behavior is different from
 * other mark anchors, which default to rendering text <i>inside</i> the mark.
 *
 * <p>For consistency with the other mark types, the anchor positions are
 * defined in terms of their opposite edge. For example, the top anchor defines
 * the bottom property, such that a bar added to the top anchor grows upward.
 *
 * @extends pv.Mark.Anchor
 */
pv.Dot.Anchor = function() {
  pv.Mark.Anchor.call(this);
};
pv.Dot.Anchor.prototype = pv.extend(pv.Mark.Anchor);
pv.Dot.Anchor.prototype.type = pv.Dot;

/**
 * The left property; null for "left" anchors, non-null otherwise.
 *
 * @type number
 * @name pv.Dot.Anchor.prototype.left
 */ /** @private */
pv.Dot.Anchor.prototype.$left = function(d) {
  var dot = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return dot.left();
    case "right": return dot.left() + dot.radius();
  }
  return null;
};

/**
 * The right property; null for "right" anchors, non-null otherwise.
 *
 * @type number
 * @name pv.Dot.Anchor.prototype.right
 */ /** @private */
pv.Dot.Anchor.prototype.$right = function(d) {
  var dot = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return dot.right();
    case "left": return dot.right() + dot.radius();
  }
  return null;
};

/**
 * The top property; null for "top" anchors, non-null otherwise.
 *
 * @type number
 * @name pv.Dot.Anchor.prototype.top
 */ /** @private */
pv.Dot.Anchor.prototype.$top = function(d) {
  var dot = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return dot.top();
    case "bottom": return dot.top() + dot.radius();
  }
  return null;
};

/**
 * The bottom property; null for "bottom" anchors, non-null otherwise.
 *
 * @type number
 * @name pv.Dot.Anchor.prototype.bottom
 */ /** @private */
pv.Dot.Anchor.prototype.$bottom = function(d) {
  var dot = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return dot.bottom();
    case "top": return dot.bottom() + dot.radius();
  }
  return null;
};

/**
 * The text-align property, for horizontal alignment outside the dot.
 *
 * @type string
 * @name pv.Dot.Anchor.prototype.textAlign
 */ /** @private */
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

/**
 * The text-baseline property, for vertical alignment outside the dot.
 *
 * @type string
 * @name pv.Dot.Anchor.prototype.textBasline
 */ /** @private */
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

/**
 * Returns the radius of the dot, which is defined to be the square root of the
 * {@link #size} property.
 *
 * @returns {number} the radius.
 */
pv.Dot.prototype.radius = function() {
  return Math.sqrt(this.size());
};

/**
 * Updates the display for the specified dot instance <tt>s</tt> in the scene
 * graph. This implementation handles the fill and stroke style for the dot, as
 * well as positional properties.
 *
 * @param s a node in the scene graph; the instance of the dot to update.
 */
pv.Dot.prototype.updateInstance = function(s) {
  var v = s.svg;

  /* Create the <svg:path> element, if necessary. */
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "path");
    s.parent.svg.appendChild(v);
  }

  /* visible, cursor, title, event, etc. */
  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  /* left, top */
  v.setAttribute("transform", "translate(" + s.left + "," + s.top +")"
      + (s.angle ? " rotate(" + 180 * s.angle / Math.PI + ")" : ""));

  /* fill, stroke TODO gradient, patterns? */
  var fill = pv.color(s.fillStyle);
  v.setAttribute("fill", fill.color);
  v.setAttribute("fill-opacity", fill.opacity);
  var stroke = pv.color(s.strokeStyle);
  v.setAttribute("stroke", stroke.color);
  v.setAttribute("stroke-opacity", stroke.opacity);
  v.setAttribute("stroke-width", s.lineWidth);

  /* shape, size */
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
