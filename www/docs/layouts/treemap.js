var treemap = vis.add(pv.Layout.Treemap)
    .nodes(pv.dom(flare).nodes())
    .padding(6);

treemap.node.add(pv.Bar)
    .fillStyle(function(n) n.firstChild ? "rgba(31, 119, 180, .25)" : "#ff7f0e");

treemap.label.add(pv.Label)
    .visible(function(n) !n.firstChild);
