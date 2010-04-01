/** @class Force-directed network layout. */
pv.Layout.Force = function() {
  pv.Layout.Network.call(this);
  /* Force-directed graphs can be messy, so reduce the link width. */
  this.link.lineWidth(function(d, p) { return Math.sqrt(p.linkValue) * 1.5; });
  this.label.textAlign("center");
};

pv.Layout.Force.prototype = pv.extend(pv.Layout.Network)
    .property("bound", Boolean)
    .property("iterations", Number);

/** @private Initialize the physics simulation. */
pv.Layout.Force.prototype.init = function() {

  /* Any cached interactive layouts need to be rebound for the timer. */
  if (pv.Layout.Network.prototype.init.call(this)) {
    var f = this.scene.$force;
    if (f) {
      f.next = this.binds.$force;
      this.binds.$force = f;
    }
    return;
  }

  var that = this,
      nodes = that.nodes(),
      links = that.links(),
      k = this.iterations(),
      x = that.parent.width() / 2,
      y = that.parent.height() / 2;

  /* Initialize positions randomly near the center. */
  for (var i = 0, n; i < nodes.length; i++) {
    n = nodes[i];
    if (isNaN(n.x)) n.x = x + Math.random() - .5;
    if (isNaN(n.y)) n.y = y + Math.random() - .5;
  }

  /* Initialize the simulation. */
  var sim = pv.simulation(nodes);
  sim.force(pv.Force.drag());
  sim.force(pv.Force.charge());
  sim.force(pv.Force.spring().links(links));
  sim.constraint(pv.Constraint.position());

  /* Optionally add bound constraint. TODO: better padding. */
  if (this.bound()) {
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
    var force = this.scene.$force = this.binds.$force = {
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
