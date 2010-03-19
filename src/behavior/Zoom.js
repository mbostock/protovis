pv.Behavior.zoom = function(speed) {
  if (!arguments.length) speed = 1 / 48;
  return function() {
      var v = this.mouse(), k = window.event.wheelDelta * speed;
      this.transform(this.transform().translate(v.x, v.y)
          .scale((k < 0) ? (1e3 / (1e3 - k)) : ((1e3 + k) / 1e3))
          .translate(-v.x, -v.y)).render();
    };
};
