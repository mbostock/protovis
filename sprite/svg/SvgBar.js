pv.SvgBar = function() {};
pv.SvgBar.prototype = pv.extend(pv.SvgSprite);

pv.SvgBar.prototype.update = function() {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) svg = this.$svg = {rect: this.insert("rect")};
    delete svg.rect.style.display;
  } else {
    if (svg) svg.rect.style.display = "none";
    return;
  }

  /* rect */
  this.apply(svg.rect, {
      "cursor": this.cursor,
      "title": this.title,
      "x": this.left,
      "y": this.top,
      "width": Math.max(1E-10, this.width),
      "height": Math.max(1E-10, this.height),
      "fill": this.fillStyle,
      "stroke": this.strokeStyle,
      "stroke-width": this.strokeStyle ? this.lineWidth : 0
    });
};
