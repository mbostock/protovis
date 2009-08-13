pv.SvgArea = function() {};
pv.SvgArea.prototype = pv.extend(pv.SvgSprite);

pv.SvgArea.prototype.updateAll = function(siblings) {
  var svg = this.$dom;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) svg = this.$dom = {root: this.insert("polygon")};
    delete svg.root.style.display;
  } else {
    if (svg) svg.root.style.display = "none";
    return;
  }

  /* points */
  var p = "";
  for (var i = 0; i < siblings.length; i++) {
    var s = siblings[i];
    p += s.left + "," + s.top + " ";
  }
  for (var i = siblings.length - 1; i >= 0; i--) {
    var s = siblings[i];
    p += (s.left + s.width) + "," + (s.top + s.height) + " ";
  }

  /* polygon */
  this.apply(svg.root, {
      "title": this.title,
      "points": p,
      "cursor": this.cursor,
      "fill": this.fillStyle,
      "stroke": this.strokeStyle,
      "stroke-width": this.lineWidth
    });

  /* events */
  this.listen(svg.root);
};
