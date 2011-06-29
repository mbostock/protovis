new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Line)
    .data([1, 1.2, 1.7, 1.5, .7, .5, .2])
    .top(function(d) d * 80)
    .left(function() this.index * 20 + 15)
  .root.render();
