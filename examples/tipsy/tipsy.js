pv.Behavior.tipsy = function(opts) {
  var tip;
  return function() {
      /* Compute the transform to offset the tooltip position. */
      var t = pv.Transform.identity, p = this.parent;
      do {
        t = t.translate(p.left(), p.top()).times(p.transform());
      } while (p = p.parent);

      /* Create and cache the tooltip span to be used by tipsy. */
      var c = this.root.canvas();
      c.style.position = "relative";
      var e = tip || (tip = c.appendChild(document.createElement("span")));
      e.style.display = "inline-block";
      e.style.position = "absolute";
      e.style.background = "transparent";
      e.title = this.title();

      /*
       * Compute bounding box. TODO support area, lines, wedges, stroke. Also
       * note that CSS positioning does not support subpixels, and the current
       * rounding implementation can be off by one pixel.
       */
      if (this.properties.width) {
        e.style.width = Math.ceil(this.width() * t.k) + 1;
        e.style.height = Math.ceil(this.height() * t.k) + 1;
      } else if (this.properties.radius) {
        var r = this.radius();
        t.x -= r;
        t.y -= r;
        e.style.height = e.style.width = Math.ceil(2 * r * t.k);
      }
      e.style.left = Math.floor(this.left() * t.k + t.x);
      e.style.top = Math.floor(this.top() * t.k + t.y);

      /* Setup tipsy, and cleanup the tooltip span on mouseout. */
      $(e).tipsy(opts).mouseout(function() {
          if (tip) {
            c.removeChild(tip);
            tip = null;
          }
        });
    };
};
