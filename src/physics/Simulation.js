/**
 * Constructs a new empty simulation.
 */
pv.simulation = function(particles) {
  return new pv.Simulation(particles);
};

/**
 * A particle simulation.
 *
 * @constructor Constructs a new empty simulation.
 */
pv.Simulation = function(particles) {
  for (var i = 0; i < particles.length; i++) this.particle(particles[i]);
};

/**
 * The particles in the simulation. Particles are stored as a linked list; this
 * field represents the first particle in the simulation.
 *
 * @type pv.Particle
 * @field pv.Simulation.prototype.particles
 */

/**
 * The forces in the simulation. Forces are stored as a linked list; this field
 * represents the first force in the simulation.
 *
 * @type pv.Force
 * @field pv.Simulation.prototype.forces
 */

/**
 * The constraints in the simulation. Constraints are stored as a linked list;
 * this field represents the first constraint in the simulation.
 *
 * @type pv.Constraint
 * @field pv.Simulation.prototype.constraints
 */

/**
 * Adds the specified particle to the simulation.
 *
 * @param {pv.Particle} p the new particle.
 * @return {pv.Particle} the new particle.
 */
pv.Simulation.prototype.particle = function(p) {
  p.next = this.particles;
  /* Default velocities and forces to zero if unset. */
  if (isNaN(p.px)) p.px = p.x;
  if (isNaN(p.py)) p.py = p.y;
  if (isNaN(p.fx)) p.fx = 0;
  if (isNaN(p.fy)) p.fy = 0;
  return this.particles = p;
};

/**
 * Adds the specified force to the simulation.
 *
 * @param {pv.Force} f the new force.
 * @return {pv.Force} the new force.
 */
pv.Simulation.prototype.force = function(f) {
  f.next = this.forces;
  return this.forces = f;
};

/**
 * Adds the specified constraint to the simulation.
 *
 * @param {pv.Constraint} c the new constraint.
 * @return {pv.Constraint} the new constraint.
 */
pv.Simulation.prototype.constraint = function(c) {
  c.next = this.constraints;
  return this.constraints = c;
};

/**
 * Advances the simulation one time-step.
 */
pv.Simulation.prototype.step = function() {
  var p, f, c;

  /*
   * Assumptions:
   * - The mass (m) of every particles is 1.
   * - The time step (dt) is 1.
   */

  /* Position Verlet integration. */
  for (p = this.particles; p; p = p.next) {
    var px = p.px, py = p.py;
    p.px = p.x;
    p.py = p.y;
    if (p.fixed) continue;
    p.x += p.vx = ((p.x - px) + p.fx);
    p.y += p.vy = ((p.y - py) + p.fy);
  }

  /* Reset and accumulate new forces. */
  var q = new pv.Quadtree(this.particles);
  for (p = this.particles; p; p = p.next) p.fx = p.fy = 0;
  for (f = this.forces; f; f = f.next) f.apply(this.particles, q);

  /* Apply constraints. */
  for (c = this.constraints; c; c = c.next) c.apply(this.particles, q);
  q.dispose();
};
