pv.Scales.log = function(min, max, base) {
  return new pv.Scales.LogScale(min, max, base);
};

pv.Scales.log.fromData = function(data, f, base) {
  return new pv.Scales.LogScale(pv.min(data, f), pv.max(data, f), base);
}

/*
 * LogScale is a QuantativeScale that performs a log transformation of the
 * data. The base of the logarithm is determined by the base property.
 */
pv.Scales.LogScale = function(min, max, base) {
  pv.Scales.QuantitativeScale.call(this, min, max, base);

  this.update();
};

// Zero-symmetric log function
pv.Scales.LogScale.log = function(x, b) {
  return x==0 ? 0 : x>0 ? Math.log(x)/Math.log(b) : -Math.log(-x)/Math.log(b);
};

// Adjusted zero-symmetric log function
pv.Scales.LogScale.zlog = function(x, b) {
  var s = (x < 0) ? -1 : 1;
  x = s*x;
  if (x < b) x += (b-x)/b;
  return s * Math.log(x) / Math.log(b);
};

pv.Scales.LogScale.prototype = pv.extend(pv.Scales.QuantitativeScale);

// Accessor method for min
pv.Scales.LogScale.prototype.min = function(x) {
  var value = pv.Scales.QuantitativeScale.prototype.min.call(this, x);

  if (x != undefined) this.update();
  return value;
};

// Accessor method for max
pv.Scales.LogScale.prototype.max = function(x) {
  var value = pv.Scales.QuantitativeScale.prototype.max.call(this, x);

  if (x != undefined) this.update();
  return value;
};

// Accessor method for base
pv.Scales.LogScale.prototype.base = function(x) {
  var value = pv.Scales.QuantitativeScale.prototype.base.call(this, x);

  if (x != undefined) this.update();
  return value;
};

// Normalizes the value
pv.Scales.LogScale.prototype.normalize = function(x) {
  var eps = pv.Scales.epsilon;
  var range = this._lmax - this._lmin;

  return (range < eps && range > -eps) ? 0 : (this._log(x, this._base) - this._lmin) / range;
};

// Un-normalizes the value
pv.Scales.LogScale.prototype.unnormalize = function(n) {
  // TODO: handle case where _log = zlog
  return Math.pow(this._base, n * (this._lmax - this._lmin) + this._lmin);
};

/**
 * Sets min/max values to "nice numbers" For LogScale, we compute "nice" min/max
 * values for the log scale(_lmin, _lmax) first, then calculate the data min/max
 * values from the log min/max values.
 */
pv.Scales.LogScale.prototype.nice = function() {
  var step = 1; //this.step(this._lmin, this._lmax);

  this._lmin = Math.floor(this._lmin / step) * step;
  this._lmax = Math.ceil(this._lmax / step) * step;

  // TODO: handle case where _log = zlog
  this._min = Math.pow(this._base, this._lmin);
  this._max = Math.pow(this._base, this._lmax);

  return this;
};

// Returns a list of rule values
pv.Scales.LogScale.prototype.ruleValues = function() {
  var step = this.step(this._lmin, this._lmax);
  if (step < 1) step = 1; // bound to 1

  var start = Math.floor(this._lmin);
  var end = Math.ceil(this._lmax);

  var list =[];
  var i, j, b;
  for (i = start; i < end; i++) { // for each step
    // add each rule value
    // TODO: handle case where _log = zlog
    b = Math.pow(this._base, i);
    for (j = 1; j < this._base; j++) {
      if (i >= 0) list.push(b*j);
      else list.push((b*j).toFixed(-i));
    }
  }
  list.push(b*this._base); // add max value

  // check end points
  if (list[0] < this._min) list.splice(0, 1);
  if (list[list.length-1] > this._max) list.splice(list.length-1, 1);

  return list;
};

// Update log scale values
pv.Scales.LogScale.prototype.update = function() {
  this._log = (this._min < 0 && this._max > 0) ? pv.Scales.LogScale.zlog : pv.Scales.LogScale.log;
  this._lmin = this._log(this._min, this._base);
  this._lmax = this._log(this._max, this._base);
};
