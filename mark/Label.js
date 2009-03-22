pv.Label = function() {
  pv.Mark.call(this);
};

pv.Label.toString = function() {
  return "label";
};

pv.Label.prototype = pv.Mark.extend();
pv.Label.prototype.type = pv.Label;
pv.Label.prototype.defineProperty("text");
pv.Label.prototype.defineProperty("font");
pv.Label.prototype.defineProperty("textAngle");
pv.Label.prototype.defineProperty("textStyle");
pv.Label.prototype.defineProperty("textAlign");
pv.Label.prototype.defineProperty("textBaseline");
pv.Label.prototype.defineProperty("textMargin");

pv.Label.defaults = new pv.Label().extend(pv.Mark.defaults)
    .text(pv.identity)
    .font("10px Sans-Serif")
    .textAngle(0)
    .textStyle("black")
    .textAlign("left")
    .textBaseline("bottom")
    .textMargin(3);

pv.Label.prototype.renderInstance = function(g, d) {
  var l = this.get("left");
  var r = this.get("right");
  var t = this.get("top");
  var b = this.get("bottom");

  var width = g.canvas.width - this.offset("right") - this.offset("left");
  if (l == null) {
    l = width - r;
  } else {
    r = width - l;
  }

  var height = g.canvas.height - this.offset("bottom") - this.offset("top");
  if (t == null) {
    t = height - b;
  } else {
    b = height - t;
  }

  var x = l + this.offset("left");
  var y = t + this.offset("top");

  var font = this.get("font");
  var text = this.get("text");
  var textStyle = this.get("textStyle");
  var textAlign = this.get("textAlign");
  var textBaseline = this.get("textBaseline");
  var textAngle = this.get("textAngle");
  var textMargin = this.get("textMargin");

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

  this.renderState[this.index] = {
      data : d,
      visible : true,
      top : t,
      left : l,
      bottom : b,
      right : r,
      font : font,
      textStyle : textStyle,
      textAngle : textAngle,
      textMargin : textMargin,
    };
};
