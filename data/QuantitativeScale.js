/**
 * QuantitativeScale is a base class for representing quantitative numerical data
 * scales.
 */
pv.Scales.QuantitativeScale = function(min, max, base) {
  pv.Scales.Scale.call(this);

  this._min = min;
  this._max = max;
  this._base = base==undefined ? pv.Scales.defaultBase : base;
};

pv.Scales.QuantitativeScale.prototype = pv.extend(pv.Scales.Scale);

// Accessor method for min
pv.Scales.QuantitativeScale.prototype.min = function(x) {
  if (x == undefined) {
    return this._min;
  } else {
    this._min = x;
    return this;
  }
};

// Accessor method for max
pv.Scales.QuantitativeScale.prototype.max = function(x) {
  if (x == undefined) {
    return this._max;
  } else {
    this._max = x;
    return this;
  }
};

// Accessor method for base
pv.Scales.QuantitativeScale.prototype.base = function(x) {
  if (x == undefined) {
    return this._base;
  } else {
    this._base = x;
    return this;
  }
};

// Checks if the mapped interval contains x
pv.Scales.QuantitativeScale.prototype.contains = function(x) {
  return (x >= this._min && x <= this._max);
};

// Returns the step for the scale
pv.Scales.QuantitativeScale.prototype.step = function(min, max, base) {
  if (!base) base = pv.Scales.defaultBase;
  var exp = Math.round(Math.log(max-min)/Math.log(base)) - 1;

  return Math.pow(base, exp);
};
