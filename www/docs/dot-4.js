new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Dot)
    .data([[.1, 1, .4], [.5, 1.2, .3], [.9, 1.7, .1],
           [.4, 1.5, 1], [.3, 1.4, 4], [.7, 2.2, 1]]
        .sort(function(a, b) b[2] - a[2]))
    .left(function(d) d[0] * 100)
    .bottom(function(d) d[1] * 50)
    .size(function(d) d[2] * 200)
    .strokeStyle("white")
    .fillStyle("rgba(30, 120, 180, .4)")
  .root.render();
