/**
 * Abstract; not implemented. There is no explicit constructor; this class
 * merely serves to document the representation used by {@link pv.Geo.scale}.
 *
 * @class Represents a geographic projection. This class provides the core
 * implementation for {@link pv.Geo.scale}s, mapping between geographic
 * coordinates (latitude and longitude) and normalized screen space in the range
 * [-1,1]. The remaining mapping between normalized screen space and actual
 * pixels is performed by <tt>pv.Geo.scale</tt>.
 *
 * <p>Many geographic projections have a point around which the projection is
 * centered. Rather than have each implementation add support for a
 * user-specified center point, the <tt>pv.Geo.scale</tt> translates the
 * geographic coordinates relative to the center point for both the forward and
 * inverse projection.
 *
 * <p>In general, this class should not be used directly, unless the desire is
 * to implement a new geographic projection. Instead, use <tt>pv.Geo.scale</tt>.
 * Implementations are not required to implement inverse projections, but are
 * needed for some forms of interactivity. Also note that some inverse
 * projections are ambiguous, such as the connecting points in Dymaxian maps.
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
