/**
 * Constructs a new, empty force-directed layout. Layouts are not typically
 * constructed directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implements force-directed network layout as a node-link diagram. This
 * layout uses the Fruchterman-Reingold algorithm, which applies an attractive
 * spring force between neighboring nodes, and a repulsive electrical charge
 * force between all nodes. An additional drag force improves stability of the
 * simulation. See {@link pv.Force.spring}, {@link pv.Force.drag} and {@link
 * pv.Force.charge} for more details; note that the n-body charge force is
 * approximated using the Barnes-Hut algorithm.
 *
 * <p>This layout is implemented on top of {@link pv.Simulation}, which can be
 * used directly for more control over simulation parameters. The simulation
 * uses Position Verlet integration, which does not compute velocities
 * explicitly, but allows for easy geometric constraints, such as bounding the
 * nodes within the layout panel. Many of the configuration properties supported
 * by this layout are simply passed through to the underlying forces and
 * constraints of the simulation.
 *
 * <p>Force layouts are typically interactive. The gradual movement of the nodes
 * as they stabilize to a local stress minimum can help reveal the structure of
 * the network, as can {@link pv.Behavior.drag}, which allows the user to pick
 * up nodes and reposition them while the physics simulation continues. This
 * layout can also be used with pan &amp; zoom behaviors for interaction.
 *
 * <p>To facilitate interaction, this layout by default automatically re-renders
 * using a <tt>setInterval</tt> every 42 milliseconds. This can be disabled via
 * the <tt>iterations</tt> property, which if non-null specifies the number of
 * simulation iterations to run before the force-directed layout is finalized.
 * Be careful not to use too high an iteration count, as this can lead to an
 * annoying delay on page load.
 *
 * <p>As with other network layouts, the network data can be updated
 * dynamically, provided the property cache is reset. See
 * {@link pv.Layout.Network} for details. New nodes are initialized with random
 * positions near the center. Alternatively, positions can be specified manually
 * by setting the <tt>x</tt> and <tt>y</tt> attributes on nodes.
 *
 * @extends pv.Layout.Network
 * @see <a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.13.8444&rep=rep1&type=pdf"
 * >"Graph Drawing by Force-directed Placement"</a> by T. Fruchterman &amp;
 * E. Reingold, Software--Practice &amp; Experience, November 1991.
 */
pv.Layout.Force = function() {
  pv.Layout.Network.call(this);

  /* Force-directed graphs can be messy, so reduce the link width. */
  this.link.lineWidth(function(d, p) { return Math.sqrt(p.linkValue) * 1.5; });
  this.label.textAlign("center");
};

pv.Layout.Force.prototype = pv.extend(pv.Layout.Network)
    .property("bound", Boolean)
    .property("iterations", Number)
    .property("dragConstant", Number)
    .property("chargeConstant", Number)
    .property("chargeMinDistance", Number)
    .property("chargeMaxDistance", Number)
    .property("chargeTheta", Number)
    .property("springConstant", Number)
    .property("springDamping", Number)
    .property("springLength", Number);

/**
 * The bound parameter; true if nodes should be constrained within the layout
 * panel. Bounding is disabled by default. Currently the layout does not observe
 * the radius of the nodes; strictly speaking, only the center of the node is
 * constrained to be within the panel, with an additional 6-pixel offset for
 * padding. A future enhancement could extend the bound constraint to observe
 * the node's radius, which would also support bounding for variable-size nodes.
 *
 * <p>Note that if this layout is used in conjunction with pan &amp; zoom
 * behaviors, those behaviors should have their bound parameter set to the same
 * value.
 *
 * @type boolean
 * @name pv.Layout.Force.prototype.bound
 */

/**
 * The number of simulation iterations to run, or null if this layout is
 * interactive. Force-directed layouts are interactive by default, using a
 * <tt>setInterval</tt> to advance the physics simulation and re-render
 * automatically.
 *
 * @type number
 * @name pv.Layout.Force.prototype.iterations
 */

/**
 * The drag constant, in the range [0,1]. A value of 0 means no drag (a
 * perfectly frictionless environment), while a value of 1 means friction
 * immediately cancels all momentum. The default value is 0.1, which provides a
 * minimum amount of drag that helps stabilize bouncy springs; lower values may
 * result in excessive bounciness, while higher values cause the simulation to
 * take longer to converge.
 *
 * @type number
 * @name pv.Layout.Force.prototype.dragConstant
 * @see pv.Force.drag#constant
 */

/**
 * The charge constant, which should be a negative number. The default value is
 * -40; more negative values will result in a stronger repulsive force, which
 * may lead to faster convergence at the risk of instability. Too strong
 * repulsive charge forces can cause comparatively weak springs to be stretched
 * well beyond their rest length, emphasizing global structure over local
 * structure. A nonnegative value will break the Fruchterman-Reingold algorithm,
 * and is for entertainment purposes only.
 *
 * @type number
 * @name pv.Layout.Force.prototype.chargeConstant
 * @see pv.Force.charge#constant
 */

/**
 * The minimum distance at which charge forces are applied. The default minimum
 * distance of 2 avoids applying forces that are two strong; because the physics
 * simulation is run at discrete time intervals, it is possible for two same-
 * charged particles to become very close or even a singularity! Since the
 * charge force is inversely proportional to the square of the distance, very
 * small distances can break the simulation.
 *
 * <p>In rare cases, two particles can become stuck on top of each other, as a
 * minimum distance threshold will prevent the charge force from repelling them.
 * However, this occurs very rarely because other forces and momentum typically
 * cause the particles to become separated again, at which point the repulsive
 * charge force kicks in.
 *
 * @type number
 * @name pv.Layout.Force.prototype.chargeMinDistance
 * @see pv.Force.charge#domain
 */

/**
 * The maximum distance at which charge forces are applied. This improves
 * performance by ignoring weak charge forces at great distances. Note that this
 * parameter is partly redundant, as the Barnes-Hut algorithm for n-body forces
 * already improves performance for far-away particles through approximation.
 *
 * @type number
 * @name pv.Layout.Force.prototype.chargeMaxDistance
 * @see pv.Force.charge#domain
 */

/**
 * The Barnes-Hut approximation factor. The Barnes-Hut approximation criterion
 * is the ratio of the size of the quadtree node to the distance from the point
 * to the node's center of mass is beneath some threshold. The default value is
 * 0.9.
 *
 * @type number
 * @name pv.Layout.Force.prototype.chargeTheta
 * @see pv.Force.charge#theta
 */

/**
 * The spring constant, which should be a positive number. The default value is
 * 0.1; greater values will result in a stronger attractive force, which may
 * lead to faster convergence at the risk of instability. Too strong spring
 * forces can cause comparatively weak charge forces to be ignored, emphasizing
 * local structure over global structure. A nonpositive value will break the
 * Fruchterman-Reingold algorithm, and is for entertainment purposes only.
 *
 * <p>The spring tension is automatically normalized using the inverse square
 * root of the maximum link degree of attached nodes.
 *
 * @type number
 * @name pv.Layout.Force.prototype.springConstant
 * @see pv.Force.spring#constant
 */

/**
 * The spring damping factor, in the range [0,1]. Damping functions identically
 * to drag forces, damping spring bounciness by applying a force in the opposite
 * direction of attached nodes' velocities. The default value is 0.3.
 *
 * <p>The spring damping is automatically normalized using the inverse square
 * root of the maximum link degree of attached nodes.
 *
 * @type number
 * @name pv.Layout.Force.prototype.springDamping
 * @see pv.Force.spring#damping
 */

/**
 * The spring rest length. The default value is 20 pixels. Larger values may be
 * appropriate if the layout panel is larger, or if the nodes are rendered
 * larger than the default dot size of 20.
 *
 * @type number
 * @name pv.Layout.Force.prototype.springLength
 * @see pv.Force.spring#length
 */

/**
 * Default properties for force-directed layouts. The default drag constant is
 * 0.1, the default charge constant is -40 (with a domain of [2, 500] and theta
 * of 0.9), and the default spring constant is 0.1 (with a damping of 0.3 and a
 * rest length of 20).
 *
 * @type pv.Layout.Force
 */
pv.Layout.Force.prototype.defaults = new pv.Layout.Force()
    .extend(pv.Layout.Network.prototype.defaults)
    .dragConstant(.1)
    .chargeConstant(-40)
    .chargeMinDistance(2)
    .chargeMaxDistance(500)
    .chargeTheta(.9)
    .springConstant(.1)
    .springDamping(.3)
    .springLength(20);

/** @private Initialize the physics simulation. */
pv.Layout.Force.prototype.buildImplied = function(s) {

  /* Any cached interactive layouts need to be rebound for the timer. */
  if (pv.Layout.Network.prototype.buildImplied.call(this, s)) {
    var f = s.$force;
    if (f) {
      f.next = this.binds.$force;
      this.binds.$force = f;
    }
    return;
  }

  var that = this,
      nodes = s.nodes,
      links = s.links,
      k = s.iterations,
      w = s.width,
      h = s.height;

  /* Initialize positions randomly near the center. */
  for (var i = 0, n; i < nodes.length; i++) {
    n = nodes[i];
    if (isNaN(n.x)) n.x = w / 2 + 40 * Math.random() - 20;
    if (isNaN(n.y)) n.y = h / 2 + 40 * Math.random() - 20;
  }

  /* Initialize the simulation. */
  var sim = pv.simulation(nodes);

  /* Drag force. */
  sim.force(pv.Force.drag(s.dragConstant));

  /* Charge (repelling) force. */
  sim.force(pv.Force.charge(s.chargeConstant)
      .domain(s.chargeMinDistance, s.chargeMaxDistance)
      .theta(s.chargeTheta));

  /* Spring (attracting) force. */
  sim.force(pv.Force.spring(s.springConstant)
      .damping(s.springDamping)
      .length(s.springLength)
      .links(links));

  /* Position constraint (for interactive dragging). */
  sim.constraint(pv.Constraint.position());

  /* Optionally add bound constraint. TODO: better padding. */
  if (s.bound) {
    sim.constraint(pv.Constraint.bound().x(6, w - 6).y(6, h - 6));
  }

  /** @private Returns the speed of the given node, to determine cooling. */
  function speed(n) {
    return n.fix ? 1 : n.vx * n.vx + n.vy * n.vy;
  }

  /*
   * If the iterations property is null (the default), the layout is
   * interactive. The simulation is run until the fastest particle drops below
   * an arbitrary minimum speed. Although the timer keeps firing, this speed
   * calculation is fast so there is minimal CPU overhead. Note: if a particle
   * is fixed for interactivity, treat this as a high speed and resume
   * simulation.
   */
  if (k == null) {
    sim.step(); // compute initial previous velocities
    sim.step(); // compute initial velocities

    /* Add the simulation state to the bound list. */
    var force = s.$force = this.binds.$force = {
      next: this.binds.$force,
      nodes: nodes,
      min: 1e-4 * (links.length + 1),
      sim: sim
    };

    /* Start the timer, if not already started. */
    if (!this.$timer) this.$timer = setInterval(function() {
      var render = false;
      for (var f = that.binds.$force; f; f = f.next) {
        if (pv.max(f.nodes, speed) > f.min) {
          f.sim.step();
          render = true;
        }
      }
      if (render) that.render();
    }, 42);
  } else for (var i = 0; i < k; i++) {
    sim.step();
  }
};
