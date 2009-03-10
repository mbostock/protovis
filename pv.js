var undefined;

var pv = {};

pv.identity = function(x) x;

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

pv.cross = function(a, b) {
  for each (var x in a) {
    for each (var y in b) {
      yield [x, y];
    }
  }
};

pv.normalize = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  var sum = array.reduce(function(p, d) p + f(d), 0);
  return array.map(function(d) f(d) / sum);
};

pv.count = function(array) {
  if (array instanceof Array) {
    return array.length;
  }
  var n = 0;
  for each (var x in array) {
    n++;
  }
  return n;
};

pv.sum = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return array.reduce(function(p, d) p + f(d), 0);
};

pv.max = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return array.reduce(function(p, d) Math.max(p, f(d)), -Infinity);
};

pv.min = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  return array.reduce(function(p, d) Math.min(p, f(d)), Infinity);
};

pv.mean = function(array, f) {
  return pv.sum(array, f) / pv.count(array);
};

pv.median = function(array, f) {
  if (!f) {
    f = pv.identity;
  }
  array = [f(x) for each (x in array)].sort(function(a, b) a - b);
  return (array.length % 2)
      ? array[Math.floor(array.length / 2)]
      : let (i = array.length / 2) (array[i - 1] + array[i]) / 2
};

pv.function = function(x) {
  return (x instanceof Function) ? x : function() x;
};
