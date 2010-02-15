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
 * Adds the specified particle to the simulation.
 *
 * @param {pv.Particle} p the new particle.
 * @return {pv.Particle} the new particle.
 */
pv.Simulation.prototype.particle = function(p) {
  p.next = this.particles;
  /* Default velocities and forces to zero if unset. */
  if (isNaN(p.vx)) p.vx = 0;
  if (isNaN(p.vy)) p.vy = 0;
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
 * Advances the simulation one time-step.
 */
pv.Simulation.prototype.step = function() {
  var p, f;

  /*
   * Assumptions:
   * - The mass (m) of every particles is 1.
   * - The time step (dt) is 1.
   */

  /* Compute position at +dt; compute velocity at +dt/2. */
  for (p = this.particles; p; p = p.next) {
    if (p.fixed) continue;
    p.x += p.vx + p.fx * .5;
    p.y += p.vy + p.fy * .5;
    p.pvx = p.vx + p.fx * .5;
    p.pvy = p.vy + p.fy * .5;
  }

  /* Reset and accumulate new forces. */
  for (p = this.particles; p; p = p.next) p.fx = p.fy = 0;
  for (f = this.forces; f; f = f.next) f.apply(this.particles);

  /* Compute velocity at +dt. */
  for (p = this.particles; p; p = p.next) {
    if (p.fixed) continue;
    p.vx = p.pvx + p.fx * .5;
    p.vy = p.pvy + p.fy * .5;
  }
};
