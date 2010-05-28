var y = pv.Scale.linear(0, 1).range(0, 480);

...

    .height(function(d) y(d.score))
