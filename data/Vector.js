pv.vector = function(x, y) {
  return new pv.Vector(x, y);
};

/** @class */
pv.Vector = function(x, y) {
  this.x = x;
  this.y = y;
};

pv.Vector.prototype.perp = function() {
  return new pv.Vector(-this.y, this.x);
};

pv.Vector.prototype.norm = function() {
  var l = this.length();
  return this.times(l ? (1 / l) : 1);
};

pv.Vector.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

pv.Vector.prototype.times = function(k) {
  return new pv.Vector(this.x * k, this.y * k);
};

pv.Vector.prototype.plus = function(x, y) {
  return (arguments.length == 1)
      ? new pv.Vector(this.x + x.x, this.y + x.y)
      : new pv.Vector(this.x + x, this.y + y);
};

pv.Vector.prototype.minus = function(x, y) {
  return (arguments.length == 1)
      ? new pv.Vector(this.x - x.x, this.y - x.y)
      : new pv.Vector(this.x - x, this.y - y);
};

pv.Vector.prototype.dot = function(v) {
  return this.x * v.x + this.y * v.y;
};
