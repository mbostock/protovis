pv.Scale.linear = function() {
  function impl(mark) {
    pv.Scale.Impl.call(this, mark);
    this.k = (this.end - this.start) / (this.max - this.min);
  }
  impl.prototype = pv.extend(pv.Scale.Impl);
  impl.prototype.scale = function(d) { return (d - this.min) * this.k; };
  return this.generic(impl);
};
