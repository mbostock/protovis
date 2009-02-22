pv.Label = function() {
  pv.Mark.call(this);
  this.defineProperties(pv.Label.properties);
};

pv.Label.prototype = pv.Mark.extend();

pv.Label.properties = new pv.Mark.Properties();
pv.Label.properties.define("left");
pv.Label.properties.define("right");
pv.Label.properties.define("top");
pv.Label.properties.define("bottom");
pv.Label.properties.define("text", function(d) d);
pv.Label.properties.define("font", "10px Sans-Serif");
pv.Label.properties.define("textAngle", 0);
pv.Label.properties.define("textStyle", "black");
pv.Label.properties.define("textAlign", "left");
pv.Label.properties.define("textBaseline", "bottom");
pv.Label.properties.define("textMargin", 3);

pv.Label.toString = function() "label";

pv.Label.render = function(g) {
  var markState = this.renderState.marks[this.markIndex] = [];
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
    if (x == null) {
      x = g.canvas.width - this.$right(d);
    }

    var y = this.$top(d);
    if (y == null) {
      y = g.canvas.height - this.$bottom(d);
    }

    var font = this.$font(d);
    var text = this.$text(d);
    var textStyle = this.$textStyle(d);
    var textAlign = this.$textAlign(d);
    var textBaseline = this.$textBaseline(d);
    var textAngle = this.$textAngle(d);
    var textMargin = this.$textMargin(d);

    /* Text metrics. */
    g.save();
    g.font = font;

    /* Horizontal alignment. (The textAlign property requires Firefox 3.1.) */
    var ox = 0;
    switch (textAlign) {
      case "center": ox += -g.measureText(text).width / 2; break;
      case "right": ox += -g.measureText(text).width - textMargin; break;
      case "left": ox += textMargin; break;
    }

    /* Vertical alignment. (The textBaseline property requires Firefox 3.1.) */
    var oy = 0;
    function lineHeight(font) {
      return Number(/[0-9]+/.exec(font)[0]) * .68;
    }
    switch (textBaseline) {
      case "middle": oy += lineHeight(font) / 2; break;
      case "top": oy += lineHeight(font) + textMargin; break;
      case "bottom": oy -= textMargin; break;
    }

    g.translate(x, y);
    g.rotate(textAngle);
    g.fillStyle = textStyle;
    g.fillText(text, ox, oy);
    g.restore();

    markState[this.index] = {
      data : d,
      top : y,
      left : x,
      bottom : g.canvas.height - y,
      right : g.canvas.width - x,
      font : font,
      textStyle : textStyle,
      textAngle : textAngle,
      textMargin : textMargin,
    };

    this.visualization.index++;
  }
};
