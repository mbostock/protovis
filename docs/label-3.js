var vis = new pv.Panel()
    .width(150)
    .height(150);

vis.add(pv.Bar)
    .data([1, 1.2, 1.7, 1.5, .7])
    .bottom(10)
    .width(20)
    .height(function(d) d * 70)
    .left(function() this.index * 25 + 24);

vis.add(pv.Rule)
    .data(pv.range(4))
    .bottom(function(d) d / 2 * 70 + 10)
    .left(24)
    .right(6)
    .strokeStyle(function(d) (d > 0) ? "white" : "black")
  .add(pv.Label)
    .textAlign("right")
    .textBaseline("middle")
    .text(function(d) (d / 2).toFixed(1));

vis.render();
