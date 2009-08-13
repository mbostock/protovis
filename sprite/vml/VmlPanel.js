/*
 * TODO
 * - optimize: dirty bit
 * - z-index
 */

pv.VmlPanel = function() { this.children = []; };
pv.VmlPanel.prototype = pv.extend(pv.VmlSprite);

pv.VmlPanel.prototype.update = function(parentNode) {
  var vml = this.$dom;

  /* Create VML elements as needed. */
  if (this.visible) {
    if (!vml) {
      vml = this.$dom = {};
      if (!this.parent) {
        if (this.canvas.firstChild) {
          vml.root = this.canvas.firstChild;
        } else {
          this.canvas.appendChild(vml.root = this.create("v:group"));
        }
      } else {
        vml.root = this.insert("v:group");
      }
    }
    vml.root.style.display = "";
  } else {
    if (vml) vml.root.style.display = "none";
    return;
  }

  vml.root.style.position = "absolute";
  vml.root.style.width = this.width;
  vml.root.style.height = this.height;
  vml.root.style.left = this.left;
  vml.root.style.top = this.top;
  vml.root.coordsize = this.width + "," + this.height;

//   /* rect */
//   if (vml.rect || this.fillStyle || this.strokeStyle) {
//     if (!vml.rect) vml.g.insertBefore(vml.rect = this.create("rect"), vml.g.firstChild);
//     this.apply(vml.rect, {
//         "title": this.title,
//         "cursor": this.cursor,
//         "width": Math.max(1E-10, this.width),
//         "height": Math.max(1E-10, this.height),
//         "fill": this.fillStyle,
//         "stroke": this.strokeStyle,
//         "stroke-width": this.strokeStyle ? this.lineWidth : 0
//       });

//     /* events */
//     this.listen(vml.rect);
//   }

  /* children */
  for (var i = 0; i < this.children.length; i++) {
    var siblings = this.children[i];
    if (siblings.length) siblings[0].updateAll(siblings);
  }
};
