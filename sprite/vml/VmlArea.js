pv.VmlArea = function() {};
pv.VmlArea.prototype = pv.extend(pv.VmlSprite);

pv.VmlArea.prototype.updateAll = function(siblings) {
  var vml = this.$dom;

  /* Create VML elements as needed. */
  if (this.visible) {
    if (!vml) {
      vml = this.$dom = {root: this.insert("v:polyline")};
      vml.root.appendChild(vml.fill = this.create("v:fill"));
      vml.root.appendChild(vml.stroke = this.create("v:stroke"));
    }
    vml.root.style.display = "";
  } else {
    if (vml) vml.root.style.display = "none";
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
  vml.root.style.cursor = this.cursor;
  vml.root.title = this.title || "";
  vml.root.points.value = p;

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
