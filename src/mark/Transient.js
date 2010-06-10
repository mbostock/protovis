pv.Transient = function(mark) {
  pv.Mark.call(this);
  this.fillStyle(null).strokeStyle(null).textStyle(null);
  this.on = function(state) { return mark.on(state); };
};

pv.Transient.prototype = pv.extend(pv.Mark);
