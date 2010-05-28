vis.add(pv.Layout.Stack)
    .layers(data)
    .order("inside-out")
    .offset("wiggle")
    .x(x.by(pv.index))
    .y(y)
  .layer.add(pv.Area)
    .fillStyle(pv.ramp("#aad", "#556").by(Math.random))
    .strokeStyle(function() this.fillStyle().alpha(.5));
