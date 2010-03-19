/**
 * Returns the specified geographical projection. The arguments to this
 * constructor are optional, and equivalent to calling {@link #domain} .
 *
 * @class Represents a geographical scale. <style
 * type="text/css">sub{line-height:0}</style> A geographical scale represents the
 * mapping between longitude and latitude coordinates and their appropriate
 * positioning on the screen.
 *
 * By default the appropriate domain is inferred so as to map the entire world onto
 * the screen.
 *
 *
 * @param {pv.LatLng...} domain... domain values.
 * @returns {pv.Scale.geo} a geographical scale.
 */

pv.Geo.scale = function() {
  var tlp, brp, d = undefined, proj = pv.Geo.projections.identity, latlngLast = undefined, lastPoint;
  var xScale = pv.Scale.linear(-1, 1).range(0, 1);
  var yScale = pv.Scale.linear(-1, 1).range(0, 1);

  /** @private */
  function scale(latlng) {
    if(!latlngLast || latlng.lon != latlngLast.lon || latlng.lat != latlngLast.lat) {
      latlngLast = latlng;
      var p = proj.forward(latlng);
      lastPoint = new pv.Vector(xScale(p.x), yScale(p.y));
    }

    return lastPoint;
  }

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
   * @name pv.Scale.linear.prototype.invert
   * @param {number} y a value in the output range (a pixel location).
   * @returns {number} a value in the input domain.
   */
  scale.invert = function(p) {
    var p = {x:xScale.invert(p.x), y:yScale.invert(p.y)};
    return proj.inverse(p);
  };

  /**
   * Sets or gets the input domain. This method can be invoked several ways:
   *
   * <p>1. <tt>domain(values...)</tt>
   *
   * <p>Specifying the domain as a series of values is the most explicit and
   * recommended approach. However, if the domain values are derived from data,
   * you may find the second method more appropriate.
   *
   * <p>2. <tt>domain(array, f)</tt>
   *
   * <p>Rather than enumerating the domain values as explicit arguments to this
   * method, you can specify a single argument of an array. In addition, you can
   * specify an optional accessor function to extract the domain values from the
   * array.
   *
   * <p>3. <tt>domain()</tt>
   *
   * <p>Invoking the <tt>domain</tt> method with no arguments returns the
   * current domain as an array.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.domain
   * @param {...} domain... domain values.
   * @returns {pv.Scale.ordinal} <tt>this</tt>, or the current domain.
   */
  scale.domain = function(array, f) {
    if (arguments.length) {
      d = (array instanceof Array)
          ? ((arguments.length > 1) ? map(array, f) : array)
          : Array.prototype.slice.call(arguments);

      if(proj) {
        points = d.map(proj.forward);
        xScale.domain(points, function(p) { return p.x });
        yScale.domain(points, function(p) { return p.y });
      }
      lastLon = undefined; // invalidate the cache
      return this;
    }
    return d;
  };

  /**
   * Sets or gets the output range. This method can be invoked several ways:
   *
   * <p>1. <tt>range(topLeft, bottomRight)</tt>
   *
   * <p>Specifying the range as a series of values is the most explicit and
   * recommended approach. However, if the range values are derived from data,
   * you may find the second method more appropriate.
   *
   * <p>2. <tt>range()</tt>
   *
   * <p>Invoking the <tt>range</tt> method with no arguments returns the
   * current range as an array.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.range
   * @param {...} range... range values.
   * @returns {pv.Scale.ordinal} <tt>this</tt>, or the current range.
   */
  scale.range = function(tl, br) {
    if (arguments.length == 2) {
      tlp = tl;
      brp = br;
      xScale.range(tlp.x, brp.x);
        yScale.range(brp.y, tlp.y);
      lastLon = undefined; // invalidate the cache
      return this;
    }
    return [tlp, brp];
  };

  /**
   * Sets or gets the projection. This method can be invoked several ways:
   *
   * <p>1. <tt>projection(projectionString)</tt>
   *
   * <p>Specifying the inbuilt projection type as a string selects that projection
   * to be used.
   *
   * <p>2. <tt>projection(forward, inverse)</tt>
   *
   * <p>Passing a function defines that function to be the projection <i>forward</i> should map
   * a {@code pv.Scale.LatLng} object (in degrees) to a {@code pv.Vector}. An inverse function
   * can be provided as the second argument this function should map a {@code pv.Vector} to a
   * {@code pv.Scale.LatLng}. If no inverse is defined the identity function is used instead.
   *
   * <p>3. <tt>projection(proj4js)</tt>
   *
   * <p>An initialised PROJ4js projection object can be passed in.
   *
   * <p>4. <tt>projection()</tt>
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
    if(arguments.length) {
      proj = p;

      // reapply the domain
      if(d) this.domain(d);

      lastLon = undefined; // invalidate the cache
      return this;
    }
    return proj;
  };

  /**
   * Returns a view of this scale by the specified accessor function <tt>f</tt>.
   * Given a scale <tt>g</tt>, <tt>g.by(function(d) d.foo)</tt> is equivalent to
   * <tt>function(d) g(d.foo)</tt>. This method should be used judiciously; it
   * is typically more clear to invoke the scale directly, passing in the value
   * to be scaled.
   *
   * @function
   * @name pv.Scale.ordinal.prototype.by
   * @param {function} f an accessor function.
   * @returns {pv.Scale.ordinal} a view of this scale by the specified accessor
   * function.
   */
  scale.by = function(f) {
    function by() { return scale(f.apply(this, arguments)); }
    for (var method in scale) by[method] = scale[method];
    return by;
  };

  scale.domain.apply(scale, arguments);
  return scale;
};