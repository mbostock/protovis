vis.add(pv.Wedge)
    .data(data)
    .left(75)
    .bottom(75)
    .outerRadius(70)
    .angle(pv.Scale.linear(0, pv.sum(data)).range(0, 2 * Math.PI));
