new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Panel)
    .data([1, 1.2, 1.7, 1.5, .7, .2])
    .left(function() this.index * 25)
  .add(pv.Bar)
    .bottom(0)
    .width(20)
    .height(function(d) d * 80)
    .def("fillStyle", "steelblue")
    .event("mouseover", function() this.fillStyle("orange")) // override
    .event("mouseout", function() this.fillStyle(undefined)) // restore
    .title(function() this.index)
  .root.render();
