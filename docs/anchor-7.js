var vis = new pv.Panel().width(150).height(150);
var bar = vis.add(pv.Bar);
bar.anchor("top").add(pv.Label).text("top");
bar.anchor("left").add(pv.Label).text("left");
bar.anchor("right").add(pv.Label).text("right");
bar.anchor("bottom").add(pv.Label).text("bottom");
vis.render();
