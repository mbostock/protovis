var vis = new pv.Panel()
    .width(150)
    .height(150);

var area = vis.add(pv.Area)
    .data([1, 1.2, 1.7, 1.5, .7, .5, .2])
    .bottom(function(d) d * 10 + 55)
    .height(function(d) d * 30)
    .left(function() this.index * 22 + 10)
    .fillStyle(pv.Colors.category20().by(pv.child));

area.anchor("bottom")
    .extend(area)
  .add(pv.Area)
    .data([.4, .2, .8, 1.2, 1.5, 1.1, .8]);

vis.render();
