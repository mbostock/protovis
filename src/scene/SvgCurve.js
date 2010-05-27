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
      x: w[0] * p0.left + w[1] * p1.left + w[2] * p2.left + w[3] * p3.left,
      y: w[0] * p0.top  + w[1] * p1.top  + w[2] * p2.top  + w[3] * p3.top
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
 * Returns an SVG path without the leading M instruction to allow path
 * appending.
 *
 * @param points the array of points.
 */
pv.SvgScene.curveBasis = function(points) {
  if (points.length <= 2) return "";
  var path = "",
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
  /* Cycle through to get the last point. */
  path += this.pathBasis(p1, p2, p3, p3);
  path += this.pathBasis(p2, p3, p3, p3);
  return path;
};

/**
 * @private Interpolates the given points using the basis spline interpolation.
 * If points.length == tangents.length then a regular Hermite interpolation is
 * performed, if points.length == tangents.length + 2 then the first and last
 * segments are filled in with cubic bazier segments.  Returns an array of path
 * strings.
 *
 * @param points the array of points.
 */
pv.SvgScene.curveBasisSegments = function(points) {
  if (points.length <= 2) return "";
  var paths = [],
      p0 = points[0],
      p1 = p0,
      p2 = p0,
      p3 = points[1],
      firstPath = this.pathBasis.segment(p0, p1, p2, p3);

  p0 = p1;
  p1 = p2;
  p2 = p3;
  p3 = points[2];
  paths.push(firstPath + this.pathBasis(p0, p1, p2, p3)); // merge first & second path
  for (var i = 3; i < points.length; i++) {
    p0 = p1;
    p1 = p2;
    p2 = p3;
    p3 = points[i];
    paths.push(this.pathBasis.segment(p0, p1, p2, p3));
  }

  // merge last & second-to-last path
  paths.push(this.pathBasis.segment(p1, p2, p3, p3) + this.pathBasis(p2, p3, p3, p3));
  return paths;
};

/**
 * @private Interpolates the given points with respective tangents using the cubic
 * Hermite spline interpolation. If points.length == tangents.length then a regular
 * Hermite interpolation is performed, if points.length == tangents.length + 2 then
 * the first and last segments are filled in with cubic bazier segments.
 * Returns an SVG path without the leading M instruction to allow path appending.
 *
 * @param points the array of points.
 * @param tangents the array of tangent vectors.
 */
pv.SvgScene.curveHermite = function(points, tangents) {
  if (tangents.length < 1
      || (points.length != tangents.length
      && points.length != tangents.length + 2)) return "";
  var quad = points.length != tangents.length,
      path = "",
      p0 = points[0],
      p = points[1],
      t0 = tangents[0],
      t = t0,
      pi = 1;

  if (quad) {
    path += "Q" + (p.left - t0.x * 2 / 3) + ","  + (p.top - t0.y * 2 / 3)
        + "," + p.left + "," + p.top;
    p0 = points[1];
    pi = 2;
  }

  if (tangents.length > 1) {
    t = tangents[1];
    p = points[pi];
    pi++;
    path += "C" + (p0.left + t0.x) + "," + (p0.top + t0.y)
        + "," + (p.left - t.x) + "," + (p.top - t.y)
        + "," + p.left + "," + p.top;
    for (var i = 2; i < tangents.length; i++, pi++) {
      p = points[pi];
      t = tangents[i];
      path += "S" + (p.left - t.x) + "," + (p.top - t.y)
          + "," + p.left + "," + p.top;
    }
  }

  if (quad) {
    var lp = points[pi];
    path += "Q" + (p.left + t.x * 2 / 3) + ","  + (p.top + t.y * 2 / 3) + ","
        + lp.left + "," + lp.top;
  }

  return path;
};

/**
 * @private Interpolates the given points with respective tangents using the
 * cubic Hermite spline interpolation. Returns an array of path strings.
 *
 * @param points the array of points.
 * @param tangents the array of tangent vectors.
 */
pv.SvgScene.curveHermiteSegments = function(points, tangents) {
  if (tangents.length < 1
      || (points.length != tangents.length
      && points.length != tangents.length + 2)) return [];
  var quad = points.length != tangents.length,
      paths = [],
      p0 = points[0],
      p = p0,
      t0 = tangents[0],
      t = t0,
      pi = 1;

  if (quad) {
    p = points[1];
    paths.push("M" + p0.left + "," + p0.top
        + "Q" + (p.left - t.x * 2 / 3) + "," + (p.top - t.y * 2 / 3)
        + "," + p.left + "," + p.top);
    pi = 2;
  }

  for (var i = 1; i < tangents.length; i++, pi++) {
    p0 = p;
    t0 = t;
    p = points[pi];
    t = tangents[i];
    paths.push("M" + p0.left + "," + p0.top
        + "C" + (p0.left + t0.x) + "," + (p0.top + t0.y)
        + "," + (p.left - t.x) + "," + (p.top - t.y)
        + "," + p.left + "," + p.top);
  }

  if (quad) {
    var lp = points[pi];
    paths.push("M" + p.left + "," + p.top
        + "Q" + (p.left + t.x * 2 / 3) + ","  + (p.top + t.y * 2 / 3) + ","
        + lp.left + "," + lp.top);
  }

  return paths;
};

/**
 * @private Computes the tangents for the given points needed for cardinal
 * spline interpolation. Returns an array of tangent vectors. Note: that for n
 * points only the n-2 well defined tangents are returned.
 *
 * @param points the array of points.
 * @param tension the tension of hte cardinal spline.
 */
pv.SvgScene.cardinalTangents = function(points, tension) {
  var tangents = [],
      a = (1 - tension) / 2,
      p0 = points[0],
      p1 = points[1],
      p2 = points[2];

  for (var i = 3; i < points.length; i++) {
    tangents.push({x: a * (p2.left - p0.left), y: a * (p2.top - p0.top)});
    p0 = p1;
    p1 = p2;
    p2 = points[i];
  }

  tangents.push({x: a * (p2.left - p0.left), y: a * (p2.top - p0.top)});
  return tangents;
};

/**
 * @private Interpolates the given points using cardinal spline interpolation.
 * Returns an SVG path without the leading M instruction to allow path
 * appending.
 *
 * @param points the array of points.
 * @param tension the tension of hte cardinal spline.
 */
pv.SvgScene.curveCardinal = function(points, tension) {
  if (points.length <= 2) return "";
  return this.curveHermite(points, this.cardinalTangents(points, tension));
};

/**
 * @private Interpolates the given points using cardinal spline interpolation.
 * Returns an array of path strings.
 *
 * @param points the array of points.
 * @param tension the tension of hte cardinal spline.
 */
pv.SvgScene.curveCardinalSegments = function(points, tension) {
  if (points.length <= 2) return "";
  return this.curveHermiteSegments(points, this.cardinalTangents(points, tension));
};

/**
 * @private Interpolates the given points using Fritsch-Carlson Monotone cubic
 * Hermite interpolation. Returns an array of tangent vectors.
 *
 * @param points the array of points.
 */
pv.SvgScene.monotoneTangents = function(points) {
  var tangents = [],
      d = [],
      m = [],
      dx = [],
      k = 0;

  /* Compute the slopes of the secant lines between successive points. */
  for (k = 0; k < points.length-1; k++) {
    d[k] = (points[k+1].top - points[k].top)/(points[k+1].left - points[k].left);
  }

  /* Initialize the tangents at every point as the average of the secants. */
  m[0] = d[0];
  dx[0] = points[1].left - points[0].left;
  for (k = 1; k < points.length - 1; k++) {
    m[k] = (d[k-1]+d[k])/2;
    dx[k] = (points[k+1].left - points[k-1].left)/2;
  }
  m[k] = d[k-1];
  dx[k] = (points[k].left - points[k-1].left);

  /* Step 3. Very important, step 3. Yep. Wouldn't miss it. */
  for (k = 0; k < points.length - 1; k++) {
    if (d[k] == 0) {
      m[ k ] = 0;
      m[k+1] = 0;
    }
  }

  /* Step 4 + 5. Out of 5 or more steps. */
  for (k = 0; k < points.length - 1; k++) {
    if ((Math.abs(m[k]) < 1e-5) || (Math.abs(m[k+1]) < 1e-5)) continue;
    var ak = m[k] / d[k],
        bk = m[k + 1] / d[k],
        s = ak * ak + bk * bk; // monotone constant (?)
    if (s > 9) {
      var tk = 3 / Math.sqrt(s);
      m[k] = tk * ak * d[k];
      m[k + 1] = tk * bk * d[k];
    }
  }

  var len;
  for (var i = 0; i < points.length; i++) {
    len = 1 + m[i] * m[i]; // pv.vector(1, m[i]).norm().times(dx[i]/3)
    tangents.push({x: dx[i] / 3 / len, y: m[i] * dx[i] / 3 / len});
  }

  return tangents;
};

/**
 * @private Interpolates the given points using Fritsch-Carlson Monotone cubic
 * Hermite interpolation. Returns an SVG path without the leading M instruction
 * to allow path appending.
 *
 * @param points the array of points.
 */
pv.SvgScene.curveMonotone = function(points) {
  if (points.length <= 2) return "";
  return this.curveHermite(points, this.monotoneTangents(points));
}

/**
 * @private Interpolates the given points using Fritsch-Carlson Monotone cubic
 * Hermite interpolation.
 * Returns an array of path strings.
 *
 * @param points the array of points.
 */
pv.SvgScene.curveMonotoneSegments = function(points) {
  if (points.length <= 2) return "";
  return this.curveHermiteSegments(points, this.monotoneTangents(points));
};
