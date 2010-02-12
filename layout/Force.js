pv.Layout.force = function(nodes, links) {
  var sim;

  /** @private */
  function data() {
    if (!sim) {

      /* Initialize position using a random walk from the center. */
      var x = this.parent.width() / 2,
          y = this.parent.height() / 2;
      for (var i = 0, n, a; i < nodes.length; i++) {
        n = nodes[i];
        a = Math.random() * 2 * Math.PI;
        n.x = x += 4 * Math.cos(a);
        n.y = y += 4 * Math.sin(a);
      }

      sim = pv.simulation(nodes);
      sim.force(pv.Force.charge());
      sim.force(pv.Force.drag());
      sim.force(pv.Force.spring(links));
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

