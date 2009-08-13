pv.SvgWedge = function() {};
pv.SvgWedge.prototype = pv.extend(pv.SvgSprite);

pv.SvgWedge.prototype.update = function() {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) {
      svg = this.$svg = {root: this.insert("path")};
      svg.root.setAttribute("fill-rule", "evenodd");
    }
    delete svg.root.style.display;
  } else {
    if (svg) svg.root.style.display = "none";
    return;
  }

  /*
   * TODO If the angle or endAngle is updated by an event handler, the implied
   * properties won't recompute correctly, so this will lead to potentially
   * buggy redraw. How to re-evaluate implied properties on update?
   */

  /* points */
  var r1 = this.innerRadius, r2 = this.outerRadius, d;
  if (this.angle >= 2 * Math.PI) {
    if (r1) {
      d = "M0," + r2
          + "A" + r2 + "," + r2 + " 0 1,1 0," + (-r2)
          + "A" + r2 + "," + r2 + " 0 1,1 0," + r2
          + "M0," + r1
          + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
          + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
          + "Z";
    } else {
      d = "M0," + r2
          + "A" + r2 + "," + r2 + " 0 1,1 0," + (-r2)
          + "A" + r2 + "," + r2 + " 0 1,1 0," + r2
          + "Z";
    }
  } else {
    var c1 = Math.cos(this.startAngle), c2 = Math.cos(this.endAngle),
        s1 = Math.sin(this.startAngle), s2 = Math.sin(this.endAngle);
    if (r1) {
      d = "M" + r2 * c1 + "," + r2 * s1
          + "A" + r2 + "," + r2 + " 0 "
          + ((this.angle < Math.PI) ? "0" : "1") + ",1 "
          + r2 * c2 + "," + r2 * s2
          + "L" + r1 * c2 + "," + r1 * s2
          + "A" + r1 + "," + r1 + " 0 "
          + ((this.angle < Math.PI) ? "0" : "1") + ",0 "
          + r1 * c1 + "," + r1 * s1 + "Z";
    } else {
      d = "M" + r2 * c1 + "," + r2 * s1
          + "A" + r2 + "," + r2 + " 0 "
          + ((this.angle < Math.PI) ? "0" : "1") + ",1 "
          + r2 * c2 + "," + r2 * s2 + "L0,0Z";
    }
  }

  /* path */
  this.apply(svg.root, {
      "transform": "translate(" + this.left + "," + this.top + ")",
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
