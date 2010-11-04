new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Panel)
    .data([[1, 1.2, 1.7, 1.5, .7, .5, .2],
           [.4, .2, .8, 1.2, 1.5, 1.1, .8],
           [.4, .6, .8, .7, .6, .5, .8]])
  .add(pv.Area)
    .data(function(d) d)
    .bottom(function() {
        var c = this.cousin();
        return c ? c.bottom + c.height : 0;
      })
    .height(function(d) d * 40)
    .left(function() this.index * 25)
  .root.render();
