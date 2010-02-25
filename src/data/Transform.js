pv.Transform = function() {};
pv.Transform.prototype = {k: 1, x: 0, y: 0};

pv.Transform.identity = new pv.Transform();

pv.Transform.prototype.translate = function(x, y) {
  var v = new pv.Transform();
  v.k = this.k;
  v.x = this.x + x;
  v.y = this.y + y;
  return v;
};

pv.Transform.prototype.scale = function(k) {
  var v = new pv.Transform();
  v.k = this.k * k;
  v.x = this.x * k;
  v.y = this.y * k;
  return v;
};

pv.Transform.prototype.invert = function() {
  var v = new pv.Transform(), k = 1 / this.k;
  v.k = k;
  v.x = -this.x * k;
  v.y = -this.y * k;
  return v;
};
