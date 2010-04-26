/**
 * @class
 * @extends pv.Layout
 * @constructor
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
