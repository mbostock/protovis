.def("y", function(d) pv.Scale.linear(0, pv.max(d.values)).range(0, h))
.height(function(d) this.y()(d))
