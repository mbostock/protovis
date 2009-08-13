/*
 * TODO
 * - optimize: dirty bit
 * - z-index
 */

pv.SvgPanel = function() { this.children = []; };
pv.SvgPanel.prototype = pv.extend(pv.SvgSprite);

pv.SvgPanel.prototype.update = function(parentNode) {
  var svg = this.$svg;

  /* Create SVG elements as needed. */
  if (this.visible) {
    if (!svg) {
      var insert = true;
      svg = this.$svg = {g: this.create("g")};
      if (!this.parent) {
        if (this.canvas.firstChild) {
          svg.svg = this.canvas.firstChild;
        } else {
          this.canvas.appendChild(svg.svg = this.create("svg"));
        }
      }
    }
    delete (svg.svg || svg.g).style.display;
  } else {
    if (svg) (svg.svg || svg.g).style.display = "none";
    return;
  }

  /* g */
  this.apply(svg.g, {
      "transform": (this.left || this.top) ? "translate(" + this.left + "," + this.top + ")" : ""
    });

  /* svg */
  if (svg.svg) this.apply(svg.svg, {
      "width": this.width + this.left + this.right,
      "height": this.height + this.top + this.bottom
    });

  /* rect */
  if (svg.rect || this.fillStyle || this.strokeStyle) {
    if (!svg.rect) svg.g.insertBefore(svg.rect = this.create("rect"), svg.g.firstChild);
    this.apply(svg.rect, {
        "title": this.title,
        "cursor": this.cursor,
        "width": Math.max(1E-10, this.width),
        "height": Math.max(1E-10, this.height),
        "fill": this.fillStyle,
        "stroke": this.strokeStyle,
        "stroke-width": this.strokeStyle ? this.lineWidth : 0
      });
  }

  /* children */
  for (var i = 0; i < this.children.length; i++) {
    var siblings = this.children[i];
    if (siblings.length) siblings[0].updateAll(siblings);
  }

  /*
   * WebKit appears has a bug where images are not rendered if the <g> element
   * is appended before it contained any elements. Creating the child elements
   * first and then appending them solves the problem.
   */
  if (insert) this.parent ? this.insert(svg.g) : svg.svg.appendChild(svg.g);
};

pv.SvgPanel.prototype.dispose = function() {
  var svg = this.$svg;
  if (svg.g) {
    var node = svg.svg || svg.g;
    node.parentNode.removeChild(node);
    this.$svg = {};
  }
};
