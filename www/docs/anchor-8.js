var vis = new pv.Panel().width(150).height(150);
var dot = vis.add(pv.Dot).left(75).top(75).size(1000);
dot.anchor("top").add(pv.Label).text("top");
dot.anchor("left").add(pv.Label).text("left");
dot.anchor("right").add(pv.Label).text("right");
dot.anchor("bottom").add(pv.Label).text("bottom");
dot.anchor("center").add(pv.Label).text("center");
vis.render();
