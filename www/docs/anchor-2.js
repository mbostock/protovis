var vis = new pv.Panel()
    .width(150)
    .height(150);

var area = vis.add(pv.Area)
    .data([1, 1.2, 1.7, 1.5, .7, .5, .2])
    .bottom(10)
    .height(function(d) d * 60)
    .left(function() this.index * 20 + 10);

area.anchor("top").add(pv.Dot)
    .fillStyle("green");

area.anchor("bottom").add(pv.Dot)
    .fillStyle("red");

vis.render();
