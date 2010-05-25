var start = new Date(1990, 0, 1);
var year = 1000 * 60 * 60 * 24 * 365;
var data = pv.range(0, 20, .02).map(function(x) {
    return {x: new Date(start.getTime() + year * x),
            y: (1 + .1 * (Math.sin(x * 2 * Math.PI))
                + Math.random() * .1) * Math.pow(1.18, x)
                + Math.random() * .1};
  });
var end = data[data.length - 1].x;
