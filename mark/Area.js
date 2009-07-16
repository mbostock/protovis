/**
 * Constructs a new area mark with default properties. Areas are not typically
 * constructed directly, but by adding to a panel or an existing mark via
 * {@link pv.Mark#add}.
 *
 * @class Represents an area mark: the solid area between two series of
 * connected line segments. Unsurprisingly, areas are used most frequently for
 * area charts.
 *
 * <p>Just as a line represents a polyline, the <tt>Area</tt> mark type
 * represents a <i>polygon</i>. However, an area is not an arbitrary polygon;
 * vertices are paired either horizontally or vertically into parallel
 * <i>spans</i>, and each span corresponds to an associated datum. Either the
 * width or the height must be specified, but not both; this determines whether
 * the area is horizontally-oriented or vertically-oriented.  Like lines, areas
 * can be stroked and filled with arbitrary colors.
 *
 * <p>See also the <a href="../../api/Area.html">Area guide</a>.
 *
 * @extends pv.Mark
 */
pv.Area = function() {
  pv.Mark.call(this);
};
pv.Area.prototype = pv.extend(pv.Mark);
pv.Area.prototype.type = pv.Area;

/**
 * Returns "area".
 *
 * @returns {string} "area".
 */
pv.Area.toString = function() { return "area"; };

/**
 * The width of a given span, in pixels; used for horizontal spans. If the width
 * is specified, the height property should be 0 (the default). Either the top
 * or bottom property should be used to space the spans vertically, typically as
 * a multiple of the index.
 *
 * @type number
 * @name pv.Area.prototype.width
 */
pv.Area.prototype.defineProperty("width");

/**
 * The height of a given span, in pixels; used for vertical spans. If the height
 * is specified, the width property should be 0 (the default). Either the left
 * or right property should be used to space the spans horizontally, typically
 * as a multiple of the index.
 *
 * @type number
 * @name pv.Area.prototype.height
 */
pv.Area.prototype.defineProperty("height");

/**
 * The width of stroked lines, in pixels; used in conjunction with
 * <tt>strokeStyle</tt> to stroke the perimeter of the area. Unlike the
 * {@link Line} mark type, the entire perimeter is stroked, rather than just one
 * edge. The default value of this property is 1.5, but since the default stroke
 * style is null, area marks are not stroked by default.
 *
 * <p>This property is <i>fixed</i>. See {@link pv.Mark}.
 *
 * @type number
 * @name pv.Area.prototype.lineWidth
 */
pv.Area.prototype.defineProperty("lineWidth");

/**
 * The style of stroked lines; used in conjunction with <tt>lineWidth</tt> to
 * stroke the perimeter of the area. Unlike the {@link Line} mark type, the
 * entire perimeter is stroked, rather than just one edge. The default value of
 * this property is null, meaning areas are not stroked by default.
 *
 * <p>This property is <i>fixed</i>. See {@link pv.Mark}.
 *
 * @type string
 * @name pv.Area.prototype.strokeStyle
 * @see pv.color
 */
pv.Area.prototype.defineProperty("strokeStyle");

/**
 * The area fill style; if non-null, the interior of the polygon forming the
 * area is filled with the specified color. The default value of this property
 * is a categorical color.
 *
 * <p>This property is <i>fixed</i>. See {@link pv.Mark}.
 *
 * @type string
 * @name pv.Area.prototype.fillStyle
 * @see pv.color
 */
pv.Area.prototype.defineProperty("fillStyle");

/**
 * Default properties for areas. By default, there is no stroke and the fill
 * style is a categorical color.
 *
 * @type pv.Area
 */
pv.Area.defaults = new pv.Area().extend(pv.Mark.defaults)
    .lineWidth(1.5)
    .fillStyle(pv.Colors.category20);

/**
 * Constructs a new area anchor with default properties.
 *
 * @class Represents an anchor for an area mark. Areas support five different
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
 * rendered to appear inside the area polygon.
 *
 * <p>To facilitate stacking of areas, the anchors are defined in terms of their
 * opposite edge. For example, the top anchor defines the bottom property, such
 * that the area grows upwards; the bottom anchor instead defines the top
 * property, such that the area grows downwards. Of course, in general it is
 * more robust to use panels and the cousin accessor to define stacked area
 * marks; see {@link pv.Mark#scene} for an example.
 *
 * @extends pv.Mark.Anchor
 */
pv.Area.Anchor = function() {
  pv.Mark.Anchor.call(this);
};
pv.Area.Anchor.prototype = pv.extend(pv.Mark.Anchor);
pv.Area.Anchor.prototype.type = pv.Area;

/**
 * The left property; null for "left" anchors, non-null otherwise.
 *
 * @type number
 * @name pv.Area.Anchor.prototype.left
 */ /** @private */
pv.Area.Anchor.prototype.$left = function() {
  var area = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return area.left() + area.width() / 2;
    case "right": return area.left() + area.width();
  }
  return null;
};

/**
 * The right property; null for "right" anchors, non-null otherwise.
 *
 * @type number
 * @name pv.Area.Anchor.prototype.right
 */ /** @private */
pv.Area.Anchor.prototype.$right = function() {
  var area = this.anchorTarget();
  switch (this.get("name")) {
    case "bottom":
    case "top":
    case "center": return area.right() + area.width() / 2;
    case "left": return area.right() + area.width();
  }
  return null;
};

/**
 * The top property; null for "top" anchors, non-null otherwise.
 *
 * @type number
 * @name pv.Area.Anchor.prototype.top
 */ /** @private */
pv.Area.Anchor.prototype.$top = function() {
  var area = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return area.top() + area.height() / 2;
    case "bottom": return area.top() + area.height();
  }
  return null;
};

/**
 * The bottom property; null for "bottom" anchors, non-null otherwise.
 *
 * @type number
 * @name pv.Area.Anchor.prototype.bottom
 */ /** @private */
pv.Area.Anchor.prototype.$bottom = function() {
  var area = this.anchorTarget();
  switch (this.get("name")) {
    case "left":
    case "right":
    case "center": return area.bottom() + area.height() / 2;
    case "top": return area.bottom() + area.height();
  }
  return null;
};

/**
 * The text-align property, for horizontal alignment inside the area.
 *
 * @type string
 * @name pv.Area.Anchor.prototype.textAlign
 */ /** @private */
pv.Area.Anchor.prototype.$textAlign = function() {
  switch (this.get("name")) {
    case "left": return "left";
    case "bottom":
    case "top":
    case "center": return "center";
    case "right": return "right";
  }
  return null;
};

/**
 * The text-baseline property, for vertical alignment inside the area.
 *
 * @type string
 * @name pv.Area.Anchor.prototype.textBasline
 */ /** @private */
pv.Area.Anchor.prototype.$textBaseline = function() {
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
 * Overrides the default behavior of {@link pv.Mark#buildImplied} such that the
 * width and height are set to zero if null.
 *
 * @param s a node in the scene graph; the instance of the mark to build.
 */
pv.Area.prototype.buildImplied = function(s) {
  if (s.height == null) s.height = 0;
  if (s.width == null) s.width = 0;
  pv.Mark.prototype.buildImplied.call(this, s);
};

/**
 * Override the default update implementation, since the area mark generates a
 * single graphical element rather than multiple distinct elements.
 */
pv.Area.prototype.update = function() {
  if (!this.scene.length) return;

  var s = this.scene[0], v = s.svg;
  if (s.visible) {

    /* Create the <svg:polygon> element, if necesary. */
    if (!v) {
      v = s.svg = document.createElementNS(pv.ns.svg, "polygon");
      s.parent.svg.appendChild(v);
    }

    /* points */
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
  }

  this.updateInstance(s);
};

/**
 * Updates the display for the (singleton) area instance. The area mark
 * generates a single graphical element rather than multiple distinct elements.
 *
 * <p>TODO Recompute points? For efficiency, the points (the span positions) are
 * not recomputed, and therefore cannot be updated automatically from event
 * handlers without an explicit call to rebuild the area.
 *
 * @param s a node in the scene graph; the area to update.
 */
pv.Area.prototype.updateInstance = function(s) {
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
