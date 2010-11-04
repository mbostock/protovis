var data = pv.range(3).map(function(i) {
    return pv.range(0, 10, .1).map(function(x) {
        return {x: x, y: i + Math.sin(x) + Math.random() * .5 + 2};
      });
  });

/* Chart dimensions and scales. */
var w = 400,
    h = 200,
    x = pv.Scale.linear(0, 9.9).range(0, w),
    y = pv.Scale.linear(0, 6).range(0, h),
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
    .visible(function(d) d > 0)
    .left(function(d) Math.round(x(d)) - .5)
    .strokeStyle(function(d) d ? "#eee" : "#000")
  .anchor("bottom").add(pv.Label)
    .text(function(d) d.toFixed());

/* A panel for each data series. */
var panel = vis.add(pv.Panel)
    .data(data);

/* The line. */
var line = panel.add(pv.Line)
    .data(function(d) d)
    .left(function(d) x(d.x))
    .bottom(function(d) y(d.y))
    .lineWidth(2);

/* The mouseover dots and label. */
line.add(pv.Dot)
    .visible(function() i >= 0)
    .data(function(d) [d[i]])
    .fillStyle(function() line.strokeStyle())
    .strokeStyle("#000")
    .size(20) 
    .lineWidth(1)
  .add(pv.Dot)
    .left(10)
    .bottom(function() this.parent.index * 12 + 10)
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
        i = pv.search(data[0].map(function(d) d.x), mx);
        i = i < 0 ? (-i - 2) : i;
        return vis;
      });

vis.render();
