var vis = new pv.Panel()
    .width(150)
    .height(150);

var area = vis.add(pv.Area)
    .data([1, 1.2, 1.7, 1.5, .7, .5, .2])
    .left(10)
    .width(function(d) d * 60)
    .bottom(function() this.index * 20 + 10);

area.anchor("right").add(pv.Line).strokeStyle("green");
area.anchor("left").add(pv.Line).strokeStyle("red");

vis.render();
