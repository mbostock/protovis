pv.Constraint = {};

pv.Constraint.Position = function() {
  this.$x = 0;
  this.$y = 0;
};

pv.Constraint.Position.prototype.x = function(x) {
  if (arguments.length) {
    this.$x = x;
    return this;
  }
  return this.$x;
};

pv.Constraint.Position.prototype.y = function(y) {
  if (arguments.length) {
    this.$y = y;
    return this;
  }
  return this.$y;
};

pv.Constraint.Position.prototype.add = function(p) {
  this.$p = {p: p, n: this.$p};
  return this;
};

pv.Constraint.Position.prototype.apply = function() {
  var p = this.$p;
  while (p) {
    p.p.$p1.x = this.$x;
    p.p.$p1.y = this.$y;
    p = p.n;
  }
};
