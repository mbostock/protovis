pv.Force = {};

pv.Force.Spring = function() {
  this.$k = 1;
  this.$d = 0;
  this.$l = 1;
};

pv.Force.Spring.prototype.constant = function(k) {
  if (arguments.length) {
    this.$k = k;
    return this;
  }
  return this.$k;
};

pv.Force.Spring.prototype.damping = function(d) {
  if (arguments.length) {
    this.$d = d;
    return this;
  }
  return this.$d;
};

pv.Force.Spring.prototype.length = function(l) {
  if (arguments.length) {
    this.$l = l;
    return this;
  }
  return this.$l;
};

pv.Force.Spring.prototype.add = function(a, b) {
  var s = [a, b];
  s.$n = this.$s;
  this.$s = s;
  return this;
};

pv.Force.Spring.prototype.apply = function() {
  var k = this.$k, d = this.$d, l = this.$l, s = this.$s;
  if (d == 0) { // optimize outside of loop if not damping
    while (s) {
      var a = s[0],
          b = s[1],
          dx = a.$p1.x - b.$p1.x,
          dy = a.$p1.y - b.$p1.y,
          dn = Math.sqrt(dx * dx + dy * dy),
          ks = -(k * (dn - l)) / dn,
          fx = dx * ks,
          fy = dy * ks,
          af = a.$f,
          bf = b.$f;
      if (dn > 0) { // TODO
        af.x += fx;
        af.y += fy;
        bf.x -= fx;
        bf.y -= fy;
      }
      s = s.$n;
    }
  } else {
    while (s) {
      var a = s[0],
          b = s[1],
          dx = a.$p1.x - b.$p1.x,
          dy = a.$p1.y - b.$p1.y,
          dn = Math.sqrt(dx * dx + dy * dy),
          vx = (dx - a.$p0.x + b.$p0.x) / timeStep,
          vy = (dy - a.$p0.y + b.$p0.y) / timeStep,
          ks = -(k * (dn - l) + d * (vx * dx + vy * dy) / dn) / dn,
          fx = dx * ks,
          fy = dy * ks,
          af = a.$f,
          bf = b.$f;
      if (dn > 0) { // TODO
        af.x += fx;
        af.y += fy;
        bf.x -= fx;
        bf.y -= fy;
      }
      s = s.$n;
    }
  }
};

pv.Force.Charge = function() {
  this.$k = -1;
};

pv.Force.Charge.prototype.constant = function(k) {
  if (arguments.length) {
    this.$k = k;
    return this;
  }
  return this.$k;
};

pv.Force.Charge.prototype.apply = function(p) {
  var k = this.$k, pa, pb;
  a = p;
  while (a) {
    b = a.$n;
    while (b) {
      var dx = a.$p1.x - b.$p1.x,
          dy = a.$p1.y - b.$p1.y,
          dn = Math.sqrt(dx * dx + dy * dy),
          kc = k / (dn * dn * dn),
          fx = dx * kc,
          fy = dy * kc,
          af = a.$f,
          bf = b.$f;
      if (dn > 1e-2) { // TODO deal with overly close particles
        af.x += fx;
        af.y += fy;
        bf.x -= fx;
        bf.y -= fy;
      }
      b = b.$n;
    }
    a = a.$n;
  }
};
