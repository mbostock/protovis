/**
 * Abstract; not implemented. There is no explicit constructor; this class
 * merely serves to document the representation used by {@link pv.Geo.scale}.
 *
 * @class Represents a geographic projection.
 *
 * TODO describe in more detail how
 * projections map between {@link pv.Geo.LatLng} and {@link pv.Vector} in
 * [-1,1].
 *
 * @name pv.Geo.Projection
 * @see pv.Geo.scale
 */

/**
 * The <i>forward</i> projection.
 *
 * @function
 * @name pv.Geo.Projection.prototype.project
 * @param {pv.Geo.LatLng} latlng the latitude and longitude to project.
 * @returns {pv.Vector} the xy-coordinates of the given point.
 */

/**
 * The <i>inverse</i> projection; optional.
 *
 * @function
 * @name pv.Geo.Projection.prototype.invert
 * @param {pv.Vector} xy the x- and y-coordinates to invert.
 * @returns {pv.Geo.LatLng} the latitude and longitude of the given point.
 */
