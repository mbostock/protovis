new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Area)
    .data([[0, 1], [.5, 1.2], [.9, 1.7], [.5, 1.5], [.4, .7], [.3, .5], [.1, .2]])
    .bottom(function(d) d[0] * 80)
    .height(function(d) (d[1] - d[0]) * 80)
    .left(function() this.index * 25)
  .root.render();
