pv.Particle = function() {
  this.$im = 1;
  this.$p0 = pv.vector(0, 0);
  this.$p1 = pv.vector(0, 0);
  this.$f = pv.vector(0, 0);
};

pv.Particle.prototype.mass = function(m) {
  if (arguments.length) {
    this.$im = 1 / m;
    return this;
  }
  return 1 / this.$im;
};

pv.Particle.prototype.position = function(x, y) {
  var p0 = this.$p0, p1 = this.$p1;
  if (arguments.length) {
    p0.x = p1.x = x;
    p0.y = p1.y = y;
    return this;
  }
  return p1;
};
