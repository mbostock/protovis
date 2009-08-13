pv.SvgRule = function() {};
pv.SvgRule.prototype = pv.extend(pv.SvgSprite);

pv.SvgRule.prototype.update = function() {
  var svg = this.$dom;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) svg = this.$dom = {root: this.insert("line")};
    delete svg.root.style.display;
  } else {
    if (svg) svg.root.style.display = "none";
    return;
  }

  /* line */
  this.apply(svg.root, {
      "title": this.title,
      "cursor": this.cursor,
      "x1": this.left,
      "y1": this.top,
      "x2": this.left + this.width,
      "y2": this.top + this.height,
      "stroke": this.strokeStyle,
      "stroke-width": this.lineWidth
    });

  /* events */
  this.listen(svg.root);
};
