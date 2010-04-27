/**
 * @class Force-directed network layout.
 * @extends pv.Layout.Network
 * @constructor
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
 * @type boolean
 * @name pv.Layout.Force.prototype.bound
 */

/**
 * @type number
 * @name pv.Layout.Force.prototype.iterations
 */

/**
 * @type number
 * @name pv.Layout.Force.prototype.dragConstant
 */

/**
 * @type number
 * @name pv.Layout.Force.prototype.chargeConstant
 */

/**
 * @type number
 * @name pv.Layout.Force.prototype.chargeMinDistance
 */

/**
 * @type number
 * @name pv.Layout.Force.prototype.chargeMaxDistance
 */

/**
 * @type number
 * @name pv.Layout.Force.prototype.chargeTheta
 */

/**
 * @type number
 * @name pv.Layout.Force.prototype.springConstant
 */

/**
 * @type number
 * @name pv.Layout.Force.prototype.springDamping
 */

/**
 * @type number
 * @name pv.Layout.Force.prototype.springLength
 */

pv.Layout.Force.prototype.defaults = new pv.Layout.Force()
    .extend(pv.Layout.Network.prototype.defaults)
    .dragConstant(.1)
    .chargeConstant(-40)
    .chargeMinDistance(2)
    .chargeMaxDistance(500)
    .chargeTheta(.9)
    .springConstant(.1)
    .springDamping(.1)
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
          var then = Date.now();
          do { f.sim.step(); } while (Date.now() - then < 20);
          render = true;
        }
      }
      if (render) that.parent.render();
    }, 42);
  } else for (var i = 0; i < k; i++) {
    sim.step();
  }
};
