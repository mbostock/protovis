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

pv.Label.prototype.renderInstance = function(g, s) {
  g.save();
  g.font = s.font;

  /* Horizontal alignment. */
  var ox = 0;
  switch (s.textAlign) {
    case "center": ox += -g.measureText(s.text).width / 2; break;
    case "right": ox += -g.measureText(s.text).width - s.textMargin; break;
    case "left": ox += s.textMargin; break;
  }

  /* Vertical alignment. */
  var oy = 0;
  function lineHeight(font) {
    return Number(/[0-9]+/.exec(font)[0]) * .68;
  }
  switch (s.textBaseline) {
    case "middle": oy += lineHeight(s.font) / 2; break;
    case "top": oy += lineHeight(s.font) + s.textMargin; break;
    case "bottom": oy -= s.textMargin; break;
  }

  g.translate(s.left, s.top);
  g.rotate(s.textAngle);
  g.fillStyle = s.textStyle;
  g.fillText(s.text, ox, oy);
  g.restore();
};
