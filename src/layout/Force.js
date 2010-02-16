pv.Layout.force = function(nodes, links) {
  var layout = {
          charge: pv.Force.charge(),
          drag: pv.Force.drag(),
          spring: pv.Force.spring()
        },
      sim;

  // TODO enforce panel bounds
  // TODO allow user to drag and drop nodes

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
      sim.force(layout.charge);
      sim.force(layout.drag);
      sim.force(layout.spring.links(links));
      sim.step();
    }
    return nodes;
  }

  layout.nodes = nodes = nodes.map(function(d, i) {
      return {nodeName: i, nodeValue: d, linkDegree: 0};
    });

  layout.links = links = links.map(function(d) {
      var s = nodes[d.source],
          t = nodes[d.target],
          v = isNaN(d.value) ? 1 : d.value;
      s.linkDegree += v;
      t.linkDegree += v;
      return {sourceNode: s, targetNode: t, linkValue: v};
    });

  layout.node = new pv.Mark()
      .data(data)
      .strokeStyle("#1f77b4")
      .fillStyle("#fff")
      .left(function(n) { return n.x; })
      .top(function(n) { return n.y; });

  layout.link = new pv.Mark().extend(layout.node)
      .data(function(p) { return [p.sourceNode, p.targetNode]; })
      .fillStyle(null)
      .lineWidth(function(d, p) { return Math.sqrt(p.linkValue) * 1.5; })
      .strokeStyle("rgba(0,0,0,.2)");

  layout.step = function() { sim.step(); };

  return layout;
};

