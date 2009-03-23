pv.Gradient = function() {
  this.colors = [];
  this.$orientation = "vertical";
};

pv.Gradient.prototype.color = function(offset, color) {
  this.colors.push({ offset: offset, color: color });
  return this;
};

pv.Gradient.prototype.orientation = function(orientation) {
  this.$orientation = orientation;
  return this;
};

pv.Gradient.prototype.create = function(c, w, h) {
  switch (this.$orientation) {
    case "vertical": w = 0; break;
    case "horizontal": h = 0; break;
  }
  var g = c.createLinearGradient(0, 0, w, h);
  for (var i = 0; i < this.colors.length; i++) {
    var s = this.colors[i];
    g.addColorStop(s.offset, s.color);
  }
  return g;
};
