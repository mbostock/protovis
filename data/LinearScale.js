pv.Scales.linear = function(min, max, base) {
  return new pv.Scales.LinearScale(min, max, base);
};

pv.Scales.linear.fromData = function(data, f, base) {
  return new pv.Scales.LinearScale(pv.min(data, f), pv.max(data, f), base);
}

/**
 * LinearScale is a QuantativeScale that spaces values linearly along the scale
 * range. This is the default scale for numeric types.
 */
pv.Scales.LinearScale = function(min, max, base) {
  pv.Scales.QuantitativeScale.call(this, min, max, base);
};

pv.Scales.LinearScale.prototype = pv.extend(pv.Scales.QuantitativeScale);

// Normalizes the value
pv.Scales.LinearScale.prototype.normalize = function(x) {
  var eps = pv.Scales.epsilon;
  var range = this._max - this._min;

  return (range < eps && range > -eps) ? 0 : (x - this._min) / range;
};

// Un-normalizes the value
pv.Scales.LinearScale.prototype.unnormalize = function(n) {
  return n * (this._max - this._min) + this._min;
};

// Sets min/max values to "nice numbers"
pv.Scales.LinearScale.prototype.nice = function() {
  var step = this.step(this._min, this._max, this._base);

  this._min = Math.floor(this._min / step) * step;
  this._max = Math.ceil(this._max / step) * step;

  return this;
};

// Returns a list of rule values
pv.Scales.LinearScale.prototype.ruleValues = function() {
  var step = this.step(this._min, this._max, this._base);

  var start = Math.floor(this._min / step) * step;
  var end = Math.ceil(this._max / step) * step;

  var list = pv.range(start, end+step, step);

  // Remove precision problems
  // TODO move to tick rendering, not scales
  if (step < 1) {
    var exp = Math.round(Math.log(step)/Math.log(this._base));

    for (var i = 0; i < list.length; i++) {
      list[i] = list[i].toFixed(-exp);
    }
  }

  // check end points
  if (list[0] < this._min) list.splice(0, 1);
  if (list[list.length-1] > this._max) list.splice(list.length-1, 1);

  return list;
};
