if (!CanvasRenderingContext2D.prototype.measureText) {
  CanvasRenderingContext2D.prototype.measureText = function(s) {
    this.mozTextStyle = this.font;
    return { width: this.mozMeasureText(s) };
  };
}

if (!CanvasRenderingContext2D.prototype.fillText) {
  CanvasRenderingContext2D.prototype.fillText = function(s, x, y) {
    this.mozTextStyle = this.font;
    this.save();
    this.translate(x, y);
    this.mozDrawText(s);
    this.restore();
  };
}
