pv.Layout.Force = function() {
  pv.Layout.Network.call(this);

  /* Force-directed graphs can be messy, so reduce the link width. */
  this.link.lineWidth(function(d, p) { return Math.sqrt(p.linkValue) * 1.5; });
};

pv.Layout.Force.prototype = pv.extend(pv.Layout.Network)
    .property("bound", Boolean)
    .property("iterations", Number);

/** @private Initialize the physics simulation. */
pv.Layout.Force.prototype.init = function() {
  if (pv.Layout.Network.prototype.init.call(this)) return;
  var nodes = this.nodes(), links = this.links();

  /* Initialize positions using a random walk from the center. */
  var w = this.parent.width(),
      h = this.parent.height(),
      x = w / 2,
      y = h / 2;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i], angle = Math.random() * 2 * Math.PI;
    n.x = x += 10 * (w / h) * Math.cos(angle);
    n.y = y += 10 * (h / w) * Math.sin(angle);
  }

  /* Initialize the simulation. */
  var sim = pv.simulation(nodes);
  sim.force(pv.Force.drag());
  sim.force(pv.Force.charge());
  sim.force(pv.Force.spring().links(links));

  /* Optionally add bound constraint. TODO: better padding. */
  if (this.bound()) {
    sim.constraint(pv.Constraint.bound().x(6, w - 6).y(6, h - 6));
  }

  /*
   * If the iterations property is null (the default), the layout is
   * interactive. The simulation is run until the fastest particle drops below
   * an arbitrary minimum speed. Although the timer keeps firing, this speed
   * calculation is fast so there is minimal CPU overhead. Note: if a particle
   * is fixed for interactivity, treat this as a high speed and resume
   * simulation.
   */
  var n = this.iterations();
  if (n == null) {
    function speed(n) { return n.fixed ? 1 : n.vx * n.vx + n.vy * n.vy; }
    sim.step(); // compute initial velocities
    var v = 1, min = 1e-4 * (links.length + 1), parent = this.parent;
    setInterval(function() {
        if (v > min) {
          var then = Date.now();
          do { sim.step(); } while (Date.now() - then < 20);
          parent.render();
        }
        v = pv.max(nodes, speed);
      }, 42);
  } else for (var i = 0; i < n; i++) {
    sim.step();
  }
}
