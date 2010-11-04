function scale(t) {
  return (typeof data[0][t] == "number")
      ? pv.Scale.linear(data, function(d) d[t]).range(0, s)
      : pv.Scale.ordinal(data, function(d) d[t]).split(0, s);
}
