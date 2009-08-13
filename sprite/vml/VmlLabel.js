/* TODO alignment, baseline, rotation? */

pv.VmlLabel = function() {};
pv.VmlLabel.prototype = pv.extend(pv.VmlSprite);

pv.VmlLabel.prototype.update = function() {
  var vml = this.$dom;

  /* Create VML elements as needed. */
  if (this.visible) {
    if (!vml) {
      vml = this.$dom = {root: this.insert("v:shape")};
      vml.root.appendChild(vml.text = this.create("v:textbox"));
    }
    vml.root.style.display = "";
  } else {
    if (vml) vml.root.style.display = "none";
    return;
  }

  vml.root.style.left = this.left;
  vml.root.style.top = this.top;

  var fill = pv.color(this.textStyle)
  vml.text.style.color = fill.color;
  vml.text.style.opacity = fill.opacity;
  vml.text.style.font = this.font;
  vml.text.innerText = this.text;
};
