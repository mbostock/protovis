pv.Scales.ordinal = function(ordinals) {
  return new pv.Scales.OrdinalScale(ordinals);
}

/**
 * OrdinalScale is a Scale for ordered sequential data.  This supports both
 * numeric and non-numeric data, and simply places each element in sequence
 * using the ordering found in the input data array.
 */
pv.Scales.OrdinalScale = function(ordinals) {
  pv.Scales.Scale.call(this);

  // The list of ordinals
  this._ordinals = ordinals;
  // Map of ordinal to index
  this._map = pv.numerate(ordinals);
}

pv.Scales.OrdinalScale.prototype = pv.extend(pv.Scales.Scale);

// Accessor method for ordinals
pv.Scales.OrdinalScale.prototype.ordinals = function(ordinals) {
  if (ordinals == undefined) {
    return this._ordinals;
  } else {
    this._ordinals = ordinals;
    this._map = pv.numerate(ordinals);
    return this;
  }
}

// Normalizes the value
pv.Scales.OrdinalScale.prototype.normalize = function(x) {
  var i = this._map[x];

  // if x not an ordinal value(assume x is an index value)
  if (i == undefined) i = x;

  // Not sure if the value should be shifted
  return (i == undefined) ? -1 : (i + 0.5) / this._ordinals.length;
};

// Returns the ordinal values for i
pv.Scales.OrdinalScale.prototype.unnormalize = function(n) {
  var i = Math.floor(n * this._ordinals.length - 0.5);
  return this._ordinals[i];
};

// Returns a list of rule values
pv.Scales.OrdinalScale.prototype.ruleValues = function() {
  return pv.range(0.5, this._ordinals.length-0.5);
};

// Returns the width between rules
pv.Scales.OrdinalScale.prototype.ruleWidth = function() {
  return this.scale(1/this._ordinals.length);
}
