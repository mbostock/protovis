pv.SvgBar = function() {};
pv.SvgBar.prototype = pv.extend(pv.SvgSprite);

pv.SvgBar.prototype.update = function() {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) {
      svg = this.$svg = {};
      svg.title = this.insert("a");
      svg.title.appendChild(svg.rect = this.create("rect"));
    }
    delete svg.title.style.display;
  } else {
    if (svg) svg.title.style.display = "none";
    return;
  }

  /* title */
  this.apply(svg.title, {"title": this.title});

  /* rect */
  this.apply(svg.rect, {
      "cursor": this.cursor,
      "x": this.left,
      "y": this.top,
      "width": Math.max(1E-10, this.width),
      "height": Math.max(1E-10, this.height),
      "fill": this.fillStyle,
      "stroke": this.strokeStyle,
      "stroke-width": this.lineWidth
    });
};
