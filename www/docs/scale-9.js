var categories = "ABCDEF".split(""),
    data = pv.range(100).map(function(d, i) [Math.random(), categories[i % 6]]),
    w = 160,
    h = 360,
    x = pv.Scale.ordinal(categories).split(0, w),
    y = pv.Scale.linear(0, 1).range(0, h),
    c = pv.Scale.linear(0, .5, 1).range("red", "yellow", "green");

var vis = new pv.Panel()
    .width(w)
    .height(h)
    .margin(20)
    .strokeStyle("#ccc");

vis.add(pv.Rule)
    .data(categories)
    .strokeStyle("#eee")
    .left(x)
  .anchor("bottom").add(pv.Label);

vis.add(pv.Rule)
    .data(y.ticks())
    .strokeStyle("#eee")
    .bottom(y)
  .anchor("right").add(pv.Label);

vis.add(pv.Dot)
    .data(data)
    .left(function(d) x(d[1]))
    .bottom(function(d) y(d[0]))
    .strokeStyle(function(d) c(d[0]))
    .fillStyle(function(d) c(d[0]).alpha(.2));

vis.render();
