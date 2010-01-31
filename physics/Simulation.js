/**
 * Constructs a new empty simulation.
 */
pv.simulation = function() {
  return new pv.Simulation();
};

/**
 * A particle simulation.
 *
 * @constructor Constructs a new empty simulation.
 */
pv.Simulation = function() {};

/**
 * @type pv.Particle
 * @field pv.Simulation.prototype.particles
 */

/**
 * @type pv.Constraint
 * @field pv.Simulation.prototype.constraint
 */

/**
 * @type pv.Force
 * @field pv.Simulation.prototype.forces
 */

/**
 * Adds a new particle to the simulation.
 *
 * @param {number} [m] optional mass; defaults to 1.
 * @return {pv.Particle} the new particle.
 */
pv.Simulation.prototype.particle = function(m) {
  var p = new pv.Particle(m);
  p.next = this.particles;
  return this.particles = p;
};

/**
 * Adds a new spring force to the simulation.
 *
 * @param {number} [k] optional spring constant; defaults to 1.
 * @return {pv.Force} the spring force.
 */
pv.Simulation.prototype.spring = function(k) {
  var f = new pv.Force.Spring(k);
  f.next = this.forces;
  return this.forces = f;
};

/**
 * Adds a new charge force to the simulation.
 *
 * @param {number} [k] optional charge constant; defaults to 1.
 * @return {pv.Force} the charge force.
 */
pv.Simulation.prototype.charge = function(k) {
  var f = new pv.Force.Charge(k);
  f.next = this.forces;
  return this.forces = f;
};

/**
 * Adds a new position constraint to the simulation.
 *
 * @param {number} x the <i>x</i>-coordinate of the position constraint.
 * @param {number} y the <i>y</i>-coordinate of the position constraint.
 * @return {pv.Constraint} the position constraint.
 */
pv.Simulation.prototype.position = function(x, y) {
  var c = new pv.Constraint.Position(x, y);
  c.next = this.constraints;
  return this.constraints = c;
};

/**
 * Advances the simulation one time-step.
 */
pv.Simulation.prototype.step = function() {
  var p, f, c;

  /* Reset forces. */
  p = this.particles;
  while (p) {
    p.fx = p.fy = 0;
    p = p.next;
  }

  /* Accumulate new forces. */
  f = this.forces;
  while (f) {
    f.apply(this.particles);
    f = f.next;
  }

  /* Integrate using position verlet. */
  p = this.particles;
  var i = 0;
  while (p) {
    var x = p.x,
        y = p.y,
        z = p.im * timeStepSquared;
    p.x = 2 * p.x - p.px + p.fx * z;
    p.y = 2 * p.y - p.py + p.fy * z;
    p.px = x;
    p.py = y;
    p = p.next;
  }

  /* Apply constraints. */
  c = this.constraints;
  while (c) {
    c.apply(this.particles);
    c = c.next;
  }
};

/* TODO Make these configurable. */
var epsilon = 1e-2,
    timeStep = 1e-1,
    timeStepSquared = timeStep * timeStep;
