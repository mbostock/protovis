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
pv.Rule.prototype.type = "rule";

/**
 * The width of the rule, in pixels. If the left position is specified, the rule
 * extends rightward from the left edge; if the right position is specified, the
 * rule extends leftward from the right edge.
 *
 * @type number
 * @name pv.Rule.prototype.width
 */
pv.Rule.prototype.defineProperty("width");

/**
 * The height of the rule, in pixels. If the bottom position is specified, the
 * rule extends upward from the bottom edge; if the top position is specified,
 * the rule extends downward from the top edge.
 *
 * @type number
 * @name pv.Rule.prototype.height
 */
pv.Rule.prototype.defineProperty("height");

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
pv.Rule.prototype.defaults = new pv.Rule()
    .extend(pv.Mark.prototype.defaults)
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
pv.Rule.prototype.Anchor = pv.Rule.Anchor;
pv.Rule.Anchor.prototype = pv.extend(pv.Bar.Anchor);

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
 * Overrides the default behavior of {@link Mark#buildImplied} to determine the
 * orientation (vertical or horizontal) of the rule.
 *
 * @param s a node in the scene graph; the instance of the rule to build.
 */
pv.Rule.prototype.buildImplied = function(s) {
  var l = s.left, r = s.right, t = s.top, b = s.bottom;

  /* Determine horizontal or vertical orientation. */
  if ((s.width != null)
      || ((l == null) && (r == null))
      || ((r != null) && (l != null))) {
    s.height = 0;
  } else {
    s.width = 0;
  }

  pv.Mark.prototype.buildImplied.call(this, s);
};
