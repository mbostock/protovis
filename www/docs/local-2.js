.def("i", -1)
.event("mouseover", function() this.i(this.index))
.event("mouseout", function() this.i(-1))
.fillStyle(function() this.i() == this.index ? "red" : "blue")
