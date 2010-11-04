function scale(t) {
  return (typeof flowers[0][t] == "number")
      ? pv.Scale.linear(flowers, function(d) d[t]).range(0, s)
      : pv.Scale.ordinal(flowers, function(d) d[t]).split(0, s);
}

var s = 100,
    p = 5,
    keys = pv.keys(flowers[0]);

var vis = new pv.Panel()
    .width(keys.length * (s + 2 * p))
    .height(keys.length * (s + 2 * p));

var cell = vis.add(pv.Panel)
    .data(keys)
    .width(s)
    .left(function() this.index * (s + 2 * p) + p)
  .add(pv.Panel)
    .data(keys)
    .height(s)
    .top(function() this.index * (s + 2 * p) + p)
    .strokeStyle("#ccc");

cell.add(pv.Dot)
    .def("x", function(k0, k1) scale(k0))
    .def("y", function(k0, k1) scale(k1))
    .data(flowers)
    .left(function(d, k0, k1) this.x()(d[k0]))
    .bottom(function(d, k0, k1) this.y()(d[k1]))
    .strokeStyle(pv.Colors.category10().by(function(d) d.species));

vis.render();
