pv.Layout.force = function(nodes, links) {
  var sim;

  /** @private */
  function data() {
    if (!sim) {
      sim = pv.simulation(nodes);
      sim.force(pv.Force.charge());
      sim.force(pv.Force.drag());
      sim.force(pv.Force.spring(links));

      /* Initialize the particle positions randomly. */
      var w = this.parent.width(), h = this.parent.height();
      for (var i = 0, n; i < nodes.length; i++) {
        n = nodes[i];
        n.x = w * Math.random();
        n.y = h * Math.random();
        n.vx = n.vy = n.fx = n.fy = 0;
      }
      sim.step();
    }
    return nodes;
  }

  nodes = nodes.map(function(d, i) { return {
      nodeName: i,
      nodeValue: d
    }; });

  links = links.map(function(d) { return {
      sourceNode: nodes[d.source],
      targetNode: nodes[d.target],
      linkValue: isNaN(d.value) ? 1 : d.value
    }; });

  var layout = {};

  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("white")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; });

  layout.link = new pv.Mark().extend(layout.node)
      .data(function(p) { return [p.sourceNode, p.targetNode]; })
      .fillStyle(null)
      .strokeStyle("rgba(0,0,0,.2)");

  layout.nodes = function() { return nodes; };
  layout.links = function() { data.call(this); return links; };
  layout.step = function() { sim.step(); };

  return layout;
};

