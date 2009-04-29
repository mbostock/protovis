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

pv.Label.prototype.updateInstance = function(s) {
  var v = s.svg;
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "text");
    v.$text = document.createTextNode("");
    v.appendChild(v.$text);
    s.parent.svg.appendChild(v);
  }

  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  v.setAttribute("transform", "translate(" + s.left + "," + s.top + ")"
      + (s.textAngle ? " rotate(" + 180 * s.textAngle / Math.PI + ")" : ""));

  var dx = 0, dy = 0, a = "middle"; // fudge to match canvas behavior
  switch (s.textAlign) {
    case "right": {
      a = "end";
      dx -= s.textMargin;
      break;
    }
    case "left": {
      a = "start";
      dx += s.textMargin;
      break;
    }
  }
  function lineHeight(font) {
    return Number(/[0-9]+/.exec(font)[0]) * .68;
  }
  switch (s.textBaseline) {
    case "middle": dy += lineHeight(s.font) / 2; break;
    case "top": dy += lineHeight(s.font) + s.textMargin; break;
    case "bottom": dy -= s.textMargin; break;
  }
  v.setAttribute("x", dx);
  v.setAttribute("y", dy);
  v.setAttribute("text-anchor", a);

  /* TODO centralize font definition? */
  v.$text.nodeValue = s.text;
  v.setAttribute("style", "font:" + s.font + ";");

  /* TODO gradient, patterns? */
  var fill = new pv.Style(s.textStyle);
  v.setAttribute("fill", fill.color);
  v.setAttribute("fill-opacity", fill.opacity);

  /* TODO enable interaction on labels? centralize this definition? */
  v.setAttribute("pointer-events", "none");
};
