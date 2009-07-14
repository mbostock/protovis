/**
 * Represents a text label.
 *
 * <p>No support for events.
 */
pv.Label = function() {
  pv.Mark.call(this);
};
pv.Label.prototype = pv.extend(pv.Mark);
pv.Label.prototype.type = pv.Label;
pv.Label.toString = function() { return "label"; };

/**
 *
 */
pv.Label.prototype.defineProperty("text");

/**
 * The default font is 10px sans-serif.
 *
 * @see http://www.w3.org/TR/CSS2/fonts.html#font-shorthand
 */
pv.Label.prototype.defineProperty("font");

/**
 *
 */
pv.Label.prototype.defineProperty("textAngle");

/**
 * The text color.
 */
pv.Label.prototype.defineProperty("textStyle");

/**
 * <ul>
 *
 * <li>left
 * <li>center
 * <li>right
 *
 * </ul>
 */
pv.Label.prototype.defineProperty("textAlign");

/**
 * <ul>
 *
 * <li>top
 * <li>middle
 * <li>bottom
 *
 * </ul>
 */
pv.Label.prototype.defineProperty("textBaseline");

/**
 *
 */
pv.Label.prototype.defineProperty("textMargin");

/**
 * A list of shoadw effects to be applied to text, per the CSS Text Level 3
 * text-shadow property. An example specification is "0.1em 0.1em 0.1em
 * rgba(0,0,0,.5)"; the first length is the horizontal offset, the second the
 * vertical offset, and the third the blur radius.
 *
 * @see http://www.w3.org/TR/css3-text/#text-shadow
 */
pv.Label.prototype.defineProperty("textShadow");

/**
 *
 */
pv.Label.defaults = new pv.Label().extend(pv.Mark.defaults)
    .text(pv.identity)
    .font("10px sans-serif")
    .textAngle(0)
    .textStyle("black")
    .textAlign("left")
    .textBaseline("bottom")
    .textMargin(3);

/**
 *
 */
pv.Label.prototype.updateInstance = function(s) {
  var v = s.svg;

  /* Create the svg:text element, if necessary. */
  if (s.visible && !v) {
    v = s.svg = document.createElementNS(pv.ns.svg, "text");
    v.$text = document.createTextNode("");
    v.appendChild(v.$text);
    s.parent.svg.appendChild(v);
  }

  /* cursor, title, events, visible, etc. */
  pv.Mark.prototype.updateInstance.call(this, s);
  if (!s.visible) return;

  /* left, top, angle */
  v.setAttribute("transform", "translate(" + s.left + "," + s.top + ")"
      + (s.textAngle ? " rotate(" + 180 * s.textAngle / Math.PI + ")" : ""));

  /* text-baseline */
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

  /* text-align */
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

  /* font, text-shadow TODO centralize font definition? */
  v.$text.nodeValue = s.text;
  var style = "font:" + s.font + ";";
  if (s.textShadow) {
    style += "text-shadow:" + s.textShadow +";";
  }
  v.setAttribute("style", style);

  /* fill */
  var fill = pv.color(s.textStyle);
  v.setAttribute("fill", fill.color);
  v.setAttribute("fill-opacity", fill.opacity);

  /* TODO enable interaction on labels? centralize this definition? */
  v.setAttribute("pointer-events", "none");
};
