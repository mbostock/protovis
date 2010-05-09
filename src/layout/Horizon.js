/**
 * Constructs a new, empty horizon layout. Layouts are not typically constructed
 * directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implements a horizon layout, which is a variation of a single-series
 * area chart where the area is folded into multiple bands. Color is used to
 * encode band, allowing the size of the chart to be reduced significantly
 * without impeding readability. This layout algorithm is based on the work of
 * J. Heer, N. Kong and M. Agrawala in <a
 * href="http://hci.stanford.edu/publications/2009/heer-horizon-chi09.pdf">"Sizing
 * the Horizon: The Effects of Chart Size and Layering on the Graphical
 * Perception of Time Series Visualizations"</a>, CHI 2009.
 *
 * <p>This layout exports a single <tt>band</tt> mark prototype, which is
 * intended to be used with an area mark. The band mark is contained in a panel
 * which is replicated per band (and for negative/positive bands). For example,
 * to create a simple horizon graph given an array of numbers:
 *
 * <pre>vis.add(pv.Layout.Horizon)
 *     .bands(n)
 *   .band.add(pv.Area)
 *     .data(data)
 *     .left(function() this.index * 35)
 *     .height(function(d) d * 40);</pre>
 *
 * The layout can be further customized by changing the number of bands, and
 * toggling whether the negative bands are mirrored or offset. (See the
 * above-referenced paper for guidance.)
 *
 * <p>The <tt>fillStyle</tt> of the area can be overridden, though typically it
 * is easier to customize the layout's behavior through the custom
 * <tt>backgroundStyle</tt>, <tt>positiveStyle</tt> and <tt>negativeStyle</tt>
 * properties. By default, the background is white, positive bands are blue, and
 * negative bands are red. For the most accurate presentation, use fully-opaque
 * colors of equal intensity for the negative and positive bands.
 *
 * @extends pv.Layout
 */
pv.Layout.Horizon = function() {
  pv.Layout.call(this);
  var that = this,
      bands, // cached bands
      mode, // cached mode
      size, // cached height
      fill, // cached background style
      red, // cached negative color (ramp)
      blue, // cached positive color (ramp)
      buildImplied = this.buildImplied;

  /** @private Cache the layout state to optimize properties. */
  this.buildImplied = function(s) {
    buildImplied.call(this, s);
    bands = s.bands;
    mode = s.mode;
    size = Math.round((mode == "color" ? .5 : 1) * s.height);
    fill = s.backgroundStyle;
    red = pv.ramp(fill, s.negativeStyle).domain(0, bands);
    blue = pv.ramp(fill, s.positiveStyle).domain(0, bands);
  };

  var bands = new pv.Panel()
      .data(function() { return pv.range(bands * 2); })
      .overflow("hidden")
      .height(function() { return size; })
      .top(function(i) { return mode == "color" ? (i & 1) * size : 0; })
      .fillStyle(function(i) { return i ? null : fill; });

  /**
   * The band prototype. This prototype is intended to be used with an Area
   * mark to render the horizon bands.
   *
   * @type pv.Mark
   * @name pv.Layout.Horizon.prototype.band
   */
  this.band = new pv.Mark()
      .top(function(d, i) {
          return mode == "mirror" && i & 1
              ? (i + 1 >> 1) * size
              : null;
        })
      .bottom(function(d, i) {
          return mode == "mirror"
              ? (i & 1 ? null : (i + 1 >> 1) * -size)
              : ((i & 1 || -1) * (i + 1 >> 1) * size);
        })
      .fillStyle(function(d, i) {
          return (i & 1 ? red : blue)((i >> 1) + 1);
        });

  this.band.add = function(type) {
    return that.add(pv.Panel).extend(bands).add(type).extend(this);
  };
};

pv.Layout.Horizon.prototype = pv.extend(pv.Layout)
    .property("bands", Number)
    .property("mode", String)
    .property("backgroundStyle", pv.color)
    .property("positiveStyle", pv.color)
    .property("negativeStyle", pv.color);

/**
 * Default properties for horizon layouts. By default, there are two bands, the
 * mode is "offset", the background style is "white", the positive style is
 * blue, negative style is red.
 *
 * @type pv.Layout.Horizon
 */
pv.Layout.Horizon.prototype.defaults = new pv.Layout.Horizon()
    .extend(pv.Layout.prototype.defaults)
    .bands(2)
    .mode("offset")
    .backgroundStyle("white")
    .positiveStyle("#1f77b4")
    .negativeStyle("#d62728");

/**
 * The horizon mode: offset, mirror, or color. The default is "offset".
 *
 * @type string
 * @name pv.Layout.Horizon.prototype.mode
 */

/**
 * The number of bands. Must be at least one. The default value is two.
 *
 * @type number
 * @name pv.Layout.Horizon.prototype.bands
 */

/**
 * The positive band color; if non-null, the interior of positive bands are
 * filled with the specified color. The default value of this property is blue.
 * For accurate blending, this color should be fully opaque.
 *
 * @type pv.Color
 * @name pv.Layout.Horizon.prototype.positiveStyle
 */

/**
 * The negative band color; if non-null, the interior of negative bands are
 * filled with the specified color. The default value of this property is red.
 * For accurate blending, this color should be fully opaque.
 *
 * @type pv.Color
 * @name pv.Layout.Horizon.prototype.negativeStyle
 */

/**
 * The background color. The panel background is filled with the specified
 * color, and the negative and positive bands are filled with an interpolated
 * color between this color and the respective band color. The default value of
 * this property is white. For accurate blending, this color should be fully
 * opaque.
 *
 * @type pv.Color
 * @name pv.Layout.Horizon.prototype.backgroundStyle
 */
