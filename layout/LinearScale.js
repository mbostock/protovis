/** TODO */
pv.Scale.linear = function() {
  function impl() {}
  impl.prototype = pv.extend(pv.Scale.Impl);
  impl.prototype.scale = function(value, domain, range) {
    var k = (range.max - range.min) / (domain.max - domain.min);
    return (value - domain.min) * k + range.min;
  };
  return this.generic(new impl());
};
