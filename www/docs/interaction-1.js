var vis = new pv.Panel()
    .def("i", -1)
    .width(150)
    .height(150);

vis.add(pv.Bar)
    .data([1, 1.2, 1.7, 1.5, .7, .2])
    .bottom(0)
    .width(20)
    .height(function(d) d * 80)
    .left(function() this.index * 25)
    .fillStyle(function() vis.i() == this.index ? "orange" : "steelblue")
    .event("mouseover", function() vis.i(this.index))
    .event("mouseout", function() vis.i(-1))
  .anchor("top").add(pv.Label)
    .visible(function() vis.i() >= 0)
    .textStyle("white");

vis.render();
