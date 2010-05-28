new pv.Panel()
    .width(340)
    .height(32)
  .add(pv.Bar)
    .data(pv.range(0, 1, 1/85))
    .left(function() this.index * 4)
    .width(4)
    .fillStyle(pv.ramp('black', 'white'))
  .root.render();
