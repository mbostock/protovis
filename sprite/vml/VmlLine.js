pv.VmlLine = function() {};
pv.VmlLine.prototype = pv.extend(pv.VmlSprite);

pv.VmlLine.prototype.updateAll = function(siblings) {
  var vml = this.$dom;

  /* Create VML elements as needed. */
  if (this.visible) {
    if (!vml) {
      vml = this.$dom = {root: this.insert("v:shape")};
      vml.root.appendChild(vml.path = this.create("v:path"));
      vml.root.appendChild(vml.fill = this.create("v:fill"));
      vml.root.appendChild(vml.stroke = this.create("v:stroke"));
    }
    vml.root.style.display = "";
  } else {
    if (vml) vml.root.style.display = "none";
    return;
  }

  /* points */
  var p;
  for (var i = 0; i < siblings.length; i++) {
    var s = siblings[i], x = Math.round(s.left), y = Math.round(s.top);
    if (isNaN(x)) x = 0;
    if (isNaN(y)) y = 0;
    if (!p) p = "m" + x + "," + y + "l";
    else p += x + "," + y + " ";
  }

  /* polygon */
  vml.root.style.width = "100%";
  vml.root.style.height = "100%";
  vml.root.style.cursor = this.cursor;
  vml.root.title = this.title || "";
  vml.path.v = p;

  var fill = pv.color(this.fillStyle);
  vml.fill.color = fill.color;
  vml.fill.opacity = fill.opacity;
  var stroke = pv.color(this.strokeStyle);
  vml.stroke.color = stroke.color;
  vml.stroke.opacity = stroke.opacity;
  vml.stroke.weight = this.lineWidth + "px";

  /* events */
  this.listen(vml.root);
};
