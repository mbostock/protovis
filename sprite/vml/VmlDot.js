pv.VmlDot = function() {};
pv.VmlDot.prototype = pv.extend(pv.VmlSprite);

pv.VmlDot.prototype.update = function() {
  var vml = this.$dom;

  /* Create VML elements as needed. */
  if (this.visible) {
    if (!vml) {
      vml = this.$dom = {root: this.insert("v:group")};
      vml.root.appendChild(vml.shape = this.create("v:shape"));
      vml.shape.appendChild(vml.path = this.create("v:path"));
      vml.shape.appendChild(vml.fill = this.create("v:fill"));
      vml.shape.appendChild(vml.stroke = this.create("v:stroke"));
    }
    vml.root.style.display = "";
  } else {
    if (vml) vml.root.style.display = "none";
    return;
  }

  /* points */
  var radius = Math.round(Math.sqrt(this.size));
  var d;
  switch (this.shape) {
    case "cross": {
      d = "m" + -radius + "," + -radius
          + "l" + radius + "," + radius
          + "m" + radius + "," + -radius
          + "l" + -radius + "," + radius;
      break;
    }
    case "triangle": {
      var h = radius, w = Math.round(radius * 2 / Math.sqrt(3));
      d = "m0," + h
          + "l" + w +"," + -h
          + " " + -w + "," + -h
          + "x";
      break;
    }
    case "diamond": {
      radius = Math.round(radius * Math.sqrt(2));
      d = "m0," + -radius
          + "l" + radius + ",0"
          + " 0," + radius
          + " " + -radius + ",0"
          + "x";
      break;
    }
    case "square": {
      d = "m" + -radius + "," + -radius
          + "l" + radius + "," + -radius
          + " " + radius + "," + radius
          + " " + -radius + "," + radius
          + "x";
      break;
    }
    case "tick": {
      d = "m0,0l0," + -Math.round(this.size);
      break;
    }
    default: { // circle
      d = "ar-" + radius + ",-" + radius + "," + radius + "," + radius + ",0,0,0,0x";
      break;
    }
  }

  /*
   * This total awkwardness is because VML rotates around what it perceives to
   * be the center axis of the shape. The rotation is applied to a containing
   * group, and then I use offsets to undo the cludge.
   */

  /* root + shape */
  var a = this.angle;
  if (a) {
    var x = this.left, y = this.top;
    vml.shape.style.left = Math.cos(-a) * x - Math.sin(-a) * y;
    vml.shape.style.top = Math.sin(-a) * x + Math.cos(-a) * y;
    vml.root.style.left = -this.parent.width / 2;
    vml.root.style.top = -this.parent.height / 2;
    vml.root.style.rotation = 180 * a / Math.PI;
    vml.shape.style.marginLeft = this.parent.width / 2;
    vml.shape.style.marginTop = this.parent.height / 2;
  } else {
    vml.root.style.rotation = "";
    vml.shape.style.left = this.left;
    vml.shape.style.top = this.top;
  }

  vml.root.style.width = this.parent.width;
  vml.root.style.height = this.parent.height;
  vml.shape.style.width = this.parent.width;
  vml.shape.style.height = this.parent.height;
  vml.shape.style.cursor = this.cursor;
  vml.shape.title = this.title || "";

  /* path */
  vml.path.v = d;

  var fill = pv.color(this.fillStyle);
  vml.fill.color = fill.color;
  vml.fill.opacity = fill.opacity;
  var stroke = pv.color(this.strokeStyle);
  vml.stroke.color = stroke.color;
  vml.stroke.opacity = stroke.opacity;
  vml.stroke.weight = this.lineWidth + "px";

  /* events */
  this.listen(vml.shape);
};
