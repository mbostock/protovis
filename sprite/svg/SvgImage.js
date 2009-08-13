pv.SvgImage = function() {};
pv.SvgImage.prototype = pv.extend(pv.SvgSprite);

pv.SvgImage.prototype.update = function() {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) {
      svg = this.$svg = {};
      svg.title = this.insert("a");
      svg.title.appendChild(svg.fill = this.create("rect"));
      svg.title.appendChild(svg.image = this.create("image"));
      svg.image.setAttribute("preserveAspectRatio", "none");
      svg.title.appendChild(svg.stroke = this.create("rect"));
      svg.stroke.setAttribute("fill", "none");
      svg.stroke.setAttribute("pointer-events", "all");
    }
    delete svg.title.style.display;
  } else {
    if (svg) svg.title.style.display = "none";
    return;
  }

  /* title */
  this.apply(svg.title, {
      "transform": "translate(" + this.left + ", " + this.top + ")",
      "title": this.title
    });

  /* fill */
  this.apply(svg.fill, {
      "width": this.width,
      "height": this.height,
      "fill": this.fillStyle
    });

  /* image */
  this.apply(svg.image, {
      "width": this.width,
      "height": this.height,
      "href": this.url
    });

  /* stroke */
  this.apply(svg.stroke, {
      "width": this.width,
      "height": this.height,
      "stroke": this.strokeStyle,
      "stroke-width": this.lineWidth,
      "cursor": this.cursor
    });
};
