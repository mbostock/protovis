pv.Constraint = {};

pv.Constraint.Position = function(x, y) {
  this.x = x;
  this.y = y;
};

pv.Constraint.Position.prototype.bind = function(p) {
  this.constraints = {p: p, next: this.constraints};
  return this;
};

pv.Constraint.Position.prototype.apply = function() {
  var c = this.constraints;
  while (c) {
    c.p.x = this.x;
    c.p.y = this.y;
    c = c.next;
  }
};
