var tree = vis.add(pv.Layout.Tree)
    .nodes(pv.dom(flare).root("flare").nodes())
    .depth(110)
    .breadth(9.35)
    .orient("radial");

tree.link.add(pv.Line);
tree.node.add(pv.Dot);
tree.label.add(pv.Label);
