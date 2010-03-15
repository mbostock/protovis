/**
 * A projection class used by the {@code pv.Geo.scale}. There is no
 * explicit constructor corresponding to the class {@code pv.Geo.Projection}; this
 * class merely serves to document the attributes that are present in a projection
 * description
 *
 * @class pv.Geo.Projection
 */

pv.Geo.Projection = function() {}

/**
 * The <i>forward</i> projection. This function should map a {@code pv.Scale.LatLng}
 * object (in degrees) to a {@code pv.Vector}.
 *
 * @type function
 * @field pv.Geo.Projection.prototype.forward
 */

/**
 * The <i>inverse</i> projection. This function should map a {@code pv.Vector} to a
 * {@code pv.Scale.LatLng}.
 *
 * @type function
 * @field pv.Geo.Projection.prototype.inverse
 */

pv.Geo.Projection.fromProj4 = function(proj4) {
  return {
    forward: function(latlng) {
      var xy = {x:pv.Geo.radians(latlng.lon), y:pv.Geo.radians(latlng.lat)};
      proj4.forward(xy);
      return xy;
    },
    inverse: function(xy) {
      var pt = {x:xy.x, y:xy.y};
      proj4.inverse(pt);
      return {lon:pv.Geo.degrees(pt.x), lat:pv.Geo.degrees(pt.y)};
    }
  }
}