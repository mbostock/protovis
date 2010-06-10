pv.Transient = function() {
  pv.Mark.call(this);
  this.fillStyle(null).strokeStyle(null).textStyle(null);
};

pv.Transient.prototype = pv.extend(pv.Mark);
