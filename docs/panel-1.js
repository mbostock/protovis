new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Panel)
    .data([[1, 1.2, 1.7, 1.5, .7, .5, .2],
           [.4, .2, .8, 1.2, 1.5, 1.1, .8]])
    .left(function() this.index * 10)
  .add(pv.Bar)
    .data(function(array) array)
    .bottom(0)
    .width(10)
    .height(function(d) d * 80)
    .left(function() this.index * 25)
  .root.render();
