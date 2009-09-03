// TODO zlog
// TODO customizable base
// TODO override nice behavior; depends on customizable base

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
pv.Scale.LogImpl.prototype.getDomain = function(data, by) {
  var domain = pv.Scale.Impl.prototype.getDomain.apply(this, arguments);
  if (this.nice) {
    var min = domain.min, max = domain.max, base = this.base;
    domain.min = Math.pow(base, Math.floor(Math.log(min) / Math.log(base)));
    domain.max = Math.pow(base, Math.ceil(Math.log(max) / Math.log(base)));
  }
  return domain;
};

/** TODO */
pv.Scale.LogImpl.prototype.scale = function(value, domain, range) {
  var k = (range.max - range.min) / (Math.log(domain.max) - Math.log(domain.min));
  return (Math.log(value) - Math.log(domain.min)) * k + range.min;
};

/** TODO */
pv.Scale.log = function(data) {
  return this.generic(new pv.Scale.LogImpl()).data(data);
};
