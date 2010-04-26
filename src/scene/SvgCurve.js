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
  function weight(w, p0, p1, p2, p3) {
    return {
      x:(w[0] * p0.left + w[1] * p1.left + w[2] * p2.left + w[3] * p3.left),
      y:(w[0] * p0.top  + w[1] * p1.top  + w[2] * p2.top  + w[3] * p3.top )
    };
  }

  var convert = function(p0, p1, p2, p3) {
    var b1 = weight(basis[1], p0, p1, p2, p3),
        b2 = weight(basis[2], p0, p1, p2, p3),
        b3 = weight(basis[3], p0, p1, p2, p3);
    return "C" + b1.x + "," + b1.y
         + "," + b2.x + "," + b2.y
         + "," + b3.x + "," + b3.y;
  };

  convert.segment = function(p0, p1, p2, p3) {
    var b0 = weight(basis[0], p0, p1, p2, p3),
        b1 = weight(basis[1], p0, p1, p2, p3),
        b2 = weight(basis[2], p0, p1, p2, p3),
        b3 = weight(basis[3], p0, p1, p2, p3);
    return "M" + b0.x + "," + b0.y
         + "C" + b1.x + "," + b1.y
         + "," + b2.x + "," + b2.y
         + "," + b3.x + "," + b3.y;
  };

  return convert;
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
 * @private Interpolates the given points using the basis spline interpolation.
 * Returns an array of path strings.
 *
 * @param points the array of points.
 */
pv.SvgScene.curvePathBasisSegments = function(points) {
  if(points.length <= 2) return '';
  var firstPath = "",
      paths = [],
      p0 = points[0],
      p1 = p0,
      p2 = p0,
      p3 = points[1];
  firstPath = this.pathBasis.segment(p0, p1, p2, p3);
  for (var i = 2; i < points.length; i++) {
    p0 = p1;
    p1 = p2;
    p2 = p3;
    p3 = points[i];
    paths.push(this.pathBasis.segment(p0, p1, p2, p3));
  }
  // Merge the first path to the second path and the last path to the penultimate path
  // because we have 2 paths too many!
  paths[0] = firstPath + paths[0];
  paths.push(this.pathBasis.segment(p1, p2, p3, p3) + this.pathBasis(p2, p3, p3, p3));

  return paths;
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
  if(points.length < 2 || points.length != tangents.length) return '';
  var path = '',
      p0 = points[0],
      p  = points[1],
      t0 = tangents[0],
      t  = tangents[1];
  path += "C" + (p0.left + t0.x) + "," + (p0.top + t0.y)
        + "," + (p.left - t.x) + "," + (p.top - t.y)
        + "," + p.left + "," + p.top;
  for (var i = 2; i < points.length; i++) {
    p = points[i];
    t = tangents[i];
    path += "S" + (p.left - t.x) + "," + (p.top - t.y)
          + "," + p.left + "," + p.top;
  }

  return path;
};

/**
 * @private Interpolates the given points with respective tangents using the cubic
 * Hermite spline interpolation.
 * Returns an array of path strings.
 *
 * @param points the array of points.
 * @param tangents the array of tangent vectors.
 */
pv.SvgScene.curvePathHermiteSegments = function(points, tangents) {
  if(points.length < 2 || points.length != tangents.length) return '';
  var paths = [],
      p0,
      p1  = points[0],
      t0,
      t1  = tangents[0];
  for (var i = 1; i < points.length; i++) {
    p0 = p1;
    t0 = t1;
    p1 = points[i];
    t1 = tangents[i];
    paths.push(
        "M" + p0.left + "," + p0.top
      + "C" + (p0.left + t0.x) + "," + (p0.top + t0.y)
      + "," + (p1.left - t1.x) + "," + (p1.top - t1.y)
      + "," + p1.left + "," + p1.top
    );
  }

  return paths;
};

/**
 * @private Computed the tangents for the given points needed for cardinal spline interpolation.
 * Returns an array of tangent vectors.
 *
 * @param points the array of points.
 * @param tension the tension of hte cardinal spline.
 */
pv.SvgScene.computeCardinalTangents = function(points, tension) {
  var tangents = [];
  var a = (1 - tension) / 2,
      p0 = points[0],
      p1 = points[1],
      p2 = points[2];

  tangents.push({x:a*(p2.left - p0.left), y:a*(p2.top - p0.top)});
  for (var i = 3; i < points.length; i++) {
    tangents.push({x:a*(p2.left - p0.left), y:a*(p2.top - p0.top)});
    p0 = p1;
    p1 = p2;
    p2 = points[i];
  }
  var t = {x:a*(p2.left - p0.left), y:a*(p2.top - p0.top)};
  tangents.push(t);
  tangents.push(t);

  return tangents;
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
  var tangents = this.computeCardinalTangents(points, tension);
  return this.curvePathHermite(points, tangents);
};

/**
 * @private Interpolates the given points using cardinal spline interpolation.
 * Returns an array of path strings.
 *
 * @param points the array of points.
 * @param tension the tension of hte cardinal spline.
 */
pv.SvgScene.curvePathCardinalSegments = function(points, tension) {
  if(points.length <= 2) return '';
  var tangents = this.computeCardinalTangents(points, tension);
  return this.curvePathHermiteSegments(points, tangents);
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
pv.SvgScene.curvePathMonotone = function(points) {
  if(points.length <= 2) return '';
  var tangents = [],
      d = [],
      m = [],
      dx = [],
      k = 0;

  // Compute the slopes of the secant lines between successive points
  for(k = 0; k < points.length-1; k++) {
    d[k] = (points[k+1].top - points[k].top)/(points[k+1].left - points[k].left);
  }

  // Initialize the tangents at every data point as the average of the secants
  m[0] = d[0];
  dx[0] = Math.abs(points[1].left - points[0].left);
  for(k = 1; k < points.length - 1; k++) {
    m[k] = (d[k-1]+d[k])/2;
    dx[k] = Math.abs(points[k+1].left - points[k-1].left)/2;
  }
  m[k] = d[k-1];
  dx[k] = Math.abs(points[k].left - points[k-1].left);

  // Step 3
  for(k = 0; k < points.length - 1; k++) {
    if(d[k] == 0) {
      m[ k ] = 0;
      m[k+1] = 0;
    }
  }

  // Step 4 + 5
  for(k = 0; k < points.length-1; k++) {
    if(Math.abs(m[ k ]) < 1e-5) continue;
    if(Math.abs(m[k+1]) < 1e-5) continue;
    var ak = m[ k ]/d[k];
    var bk = m[k+1]/d[k];

    // check monotone constant
    var s = ak*ak + bk*bk;
    if(s > 9) {
      var tk = 3/Math.sqrt(s);
      m[ k ] = tk*ak*d[k];
      m[k+1] = tk*bk*d[k];
    }
  }

  var len;
  for(var i = 0; i < points.length; i++) {
    len = 1 + m[i] * m[i];  // pv.vector(1, m[i]).norm().times(dx[i]/3)
    tangents.push({x:dx[i]/3/len, y:m[i]*dx[i]/3/len});
  }

  /*
  // Helper code: Show tangents
  var ep = '';
  for(var i = 0; i < points.length; i++) {
    ep += "M" + points[i].left + "," + points[i].top + "L" + (points[i].left + tangents[i].x) + "," + (points[i].top + tangents[i].y);
  }
  */

  return this.curvePathHermite(points, tangents);// + ep;
};