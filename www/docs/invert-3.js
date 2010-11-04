dot.add(pv.Dot)
    .left(10)
    .bottom(10)
  .anchor("right").add(pv.Label)
    .text(function(d) d.y.toFixed(2));
