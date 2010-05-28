new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Line)
    .data(pv.range(0, 2 * Math.PI, .01))
    .left(function(d) Math.cos(d) * (Math.cos(d * 5) + 5) * 10 + 75)
    .top(function(d) Math.sin(d) * (Math.cos(d * 5) + 5) * 10 + 75)
    .fillStyle("orange")
  .root.render();
