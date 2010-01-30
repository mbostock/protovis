pv.simulation = function() {
  return new pv.Simulation();
};

pv.Simulation = function() {};

pv.Simulation.prototype.particle = function() {
  var p = new pv.Particle();
  p.$n = this.$p;
  return this.$p = p;
};

pv.Simulation.prototype.force = function(type) {
  var f = new type();
  f.$n = this.$f;
  return this.$f = f;
};

pv.Simulation.prototype.constraint = function(type) {
  var c = new type();
  c.$n = this.$c;
  return this.$c = c;
};

/** Randomize all particle positions with zero velocity. */
pv.Simulation.prototype.randomize = function() {
  var p = this.$p;
  while (p) {
    var p0 = p.$p0, p1 = p.$p1;
    p0.x = p1.x = Math.random();
    p0.y = p1.y = Math.random();
    p = p.$n;
  }
};

pv.Simulation.prototype.step = function() {
  var p, f, c;

  /* Reset forces. */
  p = this.$p;
  while (p) {
    f = p.$f;
    f.x = f.y = 0;
    p = p.$n;
  }

  /* Accumulate new forces. */
  f = this.$f;
  while (f) {
    f.apply(this.$p);
    f = f.$n;
  }

  /* Integrate using position verlet. */
  p = this.$p;
  var i = 0;
  while (p) {
    var p0 = p.$p0,
        p1 = p.$p1,
        f = p.$f,
        x = p1.x,
        y = p1.y,
        z = p.$im * timeStepSquared;
    p1.x += x - p0.x + f.x * z,
    p1.y += y - p0.y + f.y * z;
    p0.x = x;
    p0.y = y;
    p = p.$n;
  }

  /* Apply constraints. */
  c = this.$c;
  while (c) {
    c.apply(this.$p);
    c = c.$n;
  }
};

var timeStep = 1e-1, timeStepSquared = timeStep * timeStep;
