/* TODO font-size detection for baseline adjustment */
/* TODO textMargin support */

pv.VmlLabel = function() {};
pv.VmlLabel.prototype = pv.extend(pv.VmlSprite);

pv.VmlLabel.prototype.update = function() {
  var vml = this.$dom;

  /* Create VML elements as needed. */
  if (this.visible) {
    if (!vml) {
      vml = this.$dom = {root: this.insert("v:shape")};
      vml.root.appendChild(vml.path = this.create("v:path"));
      vml.root.appendChild(vml.fill = this.create("v:fill"));
      vml.root.appendChild(vml.text = this.create("v:textpath"));
      vml.root.filled = true;
      vml.root.stroked = false;
      vml.root.style.width = "100%";
      vml.root.style.height = "100%";
      vml.path.textpathok = true;
      vml.text.on = true;
    }
    vml.root.style.display = "";
  } else {
    if (vml) vml.root.style.display = "none";
    return;
  }

  var dx = 0, dy = 0, size = 10;
  switch (this.textBaseline) {
    case "top": {
      dx = Math.round(-Math.sin(this.textAngle) * size);
      dy = Math.round(Math.cos(this.textAngle) * size);
      break;
    }
    case "bottom": {
      dx = -Math.round(-Math.sin(this.textAngle) * size);
      dy = -Math.round(Math.cos(this.textAngle) * size);
      break;
    }
  }

  vml.root.style.left = this.left + dx;
  vml.root.style.top = this.top + dy;

  var fill = pv.color(this.textStyle);
  vml.fill.color = fill.color;
  vml.fill.opacity = fill.opacity;

  var x = Math.round(Math.cos(this.textAngle) * 1000),
      y = Math.round(Math.sin(this.textAngle) * 1000), p;
  switch (this.textAlign) {
    case "right": {
      p = "M" + -x + "," + -y + "L0,0";
      break;
    }
    case "center": {
      p = "M" + -x + "," + -y + "L" + x + "," + y;
      break;
    }
    default: {
      p = "M0,0L" + x + "," + y;
      break;
    }
  }
  vml.path.v = p;

  vml.text.style.font = this.font;
  vml.text.style.color = "black";
  vml.text.style["alignment-baseline"] = "alphabetic";
  vml.text.style["v-text-align"] = this.textAlign;
  vml.text.string = this.text;
};
