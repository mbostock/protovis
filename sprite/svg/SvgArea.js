pv.SvgArea = function() {};
pv.SvgArea.prototype = pv.extend(pv.SvgSprite);

pv.SvgArea.prototype.updateAll = function(siblings) {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) {
      svg = this.$svg = {};
      svg.title = this.insert("a");
      svg.title.appendChild(svg.polygon = this.create("polygon"));
    }
    delete svg.title.style.display;
  } else {
    if (svg) svg.title.style.display = "none";
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

  /* title */
  this.apply(svg.title, {"title": this.title});

  /* polygon */
  this.apply(svg.polygon, {
      "points": p,
      "cursor": this.cursor,
      "fill": this.fillStyle,
      "stroke": this.strokeStyle,
      "stroke-width": this.lineWidth
    });
};
