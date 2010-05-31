var data = pv.range(0, 10, .1).map(function(x) {
        return {x: x, y: Math.sin(x) + Math.random() * .5 + 2};
      });

/* Chart dimensions and scales. */
var w = 400,
    h = 200,
    x = pv.Scale.linear(data, function(d) d.x).range(0, w),
    y = pv.Scale.linear(0, 4).range(0, h),
    i = -1;

/* The root panel. */
var vis = new pv.Panel()
    .width(w)
    .height(h)
    .bottom(20)
    .left(20)
    .right(10)
    .top(5);

/* Y-ticks. */
vis.add(pv.Rule)
    .data(y.ticks())
    .visible(function() !(this.index % 2))
    .bottom(function(d) Math.round(y(d)) - .5)
    .strokeStyle(function(d) d ? "#eee" : "#000")
  .anchor("left").add(pv.Label)
    .text(function(d) d.toFixed(1));

/* X-ticks. */
vis.add(pv.Rule)
    .data(x.ticks())
    .left(function(d) Math.round(x(d)) - .5)
    .strokeStyle(function(d) d ? "#eee" : "#000")
  .anchor("bottom").add(pv.Label)
    .text(function(d) x.tickFormat(d));

/* The line. */
var line = vis.add(pv.Line)
    .data(data)
    .left(function(d) x(d.x))
    .bottom(function(d) y(d.y))
    .lineWidth(2);

/* The mouseover dots and label. */
line.add(pv.Dot)
    .visible(function() i >= 0)
    .data(function() [data[i]])
    .fillStyle(function() line.strokeStyle())
    .strokeStyle("#000")
    .size(20)
    .lineWidth(1)
  .add(pv.Dot)
    .left(10)
    .bottom(10)
  .anchor("right").add(pv.Label)
    .text(function(d) d.y.toFixed(2));

/* An invisible bar to capture events (without flickering). */
vis.add(pv.Bar)
    .fillStyle("rgba(0,0,0,.001)")
    .event("mouseout", function() {
        i = -1;
        return vis;
      })
    .event("mousemove", function() {
        var mx = x.invert(vis.mouse().x);
        i = pv.search(data.map(function(d) d.x), mx);
        i = i < 0 ? (-i - 2) : i;
        return vis;
      });

vis.render();
