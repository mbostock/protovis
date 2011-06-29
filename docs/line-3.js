new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Line)
    .data(pv.range(68))
    .bottom(function(i) 75 + i * Math.sin(6 * Math.PI * i / 100))
    .left(function(i) 75 + i * Math.cos(6 * Math.PI * i / 100))
  .add(pv.Dot)
  .root.render();
