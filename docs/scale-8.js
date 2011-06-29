var categories = "ABCDEFGHIJK".split(""),
    data = categories.map(function(c) [c, Math.random()]),
    w = 160,
    h = 360,
    x = pv.Scale.ordinal(categories).splitBanded(0, w, 4/5),
    y = pv.Scale.linear(0, 1).range(0, h),
    c = pv.Colors.category19(categories);

var vis = new pv.Panel()
    .width(w)
    .height(h)
    .margin(20)
    .strokeStyle("#ccc");

vis.add(pv.Bar)
    .data(data)
    .left(function(d) x(d[0]))
    .width(x.range().band)
    .bottom(0)
    .height(function(d) y(d[1]))
    .fillStyle(function(d) c(d[0]))
  .anchor("bottom").add(pv.Label)
    .textBaseline("top")
    .text(function(d) d[0]);

vis.add(pv.Rule)
    .data(y.ticks())
    .strokeStyle("rgba(255, 255, 255, .5)")
    .bottom(y)
  .anchor("right").add(pv.Label)
    .text(y.tickFormat);

vis.render();
