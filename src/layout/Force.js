pv.Layout.Force = function() {
  pv.Layout.call(this);
  var that = this;

  /** @private Initialize position using a random walk from the center. */
  function init() {
    var nodes = that.nodes(), links = that.links();
    if (nodes.sim) return;

    nodes.forEach(function(d, i) {
      nodes[i] = {nodeName: i, nodeValue: d, linkDegree: 0};
    });
    links.forEach(function(d, i) {
      var s = nodes[d.source],
          t = nodes[d.target],
          v = isNaN(d.value) ? 1 : d.value;
      s.linkDegree += v;
      t.linkDegree += v;
      links[i] = {sourceNode: s, targetNode: t, linkValue: v};
    });

    var x = this.parent.width() / 2,
        y = this.parent.height() / 2;
    for (var i = 0, n = nodes.length; i < n; i++) {
      var node = nodes[i], angle = Math.random() * 2 * Math.PI;
      node.x = x += 4 * Math.cos(angle);
      node.y = y += 4 * Math.sin(angle);
    }

    nodes.sim = pv.simulation(nodes);
    nodes.sim.force(pv.Force.drag());
    nodes.sim.force(pv.Force.charge());
    nodes.sim.force(pv.Force.spring().links(links));

    var i = 0, n = that.iterations();
    if (that.interactive()) {
      var t = setInterval(function() {
          if (i++ < n) {
            nodes.sim.step();
            that.root.render();
          } else {
            clearInterval(t);
          }
        }, 42);
    } else while (i++ < n) {
      nodes.sim.step();
    }
  }

  this.node = new pv.Mark()
      .def("init", init)
      .data(function() { return that.nodes(); })
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; });

  this.node.add = function(type) {
      var mark = that.add(type).extend(this);
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
      var mark = that.add(pv.Panel)
          .def("init", init)
          .data(function() { return that.links(); })
          .add(type).extend(this);
      mark.link = that.link;
      mark.node = that.node;
      return mark;
    };
};

pv.Layout.Force.prototype = pv.extend(pv.Layout)
    .property("nodes")
    .property("links")
    .property("interactive", Boolean)
    .property("iterations", Number);

pv.Layout.Force.prototype.defaults = new pv.Layout.Force()
    .extend(pv.Layout.prototype.defaults)
    .interactive(true)
    .iterations(200);
