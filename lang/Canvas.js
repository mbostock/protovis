if (typeof CanvasRenderingContext2D == "undefined") {
  var CanvasRenderingContext2D = document
      .createElement("canvas").getContext("2d").constructor;
}

var c = CanvasRenderingContext2D.prototype;
if (c.mozDrawText) {
  if (!c.measureText) {
    c.measureText = function(s) {
      this.mozTextStyle = this.font;
      return { width: this.mozMeasureText(s) };
    };
  }
  if (!c.fillText) {
    c.fillText = function(s, x, y) {
      this.mozTextStyle = this.font;
      this.save();
      this.translate(x, y);
      this.mozDrawText(s);
      this.restore();
    };
  }
} else {
  if (!c.measureText) {
    c.measureText = function() { return { width: -1 }; };
  }
  if (!c.fillText) {
    c.fillText = function() {};
  }
}
