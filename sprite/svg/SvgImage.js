pv.SvgImage = function() {};
pv.SvgImage.prototype = pv.extend(pv.SvgSprite);

pv.SvgImage.prototype.update = function() {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) {
      svg = this.$svg = {root: this.insert("g")};
      svg.root.appendChild(svg.fill = this.create("rect"));
      svg.root.appendChild(svg.image = this.create("image"));
      svg.image.setAttribute("preserveAspectRatio", "none");
      svg.root.appendChild(svg.stroke = this.create("rect"));
      svg.stroke.setAttribute("fill", "none");
      svg.stroke.setAttribute("pointer-events", "all");
    }
    delete svg.root.style.display;
  } else {
    if (svg) svg.root.style.display = "none";
    return;
  }

  /* g */
  this.apply(svg.root, {
      "transform": (this.left || this.top) ? "translate(" + this.left + "," + this.top + ")" : ""
    });

  /* fill */
  this.apply(svg.fill, {
      "fill": this.fillStyle,
      "width": this.width,
      "height": this.height
    });

  /* image */
  this.apply(svg.image, {
      "width": this.width,
      "height": this.height,
      "href": this.url
    });

  /* stroke */
  this.apply(svg.stroke, {
      "title": this.title,
      "cursor": this.cursor,
      "width": this.width,
      "height": this.height,
      "stroke": this.strokeStyle,
      "stroke-width": this.lineWidth
    });

  /* events */
  this.listen(svg.stroke);
};
