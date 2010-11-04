var vis = new pv.Panel()
    .width(150)
    .height(150);

vis.add(pv.Bar)
    .data([1, 1.2, 1.7, 1.5, .7, .2])
    .bottom(0)
    .width(19)
    .height(function(d) d * 70)
    .left(function() this.index * 24 + 5);

vis.add(pv.Label)
    .left(75)
    .top(16)
    .textAlign("center")
    .text("Bar Heights Decline");

vis.render();
