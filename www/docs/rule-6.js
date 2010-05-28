var vis = new pv.Panel()
    .width(150)
    .height(140)
    .bottom(10);

vis.add(pv.Bar)
    .data([1, 1.2, 1.7, 1.5, .7])
    .bottom(0)
    .width(20)
    .height(function(d) d * 70)
    .left(function() this.index * 25 + 15);

vis.add(pv.Rule)
    .bottom(0.5)
  .add(pv.Rule)
    .data(pv.range(.5, 2, .5))
    .bottom(function(d) d * 70 + .5)
    .left(0)
    .width(5);

vis.render();
