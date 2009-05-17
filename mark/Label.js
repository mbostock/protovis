pv.Label = function() {
  pv.Mark.call(this);
};

pv.Label.toString = function() {
  return "label";
};

pv.Label.prototype = pv.extend(pv.Mark);
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

  switch (s.textBaseline) {
    case "middle": {
      v.removeAttribute("y");
      v.setAttribute("dy", ".4em");
      break;
    }
    case "top": {
      v.setAttribute("y", s.textMargin);
      v.setAttribute("dy", ".8em");
      break;
    }
    case "bottom": {
      v.setAttribute("y", -s.textMargin);
      v.removeAttribute("dy");
      break;
    }
  }

  switch (s.textAlign) {
    case "right": {
      v.setAttribute("text-anchor", "end");
      v.setAttribute("x", -s.textMargin);
      break;
    }
    case "center": {
      v.setAttribute("text-anchor", "middle");
      v.removeAttribute("x");
      break;
    }
    case "left": {
      v.setAttribute("text-anchor", "start");
      v.setAttribute("x", s.textMargin);
      break;
    }
  }

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
