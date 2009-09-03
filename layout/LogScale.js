// TODO zlog

/** TODO */
pv.Scale.log = function() {
  function impl() {}
  impl.prototype = pv.extend(pv.Scale.Impl);
  impl.prototype.scale = function(value, domain, range) {
    var k = (range.max - range.min) / (Math.log(domain.max) - Math.log(domain.min));
    return (Math.log(value) - Math.log(domain.min)) * k + range.min;
  };
  return this.generic(new impl());
};
