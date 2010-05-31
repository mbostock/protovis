var vis = new pv.Panel()
    .width(150)
    .height(150);

var area = vis.add(pv.Area)
    .data([1, 1.2, 1.7, 1.5, .7, .5, .2])
    .left(0)
    .width(function(d) d * 40)
    .bottom(function() this.index * 25);

area.add(pv.Area)
    .data([.4, .2, .8, 1.2, 1.5, 1.1, .8])
    .left(function() area.left() + area.width())
  .add(pv.Line)
    .strokeStyle("white");

vis.render();
