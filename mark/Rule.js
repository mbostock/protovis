/**
 * Constructs a new rule with default properties. Rules are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents a horizontal or vertical rule. Rules are frequently used
 * for axes and grid lines. For example, specifying only the bottom property
 * draws horizontal rules, while specifying only the left draws vertical
 * rules. Rules can also be used as thin bars. The visual style is controlled in
 * the same manner as lines.
 *
 * <p>Rules are positioned exclusively using the four margins. The following
 * combinations of properties are supported:<ul>
 *
 * <li>left (vertical)
 * <li>right (vertical)
 * <li>left, bottom, top (vertical)
 * <li>right, bottom, top (vertical)
 * <li>top (horizontal)
 * <li>bottom (horizontal)
 * <li>top, left, right (horizontal)
 * <li>bottom, left, right (horizontal)
 *
 * </ul>TODO If rules supported width (for horizontal) and height (for vertical)
 * properties, it might be easier to place them. Small rules can be used as tick
 * marks; alternatively, a {@link Dot} with the "tick" shape can be used.
 *
 * <p>See also the <a href="../../api/Rule.html">Rule guide</a>.
 *
 * @see pv.Line
 * @extends pv.Mark
 */
pv.Rule = function() {
  pv.Mark.call(this);
};
pv.Rule.prototype = pv.extend(pv.Mark);
pv.Rule.prototype.type = pv.Rule;

/**
 * Returns "rule".
 *
 * @returns {string} "rule".
 */
pv.Rule.toString = function() { return "rule"; };

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the rule. The default value is 1 pixel.
 *
 * @type number
 * @name pv.Rule.prototype.lineWidth
 */
pv.Rule.prototype.defineProperty("lineWidth");

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the rule. The default value of this property is black.
 *
 * @type string
 * @name pv.Rule.prototype.strokeStyle
 * @see pv.color
 */
pv.Rule.prototype.defineProperty("strokeStyle");

/**
 * Default properties for rules. By default, a single-pixel black line is
 * stroked.
 *
 * @type pv.Rule
 */
pv.Rule.defaults = new pv.Rule().extend(pv.Mark.defaults)
    .lineWidth(1)
    .strokeStyle("black");

/**
 * Constructs a new rule anchor with default properties.
 *
 * @class Represents an anchor for a rule mark. Rules support five different
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
 * rendered to appear outside the rule. Note that this behavior is different
 * from other mark anchors, which default to rendering text <i>inside</i> the
 * mark.
 *
 * <p>For consistency with the other mark types, the anchor positions are
 * defined in terms of their opposite edge. For example, the top anchor defines
 * the bottom property, such that a bar added to the top anchor grows upward.
 *
 * @extends pv.Bar.Anchor
 */
pv.Rule.Anchor = function() {
  pv.Bar.Anchor.call(this);
};
pv.Rule.Anchor.prototype = pv.extend(pv.Bar.Anchor);
pv.Rule.Anchor.prototype.type = pv.Rule;

/**
 * The text-align property, for horizontal alignment outside the rule.
 *
 * @type string
 * @name pv.Rule.Anchor.prototype.textAlign
 */ /** @private */
pv.Rule.Anchor.prototype.$textAlign = function(d) {
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
 * The text-baseline property, for vertical alignment outside the rule.
 *
 * @type string
 * @name pv.Rule.Anchor.prototype.textBaseline
 */ /** @private */
pv.Rule.Anchor.prototype.$textBaseline = function(d) {
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
 * Returns the pseudo-width of the rule in pixels; read-only.
 *
 * @returns {number} the pseudo-width, in pixels.
 */
pv.Rule.prototype.width = function() {
  return this.scene[this.index].width;
};

/**
 * Returns the pseudo-height of the rule in pixels; read-only.
 *
 * @returns {number} the pseudo-height, in pixels.
 */
pv.Rule.prototype.height = function() {
  return this.scene[this.index].height;
};

/**
 * Overrides the default behavior of {@link Mark#buildImplied} to determine the
 * orientation (vertical or horizontal) of the rule.
 *
 * @param s a node in the scene graph; the instance of the rule to build.
 */
pv.Rule.prototype.buildImplied = function(s) {
  s.width = s.height = 0;

  /* Determine horizontal or vertical orientation. */
  var l = s.left, r = s.right, t = s.top, b = s.bottom;
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

/**
 * Updates the display for the specified rule instance <tt>s</tt> in the scene
 * graph. This implementation handles the stroke style for the rule, as well as
 * positional properties.
 *
 * @param s a node in the scene graph; the instance of the rule to update.
 */
pv.Rule.prototype.updateInstance = function(s) {
  var v = s.svg;

  /* Create the svg:line element, if necessary. */
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "line");
    s.parent.svg.appendChild(v);
  }

  /* visible, cursor, title, events, etc. */
  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  /* left, top */
  v.setAttribute("x1", s.left);
  v.setAttribute("y1", s.top);
  v.setAttribute("x2", s.left + s.width);
  v.setAttribute("y2", s.top + s.height);

  /* stroke TODO gradient, patterns, dashes */
  var stroke = pv.color(s.strokeStyle);
  v.setAttribute("stroke", stroke.color);
  v.setAttribute("stroke-opacity", stroke.opacity);
  v.setAttribute("stroke-width", s.lineWidth);
};
