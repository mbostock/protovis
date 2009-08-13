pv.SvgLine = function() {};
pv.SvgLine.prototype = pv.extend(pv.SvgSprite);

pv.SvgLine.prototype.updateAll = function(siblings) {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) {
      svg = this.$svg = {};
      svg.title = this.insert("a");
      svg.title.appendChild(svg.polyline = this.create("polyline"));
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
    if (isNaN(s.left)) s.left = 0;
    if (isNaN(s.top)) s.top = 0;
    p += s.left + "," + s.top + " ";
  }

  /* title */
  this.apply(svg.title, {"title": this.title});

  /* polyline */
  this.apply(svg.polyline, {
      "cursor": this.cursor,
      "fill": this.fillStyle,
      "stroke": this.strokeStyle,
      "stroke-width": this.lineWidth,
      "points": p
    });
};
