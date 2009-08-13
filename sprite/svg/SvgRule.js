pv.SvgRule = function() {};
pv.SvgRule.prototype = pv.extend(pv.SvgSprite);

pv.SvgRule.prototype.update = function() {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) {
      svg = this.$svg = {};
      svg.title = this.insert("a");
      svg.title.appendChild(svg.line = this.create("line"));
    }
    delete svg.title.style.display;
  } else {
    if (svg) svg.title.style.display = "none";
    return;
  }

  /* title */
  this.apply(svg.title, {"title": this.title});

  /* line */
  this.apply(svg.line, {
      "cursor": this.cursor,
      "x1": this.left,
      "y1": this.top,
      "x2": this.left + this.width,
      "y2": this.top + this.height,
      "stroke": this.strokeStyle,
      "stroke-width": this.lineWidth
    });
};
