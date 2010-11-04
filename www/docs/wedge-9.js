new pv.Panel()
    .width(150)
    .height(150)
  .add(pv.Wedge)
    .def("o", -1)
    .data(pv.normalize(pv.range(10).map(Math.random)))
    .outerRadius(65)
    .angle(function(d) d * 2 * Math.PI)
    .left(function() 75
        + Math.cos(this.startAngle() + this.angle() / 2)
        * ((this.o() == this.index) ? 10 : 0))
    .bottom(function() 75
        - Math.sin(this.startAngle() + this.angle() / 2)
        * ((this.o() == this.index) ? 10 : 0))
    .event("mouseover", function() this.o(this.index))
  .root.render();
