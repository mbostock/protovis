pv.Scales = {};
pv.Scales.epsilon = 1e-30;
pv.Scales.defaultBase = 10;

/**
 * Scale is a base class for scale objects. Scale objects are used to scale the
 * data to a given range. The Scale object initially scales the value to the
 * interval [0, 1]. The values are then mapped to a given range by the range()
 * method.
 */
pv.Scales.Scale = function() {
  // Pixel coordinate minimum
  this._rMin = 0;
  // Pixel coordinate maximum
  this._rMax = 100;
  // Round value?
  this._round = true;
};

/**
 * Sets the range to map the data to.
 */
pv.Scales.Scale.prototype.range = function(a, b) {
  if (a == undefined) {
    // use default values
    // TODO: [0, 100] may not be the best default values.
    // Find better default values, which may be different for each scale type.
  } else if (b == undefined) {
    this._rMin = 0;
    this._rMax = a;
  } else {
    this._rMin = a;
    this._rMax = b;
  }

  return this;
};

// Accessor method for range min
pv.Scales.Scale.prototype.rangeMin = function(x) {
  if (x == undefined) {
    return this._rMin;
  } else {
    this._rMin = x;
    return this;
  }
};

// Accessor method for range max
pv.Scales.Scale.prototype.rangeMax = function(x) {
  if (x == undefined) {
    return this._rMax;
  } else {
    this._rMax = x;
    return this;
  }
};

// Accessor method for round
pv.Scales.Scale.prototype.round = function(x) {
  if (x == undefined) {
    return this._round;
  } else {
    this._round = x;
    return this;
  }
};

//Scales the input to the set range
pv.Scales.Scale.prototype.scale = function(x) {
  var v = this._rMin + (this._rMax-this._rMin) * this.normalize(x);
  return this._round ? Math.round(v) : v;
};

// Returns the inverse scaled value.
pv.Scales.Scale.prototype.invert = function(y) {
  var n = (y - this._rMin) / (this._rMax - this._rMin);
  return this.unnormalize(n);
};
