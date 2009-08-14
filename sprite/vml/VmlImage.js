pv.VmlImage = function() {};
pv.VmlImage.prototype = pv.extend(pv.VmlSprite);

pv.VmlImage.prototype.update = function() {
  var vml = this.$dom;

  /* Create VML elements as needed. */
  if (this.visible) {
    if (!vml) {
      vml = this.$dom = {root: this.insert("v:image")};
      vml.root.appendChild(vml.fill = this.create("v:fill"));
      vml.root.appendChild(vml.stroke = this.create("v:stroke"));
      vml.root.filled = true;
      vml.root.stroked = true;
    }
    vml.root.style.display = "";
  } else {
    if (vml) vml.root.style.display = "none";
    return;
  }

  vml.root.style.left = this.left;
  vml.root.style.top = this.top;
  vml.root.style.width = this.width;
  vml.root.style.height = this.height;
  vml.root.style.cursor = this.cursor;
  vml.root.src = this.url;
  vml.root.title = this.title || "";

  var fill = pv.color(this.fillStyle);
  vml.fill.color = fill.color;
  vml.fill.opacity = fill.opacity;
  var stroke = pv.color(this.strokeStyle);
  vml.stroke.color = stroke.color;
  vml.stroke.opacity = stroke.opacity * Math.min(this.lineWidth, 1);
  vml.stroke.weight = this.lineWidth + "px";

  /* events */
  this.listen(vml.root);
};
