new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Dot)
    .data([[.1, 1], [.5, 1.2], [.9, 1.7], [.2, 1.5], [.7, 2.2]])
    .left(function(d) d[0] * 150)
    .bottom(function(d) d[1] * 50)
  .root.render();
