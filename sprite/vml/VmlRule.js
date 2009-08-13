pv.VmlRule = function() {};
pv.VmlRule.prototype = pv.extend(pv.VmlSprite);

pv.VmlRule.prototype.update = function() {
  var vml = this.$dom;

  /* Create VML elements as needed. */
  if (this.visible) {
    if (!vml) vml = this.$dom = {root: this.insert("v:line")};
    vml.root.appendChild(vml.stroke = this.insert("v:stroke"));
    vml.root.style.display = "";
  } else {
    if (vml) vml.root.style.display = "none";
    return;
  }

  /* line */
  vml.root.title = this.title;
  vml.root.style.cursor = this.cursor;
  vml.root.from = this.left + "," + this.top;
  vml.root.to = (this.left + this.width) + "," + (this.top + this.height);

  var color = pv.color(this.strokeStyle);
  vml.stroke.color = color.color;
  vml.stroke.opacity = color.opacity;
  vml.stroke.weight = this.lineWidth + "px";

  /* events */
  this.listen(vml.root);
};
