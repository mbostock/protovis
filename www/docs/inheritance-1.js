var vis = new pv.Panel()
    .width(150)
    .height(150);

vis.add(pv.Rule)
    .data(pv.range(0, 2, .5))
    .bottom(function(d) d * 80 + .5)
  .add(pv.Label); // inherits from rule

vis.add(pv.Bar)
    .data([1, 1.2, 1.7, 1.5, .7])
    .width(20)
    .height(function(d) d * 80)
    .bottom(0)
    .left(function() this.index * 25 + 25)
  .anchor("bottom") // inherits from bar
  .add(pv.Label); // inherits from anchor

vis.render();
