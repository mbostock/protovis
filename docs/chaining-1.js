var vis = new pv.Panel()
    .width(150)
    .height(150);

var area = vis.add(pv.Area)
    .data([1, 1.2, 1.7, 1.5, .7, .5, .2])
    .bottom(0)
    .height(function(d) d * 40)
    .left(function() this.index * 25)
    .fillStyle("steelblue");

area.add(pv.Area)
    .data([.4, .2, .8, 1.2, 1.5, 1.1, .8])
    .bottom(function() area.bottom() + area.height())
    .fillStyle("lightsteelblue");

vis.render();
