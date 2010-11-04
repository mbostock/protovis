new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Dot)
    .data([[.1, 1, .4], [.5, 1.2, .3], [.9, 1.7, .1],
           [.4, 1.5, 1], [.3, 1.4, 4], [.7, 2.2, 1]])
    .left(function(d) d[0] * 150)
    .bottom(function(d) d[1] * 50)
    .size(function(d) d[2] * 400)
    .fillStyle("rgba(30, 120, 180, .4)")
  .anchor("center").add(pv.Label)
    .font(function(d) Math.sqrt(d[2]) * 20 + "px sans-serif")
    .text(function(d) d[2])
  .root.render();
