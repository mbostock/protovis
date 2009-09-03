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
pv.Scale.LinearImpl.prototype.getDomain = function(data, by) {
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
pv.Scale.LinearImpl.prototype.scale = function(value, domain, range) {
  var k = (range.max - range.min) / (domain.max - domain.min);
  return (value - domain.min) * k + range.min;
};

/** TODO */
pv.Scale.linear = function(data) {
  return this.generic(new pv.Scale.LinearImpl()).data(data);
};
