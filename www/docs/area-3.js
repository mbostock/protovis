new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Area)
    .data([1, 1.2, 1.7, 1.5, .7, .5, .2])
    .left(0)
    .width(function(d) d * 80)
    .bottom(function() this.index * 25)
  .root.render();
