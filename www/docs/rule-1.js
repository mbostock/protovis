var vis = new pv.Panel()
    .width(150)
    .height(150);

vis.add(pv.Bar)
    .data([1, 1.2, 1.7, 1.5, .7])
    .bottom(10)
    .width(20)
    .height(function(d) d * 70)
    .left(function() this.index * 25 + 15);

vis.add(pv.Rule)
    .bottom(9.5);

vis.render();
