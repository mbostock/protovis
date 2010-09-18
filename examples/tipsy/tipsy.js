pv.Behavior.tipsy = function(opts) {
  var tip;

  /**
   * @private When the mouse leaves the root panel, trigger a mouseleave event
   * on the tooltip span. This is necessary for dimensionless marks (e.g.,
   * lines) when the mouse isn't actually over the span.
   */
  function trigger() {
    if (tip) {
      $(tip).tipsy("hide");
      tip.parentNode.removeChild(tip);
      tip = null;
    }
  }

  return function(d) {
      /* Compute the transform to offset the tooltip position. */
      var t = pv.Transform.identity, p = this.parent;
      do {
        t = t.translate(p.left(), p.top()).times(p.transform());
      } while (p = p.parent);

      /* Create and cache the tooltip span to be used by tipsy. */
      if (!tip) {
        var c = this.root.canvas();
        c.style.position = "relative";
        $(c).mouseleave(trigger);

        tip = c.appendChild(document.createElement("div"));
        tip.style.position = "absolute";
        tip.style.pointerEvents = "none"; // ignore mouse events
        $(tip).tipsy(opts);
      }

      /* Propagate the tooltip text. */
      tip.title = this.title() || this.text();

      /*
       * Compute bounding box. TODO support area, lines, wedges, stroke. Also
       * note that CSS positioning does not support subpixels, and the current
       * rounding implementation can be off by one pixel.
       */
      if (this.properties.width) {
        tip.style.width = Math.ceil(this.width() * t.k) + 1 + "px";
        tip.style.height = Math.ceil(this.height() * t.k) + 1 + "px";
      } else if (this.properties.radius) {
        var r = this.radius();
        t.x -= r;
        t.y -= r;
        tip.style.height = tip.style.width = Math.ceil(2 * r * t.k) + "px";
      }
      tip.style.left = Math.floor(this.left() * t.k + t.x) + "px";
      tip.style.top = Math.floor(this.top() * t.k + t.y) + "px";

      /*
       * Cleanup the tooltip span on mouseout. Immediately trigger the tooltip;
       * this is necessary for dimensionless marks. Note that the tip has
       * pointer-events disabled (so as to not interfere with other mouse
       * events, such as "click"); thus the mouseleave event handler is
       * registered on the event target rather than the tip overlay.
       */
      if (tip.style.height) $(pv.event.target).mouseleave(trigger);
      $(tip).tipsy("show");
    };
};
