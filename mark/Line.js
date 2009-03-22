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

pv.Line.defaults = new pv.Line().extend(pv.Mark.defaults)
    .lineWidth(1.5)
    .strokeStyle(pv.Colors.category10);

pv.Line.prototype.render = function(g) {
  this.renderState = [];
  if (this.get("visible")) {

    g.save();
    var move = true;
    var data = this.get("data");
    this.root.renderData.unshift(null);

    this.index = -1;
    for (var i = 0, d; i < data.length; i++) {
      pv.Mark.prototype.index = ++this.index;
      this.root.renderData[0] = d = data[i];

      var l = this.get("left");
      var r = this.get("right");
      var t = this.get("top");
      var b = this.get("bottom");

      var width = g.canvas.width - this.offset("right") - this.offset("left");
      var height = g.canvas.height - this.offset("bottom") - this.offset("top");
      if (l == null) {
        l = width - r;
      } else {
        r = width - l;
      }
      if (t == null) {
        t = height - b;
      } else {
        b = height - t;
      }

      var x = l + this.offset("left");
      var y = t + this.offset("top");

      if (move) {
        move = false;
        g.beginPath();
        g.moveTo(x, y);
      } else {
        g.lineTo(x, y);
      }

      this.renderState[this.index] = {
          data : d,
          visible : true,
          top : t,
          left : l,
          bottom : b,
          right : r,
        };
    }
  }
  delete this.index;
  pv.Mark.prototype.index = -1;

  var strokeStyle = this.get("strokeStyle");
  if (strokeStyle) {
    g.lineWidth = this.get("lineWidth");
    g.strokeStyle = strokeStyle;
    g.stroke();
  }

  this.root.renderData.shift();
  g.restore();
};
