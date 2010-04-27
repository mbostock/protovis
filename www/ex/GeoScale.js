/**
 * Returns an ordinal scale for the specified domain. The arguments to this
 * constructor are optional, and equivalent to calling {@link #domain}.
 *
 * @class Represents an ordinal scale. <style
 * type="text/css">sub{line-height:0}</style> An ordinal scale represents a
 * pairwise mapping from <i>n</i> discrete values in the input domain to
 * <i>n</i> discrete values in the output range. For example, an ordinal scale
 * might map a domain of species ["setosa", "versicolor", "virginica"] to colors
 * ["red", "green", "blue"]. Thus, saying
 *
 * <pre>.fillStyle(function(d) {
 *     switch (d.species) {
 *       case "setosa": return "red";
 *       case "versicolor": return "green";
 *       case "virginica": return "blue";
 *     }
 *   })</pre>
 *
 * is equivalent to
 *
 * <pre>.fillStyle(pv.Scale.ordinal("setosa", "versicolor", "virginica")
 *     .range("red", "green", "blue")
 *     .by(function(d) d.species))</pre>
 *
 * If the mapping from species to color does not need to be specified
 * explicitly, the domain can be omitted. In this case it will be inferred
 * lazily from the data:
 *
 * <pre>.fillStyle(pv.colors("red", "green", "blue")
 *     .by(function(d) d.species))</pre>
 *
 * When the domain is inferred, the first time the scale is invoked, the first
 * element from the range will be returned. Subsequent calls with unique values
 * will return subsequent elements from the range. If the inferred domain grows
 * larger than the range, range values will be reused. However, it is strongly
 * recommended that the domain and the range contain the same number of
 * elements.
 *
 * <p>A range can be discretized from a continuous interval (e.g., for pixel
 * positioning) by using {@link #split}, {@link #splitFlush} or
 * {@link #splitBanded} after the domain has been set. For example, if
 * <tt>states</tt> is an array of the fifty U.S. state names, the state name can
 * be encoded in the left position:
 *
 * <pre>.left(pv.Scale.ordinal(states)
 *     .split(0, 640)
 *     .by(function(d) d.state))</pre>
 *
 * <p>N.B.: ordinal scales are not invertible (at least not yet), since the
 * domain and range and discontinuous. A workaround is to use a linear scale.
 *
 * @param {...} domain... domain values.
 * @returns {pv.Scale.ordinal} an ordinal scale.
 * @see pv.colors
 */
pv.Scale.geo = function() {
  var tlp, brp, i = {}, r = [], rad = false, proj, projFn, invFn, lastLon = 100000, lastLat = 100000, lastPoint;
  var xScale = pv.Scale.linear(0, 1).range(0, 1);
  var yScale = pv.Scale.linear(-1, 1).range(0, 1);
  
  /** @private */
  function scale(lon, lat) {
    if(lon != lastLon || lat != lastLat) {
      lastLon = lon; lastLat = lat;
      var p = project(lon, lat);
      lastPoint = {x:xScale(p.x), y:yScale(p.y)};
    }
	
    return lastPoint;
  }
  
  /** @private */
  function project(lon, lat) {
    if(!rad) {
      lon = radians(lon);
      lat = radians(lat);
    }
    return projFn(lon, lat);
  }
  
  
  /** @private */
  function mercator(l, f) {
    return {
  	  x:(l),
  	  y:((Math.log(Math.tan(Math.PI/4 + f/2))))
    };
  };
  
  /** @private */
  function mercatorInv(x, y) {
    return {
  	  l:(x),
  	  f:(2 * Math.atan(Math.exp(y)) - Math.PI/2)
    };
  };

  /** @private */
  function gallPeters(l, f) {
    return {
  	  x:(l),
  	  y:(Math.sin(f))
    };
  };
  
  /** @private */
  function gallPetersInv(x, y) {
    return {
  	  l:(x),
  	  f:(Math.asin(y))
    };
  };  

  /** @private */
  function sinusoidal(l, f) {
    return {
  	  x:((l - 0) * Math.cos(f)),
  	  y:(f)
    };
  };
  
  /** @private */
  function sinusoidalInv(x, y) {
    return {
  	  l:(0 + x/Math.cos(y)),
  	  f:(y)
    };
  };

  /** @private */
  function hammer(l, f) {
    var C = Math.sqrt(1 + Math.cos(f) * Math.cos(l/2));
    return {
  	  x:(2 * Math.SQRT2 * Math.cos(f) * Math.sin(l/2) / C),
  	  y:(Math.SQRT2 * Math.sin(f) / C)
    };
  };
  
  /** @private */
  function hammerInv(x, y) {
    var z = Math.sqrt(1 - x*x/16 - y*y/4);
    return {
  	  l:(2 * Math.atan2(z*x, 2*(2*z*z - 1))),
  	  f:(Math.asin(z*y))
    };
  };
  
  /** @private */
  function none(l, f) {
    return {
  	  x:(l),
  	  y:(f)
    };
  };
  
  /** @private */
  function noneInv(x, y) {
    return {
  	  l:(x),
  	  f:(y)
    };
  };
  
  /** @private */
  function radians(degrees) {
    return(Math.PI * degrees / 180);
  }

  /** @private */
  function degrees(radians) {
    return(180 * radians / Math.PI);
  }

  
  scale.invert = function(p) {
    var c = invFn(xScale.invert(p.x), yScale.invert(p.y))
    if(rad) {
      return {lon:c.l, lat:c.f};
    } else {
      return {lon:degrees(c.l), lat:degrees(c.f)};
    }
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
      
      xScale.domain(d, function(c) { return project(c.lon, c.lat).x });
	  yScale.domain(d, function(c) { return project(c.lon, c.lat).y });
      lastLon = 100000; // invalidate the cache
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
   * <p>3. <tt>range()</tt>
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
      /*
      r = (array instanceof Array)
          ? ((arguments.length > 1) ? map(array, f) : array)
          : Array.prototype.slice.call(arguments);
      xScale.range(pv.min(r, function(p) p.x), pv.max(r, function(p) p.x));
  	  yScale.range(pv.min(r, function(p) p.y), pv.max(r, function(p) p.y));
      return this; 
      */
      tlp = tl;
      brp = br;
      xScale.range(tlp.x, brp.x);
  	  yScale.range(brp.y, tlp.y);
      lastLon = 100000; // invalidate the cache
      return this;
    }
    return [tlp, brp];
  };
  
  scale.radians = function(v) {
    if (arguments.length) {
      rad = v;
      lastLon = 100000; // invalidate the cache
      return this;
    }
    return rad;
  }
  
  scale.projection = function(p) {
    if(arguments.length) {
      proj = p;
      switch(proj) {
        case 'mercator':
          projFn = mercator;
          invFn = mercatorInv;
          xScale.domain(-Math.PI, Math.PI);
	      yScale.domain(-Math.PI/2, Math.PI/2);
          break;

        case 'gall–peters':
          projFn = gallPeters;
          invFn = gallPetersInv;
          xScale.domain(-Math.PI, Math.PI);
	      yScale.domain(-1, 1);
          break;
          
        case 'sinusoidal':
          projFn = sinusoidal;
          invFn = sinusoidalInv;
          xScale.domain(-Math.PI, Math.PI);
	      yScale.domain(-Math.PI/2, Math.PI/2);
          break;
          
        case 'hammer':
          projFn = hammer;
          invFn = hammerInv;
          xScale.domain(-3, 3);
	      yScale.domain(-1.5, 1.5);
          break;
          
        case 'none':
        default:
          projFn = none;
          invFn = noneInv;
          xScale.domain(-Math.PI, Math.PI);
	      yScale.domain(-Math.PI/2, Math.PI/2);
          break;
      }
      
      lastLon = 100000; // invalidate the cache
      return this;
    }
    return proj;
  }

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

  scale.projection.apply(scale, arguments);
  return scale;
};
