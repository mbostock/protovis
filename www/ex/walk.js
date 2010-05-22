function walk(n) {
  var array = [], value = 0, i = 0;
  while (n-- > 0) array.push({x: i++, y: value += (Math.random() - .5)});
  return array;
}
