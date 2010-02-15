pv.Matrix = function() {};
pv.Matrix.prototype.a = 1;
pv.Matrix.prototype.b = 0;
pv.Matrix.prototype.c = 0;
pv.Matrix.prototype.d = 1;
pv.Matrix.prototype.x = 0;
pv.Matrix.prototype.y = 0;

pv.Matrix.identity = function() {
  return new pv.Matrix();
};

pv.Matrix.translate = function(x, y) {
  var m = new pv.Matrix();
  m.x = x;
  m.y = y;
  return m;
};

pv.Matrix.rotate = function(a) {
  var m = new pv.Matrix();
  m.a = Math.cos(a);
  m.b = Math.sin(a);
  m.c = -m.b;
  m.d = m.a;
  return m;
};

pv.Matrix.scale = function(k) {
  var m = new pv.Matrix();
  m.a = k;
  m.d = k;
  return m;
};

pv.Matrix.prototype.times = function(m) {
  var v = new pv.Matrix();
  v.a = this.a * m.a + this.b * m.c;
  v.b = this.a * m.b + this.b * m.d;
  v.c = this.c * m.a + this.d * m.c;
  v.d = this.c * m.b + this.d * m.d;
  v.x = this.x * m.a + this.y * m.c + m.x;
  v.y = this.x * m.b + this.y * m.d + m.y;
  return v;
};

pv.Matrix.prototype.translate = function(x, y) {
  var v = new pv.Matrix();
  v.a = this.a;
  v.b = this.b;
  v.c = this.c;
  v.d = this.d;
  v.x = this.x + x;
  v.y = this.y + y;
  return v;
};

pv.Matrix.prototype.rotate = function(a) {
  var v = new pv.Matrix(), cos = Math.cos(a), sin = Math.sin(a);
  v.a = this.a * cos - this.b * sin;
  v.b = this.a * sin + this.b * cos;
  v.c = this.c * cos - this.d * sin;
  v.d = this.c * sin + this.d * cos;
  v.x = this.x * cos - this.y * sin;
  v.y = this.x * sin + this.y * cos;
  return v;
};

pv.Matrix.prototype.scale = function(k) {
  var v = new pv.Matrix();
  v.a = this.a * k;
  v.b = this.b * k;
  v.c = this.c * k;
  v.d = this.d * k;
  v.x = this.x * k;
  v.y = this.y * k;
  return v;
};

pv.Matrix.prototype.invert = function() {
  var v = new pv.Matrix(), di = 1 / (this.a * this.d - this.b * this.c);
  v.a = this.d * di;
  v.b = this.b * -di;
  v.c = this.c * -di;
  v.d = this.a * di;
  v.x = (this.y * this.c - this.x * this.d) * di;
  v.y = (this.x * this.b - this.y * this.a) * di;
  return v;
};
