/**
 * A projection class used by the {@code pv.Geo.scale}. There is no explicit
 * constructor corresponding to the class {@code pv.Geo.Projection}; this class
 * merely serves to document the projection interface. TODO describe in more
 * detail how projections map between {@link pv.Geo.LatLng} and {@link
 * pv.Vector} in [-1,1].
 *
 * @class
 */

/**
 * The <i>forward</i> projection.
 *
 * @type function
 * @field pv.Geo.Projection.prototype.project
 * @param {pv.Geo.LatLng} latlng the latitude and longitude to project.
 * @param {pv.Vector} the xy-coordinates of the given point.
 */

/**
 * The <i>inverse</i> projection; optional.
 *
 * @type function
 * @field pv.Geo.Projection.prototype.invert
 * @param {pv.Vector} point the x- and y-coordinates to invert.
 * @returns {pv.Geo.LatLng} the latitude and longitude of the given point.
 */
