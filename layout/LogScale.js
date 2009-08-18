pv.Scale.log = function() {
  function impl(mark) {
    pv.Scale.Impl.call(this, mark);
    this.k = (this.end - this.start) / (this.log(this.max) - this.log(this.min));
  }
  impl.prototype = pv.extend(pv.Scale.Impl);
  impl.prototype.log = function(d) { return Math.log(d); }
  impl.prototype.scale = function(d) { return (this.log(d) - this.log(this.min)) * this.k; };
  return this.generic(impl);
};
