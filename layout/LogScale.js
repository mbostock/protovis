// TODO adjusted zero-symmetric log (logAdjusted instead of logSymmetric)
// TODO color ranges?
// TODO evaluation of height property requires knowing bottom/top (if non-zero)

/** TODO */
pv.Scale.Log = function() {};
pv.Scale.Log.prototype = pv.extend(pv.Scale);

/** TODO */
pv.Scale.Log.prototype.nice = function(nice) {
  this.nice = nice;
};

/** TODO */
pv.Scale.Log.prototype.base = function(base) {
  this.base = base;
};

/** TODO */
pv.Scale.LogImpl = function() {};
pv.Scale.LogImpl.prototype = pv.extend(pv.Scale.Impl);
pv.Scale.LogImpl.prototype.type = pv.Scale.Log;
pv.Scale.LogImpl.prototype.base = 10;

/** TODO */
pv.Scale.LogImpl.prototype.log = function(x) {
  return pv.logSymmetric(x, this.base);
};

/** TODO */
pv.Scale.LogImpl.prototype.getDomain = function(data, by) {
  var domain = pv.Scale.Impl.prototype.getDomain.apply(this, arguments);
  if (this.nice) {
    var min = domain.min, max = domain.max;
    domain.min = pv.logFloor(min, this.base);
    domain.max = pv.logCeil(max, this.base);
  }
  return domain;
};

/** TODO */
pv.Scale.LogImpl.prototype.getRange = function() {
  var range = pv.Scale.Impl.prototype.getRange.apply(this, arguments);
  this.k = (range.max - range.min)
      / (this.log(this.domain.max) - this.log(this.domain.min));
  return range;
};

/** TODO */
pv.Scale.LogImpl.prototype.scale = function(value) {
  return (this.log(value) - this.log(this.offset())) * this.k + this.range.min;
};

/** TODO */
pv.Scale.log = function(data) {
  return this.generic(new pv.Scale.LogImpl()).data(data);
};
