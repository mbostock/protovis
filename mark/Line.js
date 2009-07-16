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
pv.Line.prototype = pv.extend(pv.Mark);
pv.Line.prototype.type = pv.Line;

/**
 * Returns "line".
 *
 * @returns {string} "line".
 */
pv.Line.toString = function() { return "line"; };

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the line.
 *
 * @type number
 * @name pv.Line.prototype.lineWidth
 */
pv.Line.prototype.defineProperty("lineWidth");

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the line. The default value of this property is a categorical color.
 *
 * @type string
 * @name pv.Line.prototype.strokeStyle
 * @see pv.color
 */
pv.Line.prototype.defineProperty("strokeStyle");

/**
 * The line fill style; if non-null, the interior of the line is closed and
 * filled with the specified color. The default value of this property is a
 * null, meaning that lines are not filled by default.
 *
 * @type string
 * @name pv.Line.prototype.fillStyle
 * @see pv.color
 */
pv.Line.prototype.defineProperty("fillStyle");

/**
 * Default properties for lines. By default, there is no fill and the stroke
 * style is a categorical color.
 *
 * @type pv.Line
 */
pv.Line.defaults = new pv.Line().extend(pv.Mark.defaults)
    .lineWidth(1.5)
    .strokeStyle(pv.Colors.category10);

/**
 * Override the default update implementation, since the line mark generates a
 * single graphical element rather than multiple distinct elements.
 */
pv.Line.prototype.update = function() {
  if (!this.scene.length) return;

  /* visible */
  var s = this.scene[0], v = s.svg;
  if (s.visible) {

    /* Create the svg:polyline element, if necessary. */
    if (!v) {
      v = s.svg = document.createElementNS(pv.ns.svg, "polyline");
      s.parent.svg.appendChild(v);
    }

    /* left, top TODO allow points to be changed on events? */
    var p = "";
    for (var i = 0; i < this.scene.length; i++) {
      var si = this.scene[i];
      if (isNaN(si.left)) si.left = 0;
      if (isNaN(si.top)) si.top = 0;
      p += si.left + "," + si.top + " ";
    }
    v.setAttribute("points", p);

    /* cursor, title, events, etc. */
    this.updateInstance(s);
    v.removeAttribute("display");
  } else if (v) {
    v.setAttribute("display", "none");
  }
};

/**
 * Updates the display for the (singleton) line instance. The line mark
 * generates a single graphical element rather than multiple distinct elements.
 *
 * <p>TODO Recompute points? For efficiency, the points are not recomputed, and
 * therefore cannot be updated automatically from event handlers without an
 * explicit call to rebuild the line.
 *
 * @param s a node in the scene graph; the instance of the mark to update.
 */
pv.Line.prototype.updateInstance = function(s) {
  var v = s.svg;

  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  /* fill, stroke TODO gradient, patterns */
  var fill = pv.color(s.fillStyle);
  v.setAttribute("fill", fill.color);
  v.setAttribute("fill-opacity", fill.opacity);
  var stroke = pv.color(s.strokeStyle);
  v.setAttribute("stroke", stroke.color);
  v.setAttribute("stroke-opacity", stroke.opacity);
  v.setAttribute("stroke-width", s.lineWidth);
};
