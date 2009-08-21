pv.Scale.index = function() {
  function impl(mark) {
    this.min = 0;
    this.max = mark.$$data.length;
    this.by = function() { return this.index; };
    pv.Scale.Impl.call(this, mark);
    this.k = (this.end - this.start) / this.max;
  }
  impl.prototype = pv.extend(pv.Scale.Impl);
  impl.prototype.scale = function(d) { return d * this.k; };
  impl.prototype.by = undefined;
  return this.generic(impl);
};
