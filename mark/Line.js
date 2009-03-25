pv.Line = function() {
  pv.Mark.call(this);
};

pv.Line.toString = function() {
  return "line";
};

pv.Line.prototype = pv.Mark.extend();
pv.Line.prototype.type = pv.Line;
pv.Line.prototype.defineProperty("lineWidth");
pv.Line.prototype.defineProperty("strokeStyle");
pv.Line.prototype.defineProperty("fillStyle");

pv.Line.defaults = new pv.Line().extend(pv.Mark.defaults)
    .lineWidth(1.5)
    .strokeStyle(pv.Colors.category10);

pv.Line.prototype.render = function(g) {
  g.save();
  var move = true;

  for (var i = 0; i < this.scene.length; i++) {
    var s = this.scene[i];
    if (!s.visible) {
      continue; // TODO render fragment
    }

    if (move) {
      move = false;
      g.beginPath();
      g.moveTo(s.left, s.top);
    } else {
      g.lineTo(s.left, s.top);
    }
  }

  /* TODO variable fillStyle, strokeStyle, lineWidth */
  if (s) {
    if (s.fillStyle) {
      g.fillStyle = s.fillStyle;
      g.fill();
    }
    if (s.strokeStyle) {
      g.lineWidth = s.lineWidth;
      g.strokeStyle = s.strokeStyle;
      g.stroke();
    }
  }

  g.restore();
};
