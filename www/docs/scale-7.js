var data = pv.range(100).map(Math.random),
    w = 360,
    h  = 360,
    x = pv.Scale.linear(0, 100).range(0, w),
    y = pv.Scale.log(0.01, 1).range(0, h),
    c = pv.Scale.log(data).range("#1f77b4", "#ff7f0e");

var vis = new pv.Panel()
    .width(w)
    .height(h)
    .margin(20)
    .strokeStyle("#ccc");

vis.add(pv.Rule)
    .data(x.ticks())
    .strokeStyle("#eee")
    .left(x)
  .anchor("bottom").add(pv.Label)
    .text(x.tickFormat);

vis.add(pv.Rule)
    .data(y.ticks())
    .strokeStyle("#eee")
    .bottom(y)
  .anchor("right").add(pv.Label)
    .text(y.tickFormat);

vis.add(pv.Dot)
    .data(data)
    .left(function() x(this.index))
    .bottom(y)
    .strokeStyle(c)
    .fillStyle(function(d) c(d).alpha(.2));

vis.render();
