/* TODO centralize font definition? */
/* TODO enable events, cursor, title? */

pv.SvgLabel = function() {};
pv.SvgLabel.prototype = pv.extend(pv.SvgSprite);

pv.SvgLabel.prototype.update = function() {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) {
      svg = this.$svg = {root: this.insert("text")};
      svg.root.setAttribute("pointer-events", "none");
      svg.root.appendChild(document.createTextNode(""));
    }
    delete svg.root.style.display;
  } else {
    if (svg) svg.root.style.display = "none";
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
  svg.root.firstChild.nodeValue = this.text;
  this.apply(svg.root, {
      "transform": "translate(" + this.left + "," + this.top + ")"
          + (this.textAngle ? " rotate(" + 180 * this.textAngle / Math.PI + ")" : ""),
      "style": "font:" + this.font + ";"
          + (this.textShadow ? "text-shadow:" + this.textShadow + ";" : ""),
      "fill": this.textStyle,
      "x": x,
      "y": y,
      "dy": dy,
      "text-anchor": anchor
    });
};
