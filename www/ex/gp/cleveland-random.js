
/*
 * "In this position-length experiment, the values involved in the subject's
 * judgments were s_i = 10 x 10^{i/12}, i = 0..9, which are equally spaced on a
 * log scale and range from 10 to 56.2. Subjects judged the ratios of 10 pairs
 * of values; the ratios ranged from .18 to .83."
 *
 * Unfortunately, Cleveland & McGill don't say how they picked the pairs that
 * were compared, but we know from the ratios (.18 and .83) that they must have
 * included the closest and farthest pairs. We would like to sample the possible
 * ratios evenly; one option would be to always use i=9 for one element, and
 * then compare against i={0..8}, though it would be better to compare a
 * diversity of absolute sizes as well.
 */
var s = pv.range(10).map(function(i) { return Math.round(10 * Math.pow(10, i / 12)); });
var sa = [9, 8, 8, 7, 7, 6, 6, 5, 5, 4];
var sb = [0, 0, 1, 1, 2, 2, 3, 3, 4, 1];

// 9-0
// 9-1, 8-0
// 9-2, 8-1, 7-0
// 9-3, 8-2, 7-1, 6-0
// 9-4, 8-3, 7-2, 6-1, 5-0
// 9-5, 8-4, 7-3, 6-2, 5-1, 4-0
// 9-6, 8-5, 7-4, 6-3, 5-2, 4-1, 3-0
// 9-7, 8-6, 7-5, 6-4, 5-3, 4-2, 3-1, 2-0
// 9-8, 8-7, 7-6, 6-5, 5-4, 4-3, 3-1, 2-1, 1-0

for (var i = 0; i < 10; i++) {
  if (Math.random() >= .5) {
    var t = sa[i];
    sa[i] = sb[i];
    sb[i] = t;
  }
}

/*
 * Returns the kth pair to compare, based on the above-defined power function
 * and the hard-coded index pairs.
 */
function gen2(k) {
  return [s[sa[k]], s[sb[k]]];
}

/*
 * Generates an array of n integers which sum to k.
 */
function gen(n, k) {
  var array = pv.range(n).map(function() { return Math.random(); });
  var sum = pv.sum(array);
  array = array.map(function(d) { return Math.max(1, Math.round(k * d / sum)); });
  array[pv.max.index(array)] -= pv.sum(array) - k; // correct any rounding error
  return array;
}

/*
 * Generates a sample of five numbers that sum to 100, with Cleveland & McGill's
 * constraints (no numbers smaller than or equal to 3, no numbers larger than or
 * equal to 39, no pairs of numbers whose size difference is less than 10%).
 */
function gen5() {
  var array = gen(5, 100);

  for (var i = 0; i < 5; i++) {
    if (array[i] <= 3) return gen5();
    if (array[i] >= 39) return gen5();
  }

  for (var i = 0; i < 5; i++) {
    for (var j = i + 1; j < 5; j++) {
      var a = array[i], b = array[j];
      if (b > a) {
        var t = a;
        a = b;
        b = t;
      }
      if (a / b < 1.1) return gen5();
    }
  }

  return array;
}

/*
 * Generates two sets of five numbers for Type 1 charts in the position-length
 * experiment. The compared values are derived from the earlier gen2 function;
 * the remaining values are constructed to sum (hopefully) between 60 and 100.
 */
function gent1(k) {
  var s = gen2(k);
  var aa = [Math.max(Math.round(Math.random() * 37) + 60, Math.min(100, pv.sum(s) + 20))];
  var ab = [Math.round(Math.random() * 37) + 60];
  aa = aa.concat(s, gen(2, aa[0] - pv.sum(s)));
  ab = ab.concat(gen(4, ab[0]));
  return [aa, ab];
}

/*
 * Generates two sets of four numbers for Type 2 charts in the position-length
 * experiment. The compared values are derived from the earlier gen2 function;
 * the remaining values are constructed to sum (hopefully) between 60 and 100.
 */
function gent2(k) {
  var s = gen2(k);
  var ta = Math.max(Math.round(Math.random() * 37) + 60, Math.min(100, s[0] + 20));
  var tb = Math.max(Math.round(Math.random() * 37) + 60, Math.min(100, s[1] + 20));
  var aa = [s[0]].concat(gen(3, ta - s[0]));
  var ab = [s[1]].concat(gen(3, tb - s[1]));
  return [aa, ab];
}

/*
 * Generates two sets of five numbers for Type 3 charts. This is the same data
 * as in Type 2 charts, but an initial sum is included.
 */
function gent3(k) {
  var a = samplet2[k];
  return [[pv.sum(a[0])].concat(a[0]), [pv.sum(a[1])].concat(a[1])];
}

/*
 * Generates two sets of four numbers for Type 4 charts. This is the same data
 * as in Type 2 charts, but the order is reversed.
 */
function gent4(k) {
  var a = samplet2[k];
  return [a[0].concat().reverse(), a[1].concat().reverse()];
}

/*
 * Generates a sample of five numbers for Type 5 charts in the position-length
 * experiment. This is the same data as Type 1, but the order of the A and B
 * sets are reversed, and Type 5 omits the initial sum.
 */
function gent5(k) {
  var a = samplet1[k];
  return [a[0].slice(1).reverse(), a[1].slice(1).reverse()];
}

var samplet1 = pv.range(10).map(gent1);
var samplet2 = pv.range(10).map(gent2);
var samplet3 = pv.range(10).map(gent3);
var samplet4 = pv.range(10).map(gent4);
var samplet5 = pv.range(10).map(gent5);
var sample5 = pv.range(10).map(gen5);
