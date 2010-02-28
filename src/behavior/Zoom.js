pv.Behavior.zoom = function() {
  return function() {
      var v = this.mouse(), k = window.event.wheelDelta;
      this.transform(this.transform().translate(v.x, v.y)
          .scale((k < 0) ? (1000 / (1000 - k)) : ((1000 + k) / 1000))
          .translate(-v.x, -v.y)).render();
    };
};
