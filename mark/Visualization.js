pv.Visualization = function() {
  pv.Mark.call(this);
  this.visualization = this;
  this.marks = [];
};

pv.Visualization.prototype = pv.Mark.extend();

pv.Visualization.prototype.add = function() {
  var o = pv.Mark.prototype.add.apply(this, arguments);
  o.markIndex = this.marks.length;
  this.marks.push(o);
  return o;
};

pv.Visualization.prototype.render = function(g) {
  g.save();
  g.clearRect(0, 0, g.canvas.width, g.canvas.height);
  this.renderState = { marks: [] };
  for each (let m in this.marks) {
    this.visualization.index = 0;
    m.type.render.call(m, g);
    delete this.visualization.index;
  }
  delete this.renderState;
  g.restore();
};
