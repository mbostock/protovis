new pv.Panel()
    .width(660)
    .height(32)
  .add(pv.Bar)
    .data(pv.range(6))
    .left(function() this.index * 34)
    .width(32)
    .fillStyle(pv.colors("red", "orange", "yellow", "green", "blue", "violet"))
  .root.render();
