pv.Layout.Force = function() {
  pv.Layout.call(this);
  var that = this;

  this.node = new pv.Mark()
      .data(function() { return that.nodes(); })
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; });

  this.node.add = function(type) {
      var mark = that.parent.add(type).extend(this);
      mark.link = that.link;
      mark.node = that.node;
      return mark;
    };

  this.link = new pv.Mark()
      .extend(this.node)
      .data(function(p) { return [p.sourceNode, p.targetNode]; })
      .fillStyle(null)
      .lineWidth(function(d, p) { return Math.sqrt(p.linkValue) * 1.5; })
      .strokeStyle("rgba(0,0,0,.2)");

  this.link.add = function(type) {
      var mark = that.parent.add(pv.Panel)
          .data(function() { return that.links(); })
          .add(type).extend(this);
      mark.link = that.link;
      mark.node = that.node;
      return mark;
    };
};

pv.Layout.Force.prototype = pv.extend(pv.Layout)
    .property("nodes", function(v) {
        return v.map(function(d) {
            if (typeof d != "object") d = {nodeValue: d};
            d.linkDegree = 0;
            return d;
          });
      })
    .property("links", function(v) {
        return v.map(function(d) {
            if (isNaN(d.linkValue)) d.linkValue = isNaN(d.value) ? 1 : d.value;
            return d;
          });
      })
    .property("bound", Boolean)
    .property("iterations", Number);

/** @private Register an initialization hook after all properties. */
pv.Layout.Force.prototype.bind = function() {

  /** @private */
  function init() {
    var nodes = this.nodes(), links = this.links();
    if (nodes.sim) return;

    /* Lock nodes and links, so they're not reset on render. */
    this.scene.defs.locked.nodes = true;
    this.scene.defs.locked.links = true;

    /* Compute link degrees. */
    links.forEach(function(d) {
      var s = d.sourceNode || (d.sourceNode = nodes[d.source]),
          t = d.targetNode || (d.targetNode = nodes[d.target]),
          v = d.linkValue;
      s.linkDegree += v;
      t.linkDegree += v;
    });

    /* Initialize positions using a random walk from the center. */
    var w = this.parent.width(),
        h = this.parent.height(),
        x = w / 2,
        y = h / 2;
    for (var i = 0, n = nodes.length; i < n; i++) {
      var node = nodes[i], angle = Math.random() * 2 * Math.PI;
      node.x = x += 10 * (w / h) * Math.cos(angle);
      node.y = y += 10 * (h / w) * Math.sin(angle);
    }

    /* Initialize the simulation. */
    nodes.sim = pv.simulation(nodes);
    nodes.sim.force(pv.Force.drag());
    nodes.sim.force(pv.Force.charge());
    nodes.sim.force(pv.Force.spring().links(links));

    /* Add any custom constraints. */
    if (this.bound()) {
      nodes.sim.constraint(pv.Constraint.bound().x(6, w - 6).y(6, h - 6));
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
      nodes.sim.step(); // compute initial velocities
      var v = 1, min = 1e-4 * (links.length + 1), parent = this.parent;
      setInterval(function() {
          if (v > min) {
            var then = Date.now();
            do { nodes.sim.step(); } while (Date.now() - then < 20);
            parent.render();
          }
          v = pv.max(nodes, speed);
        }, 42);
    } else for (var i = 0; i < n; i++) {
      nodes.sim.step();
    }
  }

  this.def("init", init);
  pv.Layout.prototype.bind.call(this);
};
