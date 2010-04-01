/**
 * @private Converts the specified b-spline curve segment to a bezier curve
 * compatible with SVG "C".
 *
 * @param s0 the first control point.
 * @param s1 the second control point.
 * @param s2 the third control point.
 * @param s3 the fourth control point.
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
  function weight(w, s1, s2, s3, s4) {
    return {
      x:(w[0] * s1.left + w[1] * s2.left + w[2] * s3.left + w[3] * s4.left),
      y:(w[0] * s1.top  + w[1] * s2.top  + w[2] * s3.top  + w[3] * s4.top )
    };
  }

  return function(s0, s1, s2, s3) {
      var b1 = weight(basis[1], s0, s1, s2, s3),
          b2 = weight(basis[2], s0, s1, s2, s3),
          b3 = weight(basis[3], s0, s1, s2, s3);
      return "C" + b1.x + "," + b1.y
          + "," + b2.x + "," + b2.y
          + "," + b3.x + "," + b3.y;
    };
})();

pv.SvgScene.curvePathBasis = function(scenes, from, to) {
  if(to - from < 2) return '';
  var path = '',
      s0 = scenes[from],
      s1 = s0,
      s2 = s0,
      s3 = scenes[from+1];
  path += this.pathBasis(s0, s1, s2, s3);
  for (var i = from+2; i <= to; i++) {
    s0 = s1;
    s1 = s2;
    s2 = s3;
    s3 = scenes[i];
    path += this.pathBasis(s0, s1, s2, s3);
  }
  // cycle through to get the last point
  path += this.pathBasis(s1, s2, s3, s3);
  path += this.pathBasis(s2, s3, s3, s3);

  return path;
};

pv.SvgScene.curvePathHermite = function(scenes, from, to, tangents) {
  if(to - from + 1 != tangents.length) return '';
  var path = '',
      s0 = scenes[from],
      s1 = scenes[from+1],
      s2 = scenes[from+2],
      ta = tangents[0],
      tb = tangents[1];
  path += "C" + (s0.left + ta.x)
        + "," + (s0.top + ta.y)
        + "," + (s1.left - tb.x)
        + "," + (s1.top - tb.y)
        + "," + s1.left + "," + s1.top;
  for (var i = from+3, t = 2; i <= to; i++, t++) {
    s0 = s1;
    s1 = s2;
    s2 = scenes[i];
    tb = tangents[t];
    path += "S" + (s1.left - tb.x)
          + "," + (s1.top - tb.y)
          + "," + s1.left + "," + s1.top;
  }
  tb = tangents[t];
  path += "S" + (s2.left - tb.x)
        + "," + (s2.top - tb.y)
        + "," + s2.left + "," + s2.top;

  return path;
};

pv.SvgScene.curvePathCardinal = function(scenes, from, to, tension) {
  if(to - from < 2) return '';
  var tangents = [];
  var a = (1 - tension) / 2,
      s0 = scenes[from],
      s1 = scenes[from+1],
      s2 = scenes[from+2];
  tangents.push(pv.vector(s1.left - s0.left, s1.top - s0.top).times(a));
  for (var i = from+2; i <= to; i++) {
    tangents.push(pv.vector(s2.left - s0.left, s2.top - s0.top).times(a));
    s0 = s1;
    s1 = s2;
    s2 = scenes[i];
  }
  tangents.push(pv.vector(s2.left - s1.left, s2.top - s1.top).times(a));

  return this.curvePathHermite(scenes, from, to, tangents);
};

pv.SvgScene.curvePathMonotone = function(scenes, from, to) {
  if(to - from < 2) return '';
  var tangents = [],
      d = [],
      m = [],
      k = 0,
      ignore = [];

  // Compute the slopes of the secant lines between successive points
  for(k = 0; k < scenes.length-1; k++) {
    d[k] = (scenes[k+1].top - scenes[k].top)/(scenes[k+1].left - scenes[k].left);
  }

  // Initialize the tangents at every data point as the average of the secants
  m[0] = d[0];
  for(k = 1; k < scenes.length - 1; k++) {
    m[k] = (d[k-1]+d[k])/2;
  }
  m[k] = d[k-1];

  // Step 3
  for(k = 0; k < scenes.length-1; k++) {
    if(d[k] == 0) {
      m[ k ] = 0;
      m[k+1] = 0;
      ignore[ k ] = true;
      ignore[k+1] = true;
    }
  }

  // Step 4 + 5
  for(k = 0; k < scenes.length-1; k++) {
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

  var ep = '';
  for(var i = 0; i < scenes.length; i++) {
    var ti = pv.vector(1, m[i]).norm().times(20);
    tangents.push(ti);
    ep += "M" + scenes[i].left + "," + scenes[i].top + "L" + (scenes[i].left + ti.x) + "," + (scenes[i].top + ti.y);
  }

  return this.curvePathHermite(scenes, from, to, tangents);// + ep;
};

pv.SvgScene.curvePathMonotoneOpt = function(scenes, from, to) {
  if(to - from < 2) return '';
  var tangents = [],
      m = [],
      s0 = scenes[0],
      s1 = scenes[1],
      dp = 0,
      dk = (s1.top - s0.top)/(s1.left - s0.left);
  m.push(dk);
  for(var k = 1; k < scenes.length; k++) {
    s0 = s1;
    s1 = scenes[k];
    dp = dk;
    if(s1.top != s0.top) {
      dk = (s1.top - s0.top)/(s1.left - s0.left);
      m.push((dp + dk)/2);
    } else {
      dk = 0;
      m.push(0);
      m[k-1] = 0;
    }

  }
  for(var i = 0; i < scenes.length; i++) {
    tangents.push(pv.vector(1, m[i]).times(20));
  }

  return this.curvePathHermite(scenes, from, to, tangents);
};