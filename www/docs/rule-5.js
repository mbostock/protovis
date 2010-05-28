var vis = new pv.Panel()
    .width(150)
    .height(150);

vis.add(pv.Bar)
    .data([1, 1.2, 1.7, 1.5, .7])
    .left(10)
    .height(20)
    .width(function(d) d * 70)
    .top(function() this.index * 25 + 15);

vis.add(pv.Rule)
    .data(pv.range(0, 2, .5))
    .left(function(d) d * 70 + 9.5)
    .strokeStyle(function(d) d ? "white" : "black");

vis.render();
