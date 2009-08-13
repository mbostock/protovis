/* TODO centralize font definition? */

pv.SvgLabel = function() {};
pv.SvgLabel.prototype = pv.extend(pv.SvgSprite);

pv.SvgLabel.prototype.update = function() {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) {
      svg = this.$svg = {};
      svg.text = this.insert("text");
      svg.text.setAttribute("pointer-events", "none"); // TODO enable events, cursor, title?
      svg.text.appendChild(document.createTextNode(""));
    }
    delete svg.text.style.display;
  } else {
    if (svg) svg.text.style.display = "none";
    return;
  }

  /* text-baseline */
  var y = 0, dy = 0;
  switch (this.textBaseline) {
    case "middle": dy = ".35em"; break;
    case "top": dy = ".71em"; y = this.textMargin; break;
    case "bottom": y = "-" + this.textMargin; break;
  }

  /* text-align */
  var x = 0, anchor = "start";
  switch (this.textAlign) {
    case "right": anchor = "end"; x = "-" + this.textMargin; break;
    case "center": anchor = "middle"; break;
    case "left": x = this.textMargin; break;
  }

  /* text */
  svg.text.firstChild.nodeValue = this.text;
  this.apply(svg.text, {
      "transform": "translate(" + this.left + "," + this.top + ")"
          + (this.textAngle ? " rotate(" + 180 * this.textAngle / Math.PI + ")" : ""),
      "style": "font:" + this.font + ";"
          + (this.textShadow ? "text-shadow:" + this.textShadow + ":" : ""),
      "fill": this.textStyle,
      "x": x,
      "y": y,
      "dy": dy,
      "text-anchor": anchor
    });
};
