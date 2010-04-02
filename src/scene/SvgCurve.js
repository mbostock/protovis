/**
 * @private Converts the specified b-spline curve segment to a bezier curve
 * compatible with SVG "C".
 *
 * @param p0 the first control point.
 * @param p1 the second control point.
 * @param p2 the third control point.
 * @param p3 the fourth control point.
 */
pv.SvgScene.pathBasis = (function() {

  /**
   * Matrix to transform basis (b-spline) control points to bezier control
   * points. Derived from FvD 11.2.8.
   */
  var basis = [
    [ 1/6, 2/3, 1/6,   0 ],
    [   0, 2/3, 1/3,   0 ],
    [   0, 1/3, 2/3,   0 ],
    [   0, 1/6, 2/3, 1/6 ]
  ];

  /**
   * Returns the point that is the weighted sum of the specified control points,
   * using the specified weights. This method requires that there are four
   * weights and four control points.
   */
  function weight(w, p1, p2, p3, p4) {
    return pv.vector(
      (w[0] * p1.x + w[1] * p2.x + w[2] * p3.x + w[3] * p4.x),
      (w[0] * p1.y + w[1] * p2.y + w[2] * p3.y + w[3] * p4.y)
    );
  }

  return function(p0, p1, p2, p3) {
      var b1 = weight(basis[1], p0, p1, p2, p3),
          b2 = weight(basis[2], p0, p1, p2, p3),
          b3 = weight(basis[3], p0, p1, p2, p3);
      return "C" + b1.x + "," + b1.y
          + "," + b2.x + "," + b2.y
          + "," + b3.x + "," + b3.y;
    };
})();

/**
 * @private Interpolates the given points using the basis spline interpolation.
 * Returns an SVG path without the leading M instruction to allow path appending.
 *
 * @param points the array of points.
 */
pv.SvgScene.curvePathBasis = function(points) {
  if(points.length <= 2) return '';
  var path = '',
      p0 = points[0],
      p1 = p0,
      p2 = p0,
      p3 = points[1];
  path += this.pathBasis(p0, p1, p2, p3);
  for (var i = 2; i < points.length; i++) {
    p0 = p1;
    p1 = p2;
    p2 = p3;
    p3 = points[i];
    path += this.pathBasis(p0, p1, p2, p3);
  }
  // cycle through to get the last point
  path += this.pathBasis(p1, p2, p3, p3);
  path += this.pathBasis(p2, p3, p3, p3);

  return path;
};

/**
 * @private Interpolates the given points with respective tangents using the cubic
 * Hermite spline interpolation.
 * Returns an SVG path without the leading M instruction to allow path appending.
 *
 * @param points the array of points.
 * @param tangents the array of tangent vectors.
 */
pv.SvgScene.curvePathHermite = function(points, tangents) {
  if(points.length != tangents.length) return '';
  var path = '',
      p0 = points[0],
      p1 = points[1],
      p2 = points[2],
      ta = tangents[0],
      tb = tangents[1];
  path += "C" + (p0.x + ta.x)
        + "," + (p0.y + ta.y)
        + "," + (p1.x - tb.x)
        + "," + (p1.y - tb.y)
        + "," + p1.x + "," + p1.y;
  for (var i = 0+3, t = 2; i < points.length; i++, t++) {
    p0 = p1;
    p1 = p2;
    p2 = points[i];
    tb = tangents[t];
    path += "S" + (p1.x - tb.x)
          + "," + (p1.y - tb.y)
          + "," + p1.x + "," + p1.y;
  }
  tb = tangents[t];
  path += "S" + (p2.x - tb.x)
        + "," + (p2.y - tb.y)
        + "," + p2.x + "," + p2.y;

  return path;
};

/**
 * @private Interpolates the given points using cardinal spline interpolation.
 * Returns an SVG path without the leading M instruction to allow path appending.
 *
 * @param points the array of points.
 * @param tension the tension of hte cardinal spline.
 */
pv.SvgScene.curvePathCardinal = function(points, tension) {
  if(points.length <= 2) return '';
  var tangents = [];
  var a = (1 - tension) / 2,
      p0 = undefined,
      p1 = points[0],
      p2 = points[1];

  tangents.push(pv.vector(p2.x - p1.x, p2.y - p1.y).times(a));
  for (var i = 2; i < points.length; i++) {
    p0 = p1;
    p1 = p2;
    p2 = points[i];
    tangents.push(pv.vector(p2.x - p0.x, p2.y - p0.y).times(a));
  }
  tangents.push(pv.vector(p2.x - p1.x, p2.y - p1.y).times(a));

  /*
  // Helper code: Show tangents
  var ep = '';
  for(var i = 0; i < points.length; i++) {
    ep += "M" + points[i].x + "," + points[i].y + "L" + (points[i].x + tangents[i].x) + "," + (points[i].y + tangents[i].y);
  }
  */

  return this.curvePathHermite(points, tangents);// + ep;
};

/**
 * @private Interpolates the given points using Fritsch-Carlson Monotone cubic
 * Hermite interpolation.
 * Returns an SVG path without the leading M instruction to allow path appending.
 *
 * Note: this is the test case unoptimised version, a prototype.
 *
 * @param points the array of points.
 */
pv.SvgScene.curvePathMonotone = function(points) {
  if(points.length <= 2) return '';
  var tangents = [],
      d = [],
      m = [],
      dx = [],
      k = 0,
      ignore = [];

  // Compute the slopes of the secant lines between successive points
  for(k = 0; k < points.length-1; k++) {
    d[k] = (points[k+1].y - points[k].y)/(points[k+1].x - points[k].x);
  }

  // Initialize the tangents at every data point as the average of the secants
  m[0] = d[0];
  dx[0] = Math.abs(points[1].x - points[0].x);
  for(k = 1; k < points.length - 1; k++) {
    m[k] = (d[k-1]+d[k])/2;
    dx[k] = Math.abs(points[k+1].x - points[k-1].x)/2;
  }
  m[k] = d[k-1];
  dx[k] = Math.abs(points[k].x - points[k-1].x);

  // Step 3
  for(k = 0; k < points.length - 1; k++) {
    if(d[k] == 0) {
      m[ k ] = 0;
      m[k+1] = 0;
      ignore[ k ] = true;
      ignore[k+1] = true;
    }
  }

  // Step 4 + 5
  for(k = 0; k < points.length-1; k++) {
    if(ignore[k]) continue;
    var ak = m[ k ]/d[k];
    var bk = m[k+1]/d[k];
    if(ak == 0 || bk == 0) {
      // If a or b are computed to be zero, then the input data points are not monotone.
      m[ k ] = 0;
      m[k+1] = 0;
    } else {
      // check monotone constant
      var s = ak*ak + bk*bk;
      if(s > 9) {
        var tk = 3/Math.sqrt(s);
        m[ k ] = tk*ak*d[k];
        m[k+1] = tk*bk*d[k];
      }
    }
  }

  for(var i = 0; i < points.length; i++) {
    tangents.push(pv.vector(1, m[i]).norm().times(dx[i]/3));
  }

  // Helper code: Show tangents
  var ep = '';
  for(var i = 0; i < points.length; i++) {
    ep += "M" + points[i].x + "," + points[i].y + "L" + (points[i].x + tangents[i].x) + "," + (points[i].y + tangents[i].y);
  }

  return this.curvePathHermite(points, tangents) + ep;
};

/**
 * @private Interpolates the given points using Fritsch-Carlson Monotone cubic
 * Hermite interpolation.
 * Returns an SVG path without the leading M instruction to allow path appending.
 *
 * Note: this is the optimised version that is not working yet
 *
 * @param points the array of points.
 */
pv.SvgScene.curvePathMonotoneOpt = function(points) {
  if(points.length <= 2) return '';
  var tangents = [],
      m = [],
      p0 = points[0],
      p1 = points[1],
      dp = 0,
      dk = (p1.y - p0.y)/(p1.x - p0.x);
  m.push(dk);
  for(var k = 1; k < points.length; k++) {
    p0 = p1;
    p1 = points[k];
    dp = dk;
    if(p1.y != p0.y) {
      dk = (p1.y - p0.y)/(p1.x - p0.x);
      m.push((dp + dk)/2);
    } else {
      dk = 0;
      m.push(0);
      m[k-1] = 0;
    }

  }
  for(var i = 0; i < points.length; i++) {
    tangents.push(pv.vector(1, m[i]).times(20));
  }

  return this.curvePathHermite(points, tangents);
};