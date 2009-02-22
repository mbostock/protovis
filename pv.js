var undefined;

var pv = {};

pv.context = function(id) {
  return document.getElementById(id).getContext("2d");
};

pv.singleton = function(value) {
  yield value;
};

pv.range = function(start, end, step) {
  if (step == undefined) {
    step = 1;
  }
  while (start <= end) {
    yield start;
    start += step;
  }
};

pv.each = function(array) {
  for (var i = 0; i < array.length; i++) {
    yield array[i];
  }
};

pv.normalize = function(array, f) {
  if (!f) {
    f = function(d) d;
  }
  var sum = array.reduce(function(p, d) p + f(d), 0);
  return array.map(function(d) f(d) / sum);
};
