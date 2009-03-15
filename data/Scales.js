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

pv.Scales.log = function(array, f) {
  let min = Math.log(pv.min(array, f));
  let max = Math.log(pv.max(array, f));
  return function(x) (Math.log(x) - min) / (max - min);
};

pv.Scales.logZero = function(array, f) {
  let max = Math.log(pv.max(array, f));
  return function(x) Math.log(x) / max;
};

pv.Scales.logFixed = function(array, min, max) {
  min = Math.log(min);
  max = Math.log(max);
  return function(x) (Math.log(x) - min) / (max - min);
};

pv.Scales.ordinal = function(ordinals) {
  let map = pv.numerate(ordinals);
  return function(x) let (i = map[x]) (i == undefined) ? -1 : i;
};
