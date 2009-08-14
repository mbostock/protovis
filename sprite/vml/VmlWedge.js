pv.VmlWedge = function() {};
pv.VmlWedge.prototype = pv.extend(pv.VmlSprite);

pv.VmlWedge.prototype.update = function() {
  var vml = this.$dom;

  /* Create VML elements as needed. */
  if (this.visible) {
    if (!vml) {
      vml = this.$dom = {root: this.insert("v:shape")};
      vml.root.appendChild(vml.path = this.create("v:path"));
      vml.root.appendChild(vml.fill = this.create("v:fill"));
      vml.root.appendChild(vml.stroke = this.create("v:stroke"));
      // vml.root.setAttribute("fill-rule", "evenodd");
    }
    vml.root.style.display = "";
  } else {
    if (vml) vml.root.style.display = "none";
    return;
  }

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
  this.apply(vml.root, {
      "transform": "translate(" + this.left + "," + this.top + ")",
      "title": this.title,
      "cursor": this.cursor,
      "fill": this.fillStyle,
      "stroke": this.strokeStyle,
      "stroke-width": this.lineWidth,
      "d": d
    });

  /* events */
  this.listen(vml.root);
};
