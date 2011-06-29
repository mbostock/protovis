var vis = new pv.Panel()
    .width(150)
    .height(150);

vis.add(pv.Dot)
    .data([[.1, 1], [.5, 1.2], [.9, 1.7], [.2, 1.5], [.7, 2.2]])
    .left(function(d) d[0] * 100)
    .bottom(function(d) d[1] * 50)
  .anchor("right").add(pv.Label);

vis.render();
