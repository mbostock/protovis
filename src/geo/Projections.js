/**
 * The built-in projections.
 *
 * @see pv.Geo.Projection
 * @namespace
 */
pv.Geo.projections = {

  /** @see http://en.wikipedia.org/wiki/Mercator_projection */
  mercator: {
    project: function(latlng) {
      return {
          x: latlng.lng / 180,
          y: latlng.lat > 85 ? 1 : latlng.lat < -85 ? -1
              : Math.log(Math.tan(Math.PI / 4
              + pv.radians(latlng.lat) / 2)) / Math.PI
        };
    },
    invert: function(xy) {
      return {
          lng: xy.x * 180,
          lat: pv.degrees(2 * Math.atan(Math.exp(xy.y * Math.PI)) - Math.PI / 2)
        };
    }
  },

  /** @see http://en.wikipedia.org/wiki/Gall-Peters_projection */
  "gall-peters": {
    project: function(latlng) {
      return {
          x: latlng.lng / 180,
          y: Math.sin(pv.radians(latlng.lat))
        };
    },
    invert: function(xy) {
      return {
          lng: xy.x * 180,
          lat: pv.degrees(Math.asin(xy.y))
        };
    }
  },

  /** @see http://en.wikipedia.org/wiki/Sinusoidal_projection */
  sinusoidal: {
    project: function(latlng) {
      return {
          x: pv.radians(latlng.lng) * Math.cos(pv.radians(latlng.lat)) / Math.PI,
          y: latlng.lat / 90
        };
    },
    invert: function(xy) {
      return {
          lng: pv.degrees((xy.x * Math.PI) / Math.cos(xy.y * Math.PI / 2)),
          lat: xy.y * 90
        };
    }
  },

  /** @see http://en.wikipedia.org/wiki/Aitoff_projection */
  aitoff: {
    project: function(latlng) {
      var l = pv.radians(latlng.lng),
          f = pv.radians(latlng.lat),
          a = Math.acos(Math.cos(f) * Math.cos(l / 2));
      return {
          x: 2 * (a ? (Math.cos(f) * Math.sin(l / 2) * a / Math.sin(a)) : 0) / Math.PI,
          y: 2 * (a ? (Math.sin(f) * a / Math.sin(a)) : 0) / Math.PI
        };
    },
    invert: function(xy) {
      var x = xy.x * Math.PI / 2,
          y = xy.y * Math.PI / 2;
      return {
          lng: pv.degrees(x / Math.cos(y)),
          lat: pv.degrees(y)
        };
    }
  },

  /** @see http://en.wikipedia.org/wiki/Hammer_projection */
  hammer: {
    project: function(latlng) {
      var l = pv.radians(latlng.lng),
          f = pv.radians(latlng.lat),
          c = Math.sqrt(1 + Math.cos(f) * Math.cos(l / 2));
      return {
          x: 2 * Math.SQRT2 * Math.cos(f) * Math.sin(l / 2) / c / 3,
          y: Math.SQRT2 * Math.sin(f) / c / 1.5
        };
    },
    invert: function(xy) {
      var x = xy.x * 3,
          y = xy.y * 1.5,
          z = Math.sqrt(1 - x * x / 16 - y * y / 4);
      return {
          lng: pv.degrees(2 * Math.atan2(z * x, 2 * (2 * z * z - 1))),
          lat: pv.degrees(Math.asin(z * y))
        };
    }
  },

  /** The identity or "none" projection. */
  identity: {
    project: function(latlng) {
      return {
          x: latlng.lng / 180,
          y: latlng.lat / 90
        };
    },
    invert: function(xy) {
      return {
          lng: xy.x * 180,
          lat: xy.y * 90
        };
    }
  }
};
