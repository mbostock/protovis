/**
 * Constructs a new empty simulation.
 *
 * @param {array} particles
 * @returns {pv.Simulation} a new simulation for the specified particles.
 * @see pv.Simulation
 */
pv.simulation = function(particles) {
  return new pv.Simulation(particles);
};

/**
 * Constructs a new simulation for the specified particles.
 *
 * @class Represents a particle simulation. Particles are massive points in
 * two-dimensional space. Forces can be applied to these particles, causing them
 * to move. Constraints can also be applied to restrict particle movement, for
 * example, constraining particles to a fixed position, or simulating collision
 * between circular particles with area.
 *
 * <p>The simulation uses <a
 * href="http://en.wikipedia.org/wiki/Verlet_integration">Position Verlet</a>
 * integration, due to the ease with which <a
 * href="http://www.teknikus.dk/tj/gdc2001.htm">geometric constraints</a> can be
 * implemented. For each time step, Verlet integration is performed, new forces
 * are accumulated, and then constraints are applied.
 *
 * <p>The simulation makes two simplifying assumptions: all particles are
 * equal-mass, and the time step of the simulation is fixed. It would be easy to
 * incorporate variable-mass particles as a future enhancement. Variable time
 * steps are also possible, but are likely to introduce instability in the
 * simulation.
 *
 * <p>This class can be used directly to simulate particle interaction.
 * Alternatively, for network diagrams, see {@link pv.Layout.Force}.
 *
 * @param {array} particles an array of {@link pv.Particle}s to simulate.
 * @see pv.Layout.Force
 * @see pv.Force
 * @see pv.Constraint
 */
pv.Simulation = function(particles) {
  for (var i = 0; i < particles.length; i++) this.particle(particles[i]);
};

/**
 * The particles in the simulation. Particles are stored as a linked list; this
 * field represents the first particle in the simulation.
 *
 * @field
 * @type pv.Particle
 * @name pv.Simulation.prototype.particles
 */

/**
 * The forces in the simulation. Forces are stored as a linked list; this field
 * represents the first force in the simulation.
 *
 * @field
 * @type pv.Force
 * @name pv.Simulation.prototype.forces
 */

/**
 * The constraints in the simulation. Constraints are stored as a linked list;
 * this field represents the first constraint in the simulation.
 *
 * @field
 * @type pv.Constraint
 * @name pv.Simulation.prototype.constraints
 */

/**
 * Adds the specified particle to the simulation.
 *
 * @param {pv.Particle} p the new particle.
 * @returns {pv.Simulation} this.
 */
pv.Simulation.prototype.particle = function(p) {
  p.next = this.particles;
  /* Default velocities and forces to zero if unset. */
  if (isNaN(p.px)) p.px = p.x;
  if (isNaN(p.py)) p.py = p.y;
  if (isNaN(p.fx)) p.fx = 0;
  if (isNaN(p.fy)) p.fy = 0;
  this.particles = p;
  return this;
};

/**
 * Adds the specified force to the simulation.
 *
 * @param {pv.Force} f the new force.
 * @returns {pv.Simulation} this.
 */
pv.Simulation.prototype.force = function(f) {
  f.next = this.forces;
  this.forces = f;
  return this;
};

/**
 * Adds the specified constraint to the simulation.
 *
 * @param {pv.Constraint} c the new constraint.
 * @returns {pv.Simulation} this.
 */
pv.Simulation.prototype.constraint = function(c) {
  c.next = this.constraints;
  this.constraints = c;
  return this;
};

/**
 * Apply constraints, and then set the velocities to zero.
 *
 * @returns {pv.Simulation} this.
 */
pv.Simulation.prototype.stabilize = function(n) {
  var c;
  if (!arguments.length) n = 3; // TODO use cooling schedule
  for (var i = 0; i < n; i++) {
    var q = new pv.Quadtree(this.particles);
    for (c = this.constraints; c; c = c.next) c.apply(this.particles, q);
  }
  for (var p = this.particles; p; p = p.next) {
    p.px = p.x;
    p.py = p.y;
  }
  return this;
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
    p.x += p.vx = ((p.x - px) + p.fx);
    p.y += p.vy = ((p.y - py) + p.fy);
  }

  /* Apply constraints, then accumulate new forces. */
  var q = new pv.Quadtree(this.particles);
  for (c = this.constraints; c; c = c.next) c.apply(this.particles, q);
  for (p = this.particles; p; p = p.next) p.fx = p.fy = 0;
  for (f = this.forces; f; f = f.next) f.apply(this.particles, q);
};
