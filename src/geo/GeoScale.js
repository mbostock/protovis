/**
 * Returns a geographic scale. The arguments to this constructor are optional,
 * and equivalent to calling {@link #projection}.
 *
 * @class Represents a geographic scale; a mapping between latitude-longitude
 * coordinates and screen pixel coordinates. By default, the domain is inferred
 * from the geographic coordinates, so that the domain fills the output range.
 *
 * <p>Note that geographic scales are two-dimensional transformations, rather
 * than the one-dimensional bidrectional mapping typical of other scales.
 * Rather than mapping (for example) between a numeric domain and a numeric
 * range, geographic scales map between two coordinate objects: {@link
 * pv.Geo.LatLng} and {@link pv.Vector}.
 *
 * @param {pv.Geo.Projection} [p] optional projection.
 * @see pv.Geo.scale#ticks
 */
pv.Geo.scale = function(p) {
  var rmin = {x: 0, y: 0}, // default range minimum
      rmax = {x: 1, y: 1}, // default range maximum
      d = [], // default domain
      j = pv.Geo.projections.identity, // domain <-> normalized range
      x = pv.Scale.linear(-1, 1).range(0, 1), // normalized <-> range
      y = pv.Scale.linear(-1, 1).range(1, 0), // normalized <-> range
      c = {lng: 0, lat: 0}, // Center Point
      lastLatLng, // cached latlng
      lastPoint; // cached point

  /** @private */
  function scale(latlng) {
    if (!lastLatLng
        || (latlng.lng != lastLatLng.lng)
        || (latlng.lat != lastLatLng.lat)) {
      lastLatLng = latlng;
      var p = project(latlng);
      lastPoint = {x: x(p.x), y: y(p.y)};
    }
    return lastPoint;
  }

  /** @private */
  function project(latlng) {
    var offset = {lng: latlng.lng - c.lng, lat: latlng.lat};
    return j.project(offset);
  }

  /** @private */
  function invert(xy) {
    var latlng = j.invert(xy);
    latlng.lng += c.lng;
    return latlng;
  }

  /** Returns the projected x-coordinate. */
  scale.x = function(latlng) {
    return scale(latlng).x;
  };

  /** Returns the projected y-coordinate. */
  scale.y = function(latlng) {
    return scale(latlng).y;
  };

  /**
   * Abstract; this is a local namespace on a given geographic scale.
   *
   * @namespace Tick functions for geographic scales. Because geographic scales
   * represent two-dimensional transformations (as opposed to one-dimensional
   * transformations typical of other scales), the tick values are similarly
   * represented as two-dimensional coordinates in the input domain, i.e.,
   * {@link pv.Geo.LatLng} objects.
   *
   * <p>Also, note that non-rectilinear projections, such as sinsuoidal and
   * aitoff, may not produce straight lines for constant longitude or constant
   * latitude. Therefore the returned array of ticks is a two-dimensional array,
   * sampling various latitudes as constant longitude, and vice versa.
   *
   * <p>The tick lines can therefore be approximated as polylines, either with
   * "linear" or "cardinal" interpolation. This is not as accurate as drawing
   * the true curve through the projection space, but is usually sufficient.
   *
   * @name pv.Geo.scale.prototype.ticks
   * @see pv.Geo.scale
   * @see pv.Geo.LatLng
   * @see pv.Line#interpolate
   */
  scale.ticks = {

    /**
     * Returns longitude ticks.
     *
     * @function
     * @param {number} [m] the desired number of ticks.
     * @returns {array} a nested array of <tt>pv.Geo.LatLng</tt> ticks.
     * @name pv.Geo.scale.prototype.ticks.prototype.lng
     */
    lng: function(m) {
      var lat, lng;
      if (d.length > 1) {
        var s = pv.Scale.linear();
        if (m == undefined) m = 10;
        lat = s.domain(d, function(d) { return d.lat; }).ticks(m);
        lng = s.domain(d, function(d) { return d.lng; }).ticks(m);
      } else {
        lat = pv.range(-80, 81, 10);
        lng = pv.range(-180, 181, 10);
      }
      return lng.map(function(lng) {
        return lat.map(function(lat) {
          return {lat: lat, lng: lng};
        });
      });
    },

    /**
     * Returns latitude ticks.
     *
     * @function
     * @param {number} [m] the desired number of ticks.
     * @returns {array} a nested array of <tt>pv.Geo.LatLng</tt> ticks.
     * @name pv.Geo.scale.prototype.ticks.prototype.lat
     */
    lat: function(m) {
      return pv.transpose(scale.ticks.lng(m));
    }
  };

  /**
   * Inverts the specified value in the output range, returning the
   * corresponding value in the input domain. This is frequently used to convert
   * the mouse location (see {@link pv.Mark#mouse}) to a value in the input
   * domain. Inversion is only supported for numeric ranges, and not colors.
   *
   * <p>Note that this method does not do any rounding or bounds checking. If
   * the input domain is discrete (e.g., an array index), the returned value
   * should be rounded. If the specified <tt>y</tt> value is outside the range,
   * the returned value may be equivalently outside the input domain.
   *
   * @function
   * @name pv.Geo.scale.prototype.invert
   * @param {number} y a value in the output range (a pixel location).
   * @returns {number} a value in the input domain.
   */
  scale.invert = function(p) {
    return invert({x: x.invert(p.x), y: y.invert(p.y)});
  };

  /**
   * Sets or gets the input domain. Note that unlike quantitative scales, the
   * domain cannot be reduced to a simple rectangle (i.e., minimum and maximum
   * values for latitude and longitude). Instead, the domain values must be
   * projected to normalized space, effectively finding the domain in normalized
   * space rather than in terms of latitude and longitude. Thus, changing the
   * projection requires recomputing the normalized domain.
   *
   * <p>This method can be invoked several ways:
   *
   * <p>1. <tt>domain(values...)</tt>
   *
   * <p>Specifying the domain as a series of {@link pv.Geo.LatLng}s is the most
   * explicit and recommended approach. However, if the domain values are
   * derived from data, you may find the second method more appropriate.
   *
   * <p>2. <tt>domain(array, f)</tt>
   *
   * <p>Rather than enumerating the domain explicitly, you can specify a single
   * argument of an array. In addition, you can specify an optional accessor
   * function to extract the domain values (as {@link pv.Geo.LatLng}s) from the
   * array. If the specified array has fewer than two elements, this scale will
   * default to the full normalized domain.
   *
   * <p>2. <tt>domain()</tt>
   *
   * <p>Invoking the <tt>domain</tt> method with no arguments returns the
   * current domain as an array.
   *
   * @function
   * @name pv.Geo.scale.prototype.domain
   * @param {...} domain... domain values.
   * @returns {pv.Geo.scale} <tt>this</tt>, or the current domain.
   */
  scale.domain = function(array, f) {
    if (arguments.length) {
      d = (array instanceof Array)
          ? ((arguments.length > 1) ? pv.map(array, f) : array)
          : Array.prototype.slice.call(arguments);
      if (d.length > 1) {
        var lngs = d.map(function(c) { return c.lng; });
        var lats = d.map(function(c) { return c.lat; });
        c = {
          lng: (pv.max(lngs) + pv.min(lngs)) / 2,
          lat: (pv.max(lats) + pv.min(lats)) / 2
        };
        var n = d.map(project); // normalized domain
        x.domain(n, function(p) { return p.x; });
        y.domain(n, function(p) { return p.y; });
      } else {
        c = {lng: 0, lat: 0};
        x.domain(-1, 1);
        y.domain(-1, 1);
      }
      lastLatLng = null; // invalidate the cache
      return this;
    }
    return d;
  };

  /**
   * Sets or gets the output range. This method can be invoked several ways:
   *
   * <p>1. <tt>range(min, max)</tt>
   *
   * <p>If two objects are specified, the arguments should be {@link pv.Vector}s
   * which specify the minimum and maximum values of the x- and y-coordinates
   * explicitly.
   *
   * <p>2. <tt>range(width, height)</tt>
   *
   * <p>If two numbers are specified, the arguments specify the maximum values
   * of the x- and y-coordinates explicitly; the minimum values are implicitly
   * zero.
   *
   * <p>3. <tt>range()</tt>
   *
   * <p>Invoking the <tt>range</tt> method with no arguments returns the current
   * range as an array of two {@link pv.Vector}s: the minimum (top-left) and
   * maximum (bottom-right) values.
   *
   * @function
   * @name pv.Geo.scale.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Geo.scale} <tt>this</tt>, or the current range.
   */
  scale.range = function(min, max) {
    if (arguments.length) {
      if (typeof min == "object") {
        rmin = {x: Number(min.x), y: Number(min.y)};
        rmax = {x: Number(max.x), y: Number(max.y)};
      } else {
        rmin = {x: 0, y: 0};
        rmax = {x: Number(min), y: Number(max)};
      }
      x.range(rmin.x, rmax.x);
      y.range(rmax.y, rmin.y); // XXX flipped?
      lastLatLng = null; // invalidate the cache
      return this;
    }
    return [rmin, rmax];
  };

  /**
   * Sets or gets the projection. This method can be invoked several ways:
   *
   * <p>1. <tt>projection(string)</tt>
   *
   * <p>Specifying a string sets the projection to the given named projection in
   * {@link pv.Geo.projections}. If no such projection is found, the identity
   * projection is used.
   *
   * <p>2. <tt>projection(object)</tt>
   *
   * <p>Specifying an object sets the projection to the given custom projection,
   * which must implement the <i>forward</i> and <i>inverse</i> methods per the
   * {@link pv.Geo.Projection} interface.
   *
   * <p>3. <tt>projection()</tt>
   *
   * <p>Invoking the <tt>projection</tt> method with no arguments returns the
   * current object that defined the projection.
   *
   * @function
   * @name pv.Scale.geo.prototype.projection
   * @param {...} range... range values.
   * @returns {pv.Scale.geo} <tt>this</tt>, or the current range.
   */
  scale.projection = function(p) {
    if (arguments.length) {
      j = typeof p == "string"
          ? pv.Geo.projections[p] || pv.Geo.projections.identity
          : p;
      return this.domain(d); // recompute normalized domain
    }
    return p;
  };

  /**
   * Returns a view of this scale by the specified accessor function <tt>f</tt>.
   * Given a scale <tt>g</tt>, <tt>g.by(function(d) d.foo)</tt> is equivalent to
   * <tt>function(d) g(d.foo)</tt>. This method should be used judiciously; it
   * is typically more clear to invoke the scale directly, passing in the value
   * to be scaled.
   *
   * @function
   * @name pv.Geo.scale.prototype.by
   * @param {function} f an accessor function.
   * @returns {pv.Geo.scale} a view of this scale by the specified accessor
   * function.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  if (arguments.length) scale.projection(p);
  return scale;
};
