pv.Line = function() {
  pv.Mark.call(this);
  this.defineProperties(pv.Line.properties);
};

pv.Line.prototype = pv.Mark.extend();

pv.Line.properties = new pv.Mark.Properties();
pv.Line.properties.define("left");
pv.Line.properties.define("right");
pv.Line.properties.define("top");
pv.Line.properties.define("bottom");
pv.Line.properties.define("lineWidth", 1.5);
pv.Line.properties.define("strokeStyle", pv.Colors.category10());

pv.Line.toString = function() "line";

pv.Line.render = function(g) {
  var markState = this.renderState.marks[this.markIndex] = [];

  g.save();
  var move = true;
  for each (let d in this.$data()) {

    /* Skip invisible marks. */
    if (!this.$visible(d)) {
      markState[this.index] = {
        data : d,
        visible : false,
      };
      this.visualization.index++;
      continue;
    }

    var x = this.$left(d);
    if (x == undefined) {
      x = g.canvas.width - this.$right(d);
    }

    var y = this.$top(d);
    if (y == undefined) {
      y = g.canvas.height - this.$bottom(d);
    }

    if (move) {
      move = false;
      g.beginPath();
      g.moveTo(x, y);
    } else {
      g.lineTo(x, y);
    }

    markState[this.index] = {
      data : d,
      top : y,
      left : x,
      bottom : g.canvas.height - y,
      right : g.canvas.width - x,
    };

    this.visualization.index++;
  }

  var strokeStyle = this.$strokeStyle();
  if (strokeStyle) {
    g.lineWidth = this.$lineWidth();
    g.strokeStyle = strokeStyle;
    g.stroke();
  }
  g.restore();
};
