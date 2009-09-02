// TODO allow override of log base
// TODO zlog, etc.

/** TODO */
pv.Scale.Log = function() {};
pv.Scale.Log.prototype = pv.extend(pv.Scale);

/** TODO */
pv.Scale.Log.prototype.base = function(base) {
  this.base = base;
};

/** TODO */
pv.Scale.log = function() {
  function impl() {}
  impl.prototype = pv.extend(pv.Scale.Impl);
  impl.prototype.type = pv.Scale.Log;
  impl.prototype.base = 10;
  impl.prototype.log = function(v) {
    return Math.log(v) / Math.log(this.base);
  };
  impl.prototype.scale = function(value, domain, range) {
    var k = (range.max - range.min) / (this.log(domain.max) - this.log(domain.min));
    return (this.log(value) - this.log(domain.min)) * k + range.min;
  };
  return this.generic(new impl());
};
