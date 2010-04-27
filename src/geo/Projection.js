/**
 * A projection class used by the <tt>pv.Geo.scale</tt>. There is no explicit
 * constructor corresponding to the class <tt>pv.Geo.Projection</tt>; this class
 * merely serves to document the projection interface. TODO describe in more
 * detail how projections map between {@link pv.Geo.LatLng} and {@link
 * pv.Vector} in [-1,1].
 *
 * @class
 * @name pv.Geo.Projection
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
 * @param {pv.Vector} point the x- and y-coordinates to invert.
 * @returns {pv.Geo.LatLng} the latitude and longitude of the given point.
 */
