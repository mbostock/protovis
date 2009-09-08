/** TODO */
pv.Scale.Linear = function() {};
pv.Scale.Linear.prototype = pv.extend(pv.Scale);

/** TODO */
pv.Scale.Linear.prototype.nice = function(nice) {
  this.nice = nice;
};

/** TODO */
pv.Scale.LinearImpl = function() {};
pv.Scale.LinearImpl.prototype = pv.extend(pv.Scale.Impl);
pv.Scale.LinearImpl.prototype.type = pv.Scale.Linear;

/** TODO */
pv.Scale.LinearImpl.prototype.getDomain = function() {
  var domain = pv.Scale.Impl.prototype.getDomain.apply(this, arguments);
  if (this.nice) {
    var min = domain.min, max = domain.max,
        step = Math.pow(10, Math.round(Math.log(max - min) / Math.log(10)) - 1);
    domain.min = Math.floor(min / step) * step;
    domain.max = Math.ceil(max / step) * step;
  }
  return domain;
};

/** TODO */
pv.Scale.LinearImpl.prototype.getRange = function() {
  var range = pv.Scale.Impl.prototype.getRange.apply(this, arguments);
  if (typeof range.min == "number") {
    this.min = range.min;
    this.k = (range.max - range.min) / (this.domain.max - this.domain.min);
  } else { // assume color
    this.min = 0;
    this.k = 1 / (this.domain.max - this.domain.min);
    this.ramp = pv.ramp(range.min, range.max);
  }
  return range;
};

/** TODO */
pv.Scale.LinearImpl.prototype.scale = function(value) {
  var x = (value - this.offset()) * this.k + this.min;
  return this.ramp ? this.ramp.value(x) : x;
};

/** TODO */
pv.Scale.linear = function(data) {
  return this.generic(new pv.Scale.LinearImpl()).data(data);
};
