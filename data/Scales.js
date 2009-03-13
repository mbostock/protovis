pv.Scales = {};

pv.Scales.linear = function(array, f) {
  let min = pv.min(array, f);
  let max = pv.max(array, f);
  return function(x) (x - min) / (max - min);
};

pv.Scales.linearZero = function(array, f) {
  let max = pv.max(array, f);
  return function(x) x / max;
};

pv.Scales.linearFixed = function(array, min, max) {
  return function(x) (x - min) / (max - min);
};
