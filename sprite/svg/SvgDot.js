pv.SvgDot = function() {};
pv.SvgDot.prototype = pv.extend(pv.SvgSprite);

pv.SvgDot.prototype.update = function() {
  var svg = this.$dom;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) svg = this.$dom = {root: this.insert("path")};
    delete svg.root.style.display;
  } else {
    if (svg) svg.root.style.display = "none";
    return;
  }

  /* points */
  var radius = Math.sqrt(this.size);
  var d;
  switch (this.shape) {
    case "cross": {
      d = "M" + -radius + "," + -radius
          + "L" + radius + "," + radius
          + "M" + radius + "," + -radius
          + "L" + -radius + "," + radius;
      break;
    }
    case "triangle": {
      var h = radius, w = radius * 2 / Math.sqrt(3);
      d = "M0," + h
          + "L" + w +"," + -h
          + " " + -w + "," + -h
          + "Z";
      break;
    }
    case "diamond": {
      radius *= Math.sqrt(2);
      d = "M0," + -radius
          + "L" + radius + ",0"
          + " 0," + radius
          + " " + -radius + ",0"
          + "Z";
      break;
    }
    case "square": {
      d = "M" + -radius + "," + -radius
          + "L" + radius + "," + -radius
          + " " + radius + "," + radius
          + " " + -radius + "," + radius
          + "Z";
      break;
    }
    case "tick": {
      d = "M0,0L0," + -this.size;
      break;
    }
    default: { // circle
      d = "M0," + radius
          + "A" + radius + "," + radius + " 0 1,1 0," + (-radius)
          + "A" + radius + "," + radius + " 0 1,1 0," + radius
          + "Z";
      break;
    }
  }

  /* path */
  this.apply(svg.root, {
      "transform": "translate(" + this.left + "," + this.top +")"
          + (this.angle ? " rotate(" + 180 * this.angle / Math.PI + ")" : ""),
      "title": this.title,
      "cursor": this.cursor,
      "fill": this.fillStyle,
      "stroke": this.strokeStyle,
      "stroke-width": this.lineWidth,
      "d": d
    });

  /* events */
  this.listen(svg.root);
};
