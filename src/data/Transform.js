/**
 * Returns a new identity transform.
 *
 * @class Represents a transformation matrix. The transformation matrix is
 * limited to expressing translate and uniform scale transforms only; shearing,
 * rotation, general affine, and other transforms are not supported.
 *
 * <p>The methods on this class treat the transform as immutable, returning a
 * copy of the transformation matrix with the specified transform applied. Note,
 * alternatively, that the matrix fields can be get and set directly.
 */
pv.Transform = function() {};
pv.Transform.prototype = {k: 1, x: 0, y: 0};

/**
 * The scale magnitude; defaults to 1.
 *
 * @type number
 * @name pv.Transform.prototype.k
 */

/**
 * The x-offset; defaults to 0.
 *
 * @type number
 * @name pv.Transform.prototype.x
 */

/**
 * The y-offset; defaults to 0.
 *
 * @type number
 * @name pv.Transform.prototype.y
 */

/**
 * @private The identity transform.
 *
 * @type pv.Transform
 */
pv.Transform.identity = new pv.Transform();

// k 0 x   1 0 a   k 0 ka+x
// 0 k y * 0 1 b = 0 k kb+y
// 0 0 1   0 0 1   0 0 1

/**
 * Returns a translated copy of this transformation matrix.
 *
 * @param {number} x the x-offset.
 * @param {number} y the y-offset.
 * @returns {pv.Transform} the translated transformation matrix.
 */
pv.Transform.prototype.translate = function(x, y) {
  var v = new pv.Transform();
  v.k = this.k;
  v.x = this.k * x + this.x;
  v.y = this.k * y + this.y;
  return v;
};

// k 0 x   d 0 0   kd  0 x
// 0 k y * 0 d 0 =  0 kd y
// 0 0 1   0 0 1    0  0 1

/**
 * Returns a scaled copy of this transformation matrix.
 *
 * @param {number} k
 * @returns {pv.Transform} the scaled transformation matrix.
 */
pv.Transform.prototype.scale = function(k) {
  var v = new pv.Transform();
  v.k = this.k * k;
  v.x = this.x;
  v.y = this.y;
  return v;
};

/**
 * Returns the inverse of this transformation matrix.
 *
 * @returns {pv.Transform} the inverted transformation matrix.
 */
pv.Transform.prototype.invert = function() {
  var v = new pv.Transform(), k = 1 / this.k;
  v.k = k;
  v.x = -this.x * k;
  v.y = -this.y * k;
  return v;
};

// k 0 x   d 0 a   kd  0 ka+x
// 0 k y * 0 d b =  0 kd kb+y
// 0 0 1   0 0 1    0  0    1

/**
 * Returns this matrix post-multiplied by the specified matrix <i>m</i>.
 *
 * @param {pv.Transform} m
 * @returns {pv.Transform} the post-multiplied transformation matrix.
 */
pv.Transform.prototype.times = function(m) {
  var v = new pv.Transform();
  v.k = this.k * m.k;
  v.x = this.k * m.x + this.x;
  v.y = this.k * m.y + this.y;
  return v;
};
