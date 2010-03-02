/**
 * Constructs a new line mark with default properties. Lines are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents a series of connected line segments, or <i>polyline</i>,
 * that can be stroked with a configurable color and thickness. Each
 * articulation point in the line corresponds to a datum; for <i>n</i> points,
 * <i>n</i>-1 connected line segments are drawn. The point is positioned using
 * the box model. Arbitrary paths are also possible, allowing radar plots and
 * other custom visualizations.
 *
 * <p>Like areas, lines can be stroked and filled with arbitrary colors. In most
 * cases, lines are only stroked, but the fill style can be used to construct
 * arbitrary polygons.
 *
 * <p>See also the <a href="../../api/Line.html">Line guide</a>.
 *
 * @extends pv.Mark
 */
pv.Line = function() {
  pv.Mark.call(this);
};

pv.Line.prototype = pv.extend(pv.Mark)
    .property("lineWidth", Number)
    .property("strokeStyle", pv.color)
    .property("fillStyle", pv.color)
    .property("segmented", Boolean)
    .property("interpolate", String);

pv.Line.prototype.type = "line";

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the line.
 *
 * @type number
 * @name pv.Line.prototype.lineWidth
 */

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the line. The default value of this property is a categorical color.
 *
 * @type string
 * @name pv.Line.prototype.strokeStyle
 * @see pv.color
 */

/**
 * The line fill style; if non-null, the interior of the line is closed and
 * filled with the specified color. The default value of this property is a
 * null, meaning that lines are not filled by default.
 *
 * @type string
 * @name pv.Line.prototype.fillStyle
 * @see pv.color
 */

/**
 * Whether the line is segmented; whether variations in stroke style, line width
 * and the other properties are treated as fixed. Rendering segmented lines is
 * noticeably slower than non-segmented lines.
 *
 * <p>This property is <i>fixed</i>. See {@link pv.Mark}.
 *
 * @type boolean
 * @name pv.Line.prototype.segmented
 */

/**
 * How to interpolate between values. Linear interpolation ("linear") is the
 * default, producing a straight line between points. For piecewise constant
 * functions (i.e., step functions), either "step-before" or "step-after" can be
 * specified. To draw a clockwise circular arc between points, specify "polar".
 *
 * <p>This property is <i>fixed</i>. See {@link pv.Mark}.
 *
 * @type string
 * @name pv.Line.prototype.interpolate
 */

/**
 * Default properties for lines. By default, there is no fill and the stroke
 * style is a categorical color. The default interpolation is linear.
 *
 * @type pv.Line
 */
pv.Line.prototype.defaults = new pv.Line()
    .extend(pv.Mark.prototype.defaults)
    .lineWidth(1.5)
    .strokeStyle(pv.Colors.category10().by(pv.parent))
    .interpolate("linear");

/** @private Reuse Area's implementation for segmented bind & build. */
pv.Line.prototype.bind = pv.Area.prototype.bind;
pv.Line.prototype.buildInstance = pv.Area.prototype.buildInstance;
