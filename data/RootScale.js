pv.Scales.root = function(min, max, base) {
  return new pv.Scales.RootScale(min, max, base);
};

pv.Scales.root.fromData = function(data, f, base) {
  return new pv.Scales.RootScale(pv.min(data, f), pv.max(data, f), base);
}

/**
 * RootScale is a QuantativeScale that performs a root transformation of the
 * data. This could be a square root or any arbitrary power. A root scale may
 * be a many-to-one mapping where the reverse mapping will not be correct.
 */
pv.Scales.RootScale = function(min, max, base) {
  if (min instanceof Array) {
    if (max == undefined) max = 2; // default base for root is 2.
  } else {
    if (base == undefined) base = 2; // default base for root is 2.
  }

  pv.Scales.QuantitativeScale.call(this, min, max, base);

  this.update();
};

// Returns the root value with base b
pv.Scales.RootScale.root = function (x, b) {
  var s = (x < 0) ? -1 : 1;
  return s * Math.pow(s * x, 1 / b);
};

pv.Scales.RootScale.prototype = pv.extend(pv.Scales.QuantitativeScale);

// Accessor method for min
pv.Scales.RootScale.prototype.min = function(x) {
  var value = pv.Scales.QuantitativeScale.prototype.min.call(this, x);
  if (x != undefined) this.update();
  return value;
};

// Accessor method for max
pv.Scales.RootScale.prototype.max = function(x) {
  var value = pv.Scales.QuantitativeScale.prototype.max.call(this, x);
  if (x != undefined) this.update();
  return value;
};

// Accessor method for base
pv.Scales.RootScale.prototype.base = function(x) {
  var value = pv.Scales.QuantitativeScale.prototype.base.call(this, x);
  if (x != undefined) this.update();
  return value;
};

// Normalizes the value
pv.Scales.RootScale.prototype.normalize = function(x) {
  var eps = pv.Scales.epsilon;
  var range = this._rmax - this._rmin;

  return (range < eps && range > -eps) ? 0
    : (pv.Scales.RootScale.root(x, this._base) - this._rmin)
      / (this._rmax - this._rmin);
};

// Un-normalizes the value
pv.Scales.RootScale.prototype.unnormalize = function(n) {
  return Math.pow(n * (this._rmax - this._rmin) + this._rmin, this._base);
};

// Sets min/max values to "nice numbers"
pv.Scales.RootScale.prototype.nice = function() {
  var step = this.step(this._rmin, this._rmax);

  this._rmin = Math.floor(this._rmin / step) * step;
  this._rmax = Math.ceil(this._rmax / step) * step;

  this._min = Math.pow(this._rmin, this._base);
  this._max = Math.pow(this._rmax, this._base);

  return this;
};

// Returns a list of rule values
// The rule values of a root scale should be the powers
// of integers, e.g. 1, 4, 9, ... for base = 2
// TODO: This function needs further testing
pv.Scales.RootScale.prototype.ruleValues = function() {
  var step = this.step(this._rmin, this._rmax);
//  if (step < 1) step = 1; // bound to 1
  // TODO: handle decimal values

  var s;
  var list = pv.range(Math.floor(this._rmin), Math.ceil(this._rmax), step);
  for (var i = 0; i < list.length; i++) {
    s = (list[i] < 0) ? -1 : 1;
    list[i] = s*Math.pow(list[i], this._base);
  }

  // check end points
  if (list[0] < this._min) list.splice(0, 1);
  if (list[list.length-1] > this._max) list.splice(list.length-1, 1);

  return list;
};

// Update root scale values
pv.Scales.RootScale.prototype.update = function() {
  var rt = pv.Scales.RootScale.root;
  this._rmin = rt(this._min, this._base);
  this._rmax = rt(this._max, this._base);
};
