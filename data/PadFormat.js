/**
 * Returns a padding function with the specified pad character <i>c</i> and
 * length <i>n</i>.
 *
 * @param {string} c a padding character, such as "0".
 * @param {number} n the padding length, such as 2.
 * @returns {function} a padding function.
 */
pv.Format.pad = function(c, n) {
  var cache = pv.Format.pad.$cache;
  return function(s) {
      s = String(s);
      var m = n - s.length;
      return (m < 1)
          ? s // the string is already long enough
          : ((cache[m] || (cache[m] = new Array(m + 1))).join(c) + s);
    };
};

pv.Format.pad.$cache = [];
