var dot = line.add(pv.Dot)
    .visible(function() i >= 0)
    .data(function() [data[i]])
    .fillStyle(function() line.strokeStyle())
    .strokeStyle("#000")
    .size(20)
    .lineWidth(1);
