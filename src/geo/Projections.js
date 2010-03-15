/* Contains the list of in-built forward projections */
pv.Geo.projections = {
  "mercator": {
    forward: function(latlng) {
      var f = pv.Geo.radians(latlng.lat);
      return {
        x:(latlng.lon / 180),
        y:((Math.log(Math.tan(Math.PI / 4 + f / 2))) / Math.PI)
      };
    },
    inverse: function(xy) {
      return {
        lon:xy.x * 180,
        lat:pv.Geo.degrees(2 * Math.atan(Math.exp(xy.y * Math.PI)) - Math.PI / 2)
      };
    }
  },

  "gall-peters": {
    forward: function(latlng) {
      var l = pv.Geo.radians(latlng.lon);
      var f = pv.Geo.radians(latlng.lat);
      return {
        x:(latlng.lon / 180),
        y:(Math.sin(f))
      };
    },
    inverse: function(xy) {
      return {
        lon:xy.x * 180,
        lat:pv.Geo.degrees(Math.asin(xy.y))
      };
    }
  },

  "sinusoidal": {
    forward: function(latlng) {
      var l = pv.Geo.radians(latlng.lon);
      var f = pv.Geo.radians(latlng.lat);
      return {
        x:((l) * Math.cos(f)) / Math.PI,
        y:(latlng.lat / 90)
      };
    },
    inverse: function(xy) {
      return {
        lon:pv.Geo.degrees((xy.x * Math.PI) / Math.cos(xy.y * Math.PI / 2)),
        lat:xy.y * 90
      };
    }
  },

  "aitoff": {
    forward: function(latlng) {
      var l = pv.Geo.radians(latlng.lon);
      var f = pv.Geo.radians(latlng.lat);
      var a = Math.acos(Math.cos(f) * Math.cos(l / 2));
      return {
        x:(a != 0.0 ? (Math.cos(f) * Math.sin(l / 2) * a / Math.sin(a)) : 0) / (Math.PI / 2),
        y:(a != 0.0 ? (Math.sin(f) * a / Math.sin(a)) : 0) / (Math.PI / 2)
      };
    },
    inverse: function(xy) {
      var x = xy.x * (Math.PI / 2);
      var y = xy.y * (Math.PI / 2);
      return {
        lon:pv.Geo.degrees(x / Math.cos(y)),
        lat:pv.Geo.degrees(y)
      };
    }
  },

  "hammer": {
    forward: function(latlng) {
      var l = pv.Geo.radians(latlng.lon);
      var f = pv.Geo.radians(latlng.lat);
      var C = Math.sqrt(1 + Math.cos(f) * Math.cos(l / 2));
      return {
        x:(2 * Math.SQRT2 * Math.cos(f) * Math.sin(l / 2) / C) / 3,
        y:(Math.SQRT2 * Math.sin(f) / C) / 1.5
      };
    },
    inverse: function(xy) {
      var x = xy.x * 3;
      var y = xy.y * 1.5;
      var z = Math.sqrt(1 - x * x / 16 - y * y / 4);
      return {
        lon:pv.Geo.degrees(2 * Math.atan2(z * x, 2 * (2 * z * z - 1))),
        lat:pv.Geo.degrees(Math.asin(z * y))
      };
    }
  },

  "identity": {
    forward: function(latlng) {
      return {
        x:(latlng.lon / 180),
        y:(latlng.lat / 90)
      };
    },
    inverse: function(xy) {
      return {
        lon:xy.x * 180,
        lat:xy.y * 90
      };
    }
  }
};
