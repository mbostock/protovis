var bars = [0.2, 0.3, 0.6, 0.1, 0.9, 0.8, 0.23, 0.77, 0.63, 0.43, 0.59, 0.11];

/** An array of sunspot observations. */
var sunspots = [
  40, 115, 100, 80, 60, 40, 23, 10, 10, 25, 75, 145,
  130, 130, 80, 65, 20, 10, 5, 10, 60, 190, 180, 175,
  120, 50, 35, 20, 10, 15, 30, 60, 105, 105, 105, 80, 65
];

/** Generates a random walk of length n. */
function walk(n) {
  var array = [], value = 0, i = 0;
  while (n-- > 0) array.push(value += (Math.random() - .5));
  return array;
}

/** Generates an array of n random bits. */
function random(n) {
  return pv.range(n).map(function() { return pv.random(2); });
}
