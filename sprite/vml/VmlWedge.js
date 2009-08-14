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
  var r1 = Math.round(this.innerRadius), r2 = Math.round(this.outerRadius), d;
  if (this.angle >= 2 * Math.PI) {
    if (r1) {
      d = "AE0,0 " + r2 + "," + r2 + " 0 23592960"
          + "AL0,0 " + r1 + "," + r1 + " 0 23592960";
    } else {
      d = "AE0,0 " + r2 + "," + r2 + " 0 23592960";
    }
  } else {
    var sa = Math.round(this.startAngle / Math.PI * 11796480),
        a = Math.round(this.angle / Math.PI * 11796480);
    if (r1) {
      d = "AE 0,0 " + r2 + "," + r2 + " " + -sa + " " + -a
        + " 0,0 " + r1 + "," + r1 + " " + -(sa + a) + " " + a
        + "X";
    } else {
      d = "M0,0"
        + "AE0,0 " + r2 + "," + r2 + " " + -sa + " " + -a
        + "X";
    }
  }

  /* path */
  vml.root.style.left = this.left;
  vml.root.style.top = this.top;
  vml.root.style.width = "100%";
  vml.root.style.height = "100%";
  vml.root.style.cursor = this.cursor;
  vml.root.title = this.title || "";

  var fill = pv.color(this.fillStyle);
  vml.fill.color = fill.color;
  vml.fill.opacity = fill.opacity;
  var stroke = pv.color(this.strokeStyle);
  vml.stroke.color = stroke.color;
  vml.stroke.opacity = stroke.opacity * Math.min(this.lineWidth, 1);
  vml.stroke.weight = this.lineWidth + "px";

  vml.path.v = d;

  /* events */
  this.listen(vml.root);
};
