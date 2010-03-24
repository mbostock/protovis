/**
 * Returns a {@link pv.Flatten} operator for the specified map. This is a
 * convenience factory method, equivalent to <tt>new pv.Flatten(map)</tt>.
 *
 * @see pv.Flatten
 * @param map a map to flatten.
 * @returns {pv.Flatten} a flatten operator for the specified map.
 */
pv.flatten = function(map) {
  return new pv.Flatten(map);
};

/**
 * Constructs a flatten operator for the specified map. This constructor should
 * not be invoked directly; use {@link pv.flatten} instead.
 *
 * @class Represents a flatten operator for the specified array. Flattening
 * allows hierarchical maps to be flattened into an array. The levels in the
 * input tree are specified by <i>key</i> functions.
 *
 * <p>For example, consider the following hierarchical data structure of Barley
 * yields, from various sites in Minnesota during 1931-2:
 *
 * <pre>{ 1931: {
 *     Manchuria: {
 *       "University Farm": 27.00,
 *       "Waseca": 48.87,
 *       "Morris": 27.43,
 *       ... },
 *     Glabron: {
 *       "University Farm": 43.07,
 *       "Waseca": 55.20,
 *       ... } },
 *   1932: {
 *     ... } }</pre>
 *
 * To facilitate visualization, it may be useful to flatten the tree into a
 * tabular array:
 *
 * <pre>var array = pv.flatten(yields)
 *     .key("year")
 *     .key("variety")
 *     .key("site")
 *     .key("yield")
 *     .array();</pre>
 *
 * This returns an array of object elements. Each element in the array has
 * attributes corresponding to this flatten operator's keys:
 *
 * <pre>{ site: "University Farm", variety: "Manchuria", year: 1931, yield: 27 },
 * { site: "Waseca", variety: "Manchuria", year: 1931, yield: 48.87 },
 * { site: "Morris", variety: "Manchuria", year: 1931, yield: 27.43 },
 * { site: "University Farm", variety: "Glabron", year: 1931, yield: 43.07 },
 * { site: "Waseca", variety: "Glabron", year: 1931, yield: 55.2 }, ...</pre>
 *
 * <p>The flatten operator is roughly the inverse of the {@link pv.Nest} and
 * {@link pv.Tree} operators.
 *
 * @param map a map to flatten.
 */
pv.Flatten = function(map) {
  this.map = map;
  this.keys = [];
};

/**
 * Flattens using the specified key function. Multiple keys may be added to the
 * flatten; the tiers of the underlying tree must correspond to the specified
 * keys, in order. The order of the returned array is undefined; however, you
 * can easily sort it.
 *
 * @param {string} key the key name.
 * @param {function} [f] an optional value map function.
 * @returns {pv.Nest} this.
 */
pv.Flatten.prototype.key = function(key, f) {
  this.keys.push({name: key, value: f});
  delete this.$leaf;
  return this;
};

/**
 * Flattens using the specified leaf function. This is an alternative to
 * specifying an explicit set of keys; the tiers of the underlying tree will be
 * determined dynamically by recursing on the values, and the resulting keys
 * will be stored in the entries <tt>keys</tt> attribute. The leaf function must
 * return true for leaves, and false for internal nodes.
 *
 * @param {function} f a leaf function.
 * @returns {pv.Nest} this.
 */
pv.Flatten.prototype.leaf = function(f) {
  this.keys.length = 0;
  this.$leaf = f;
  return this;
};

/**
 * Returns the flattened array. Each entry in the array is an object; each
 * object has attributes corresponding to this flatten operator's keys.
 *
 * @returns an array of elements from the flattened map.
 */
pv.Flatten.prototype.array = function() {
  var entries = [], stack = [], keys = this.keys, leaf = this.$leaf;

  /* Recursively visit using the leaf function. */
  if (leaf) {
    function recurse(value, i) {
      if (leaf(value)) {
        entries.push({keys: stack.slice(), value: value});
      } else {
        for (var key in value) {
          stack.push(key);
          recurse(value[key], i + 1);
          stack.pop();
        }
      }
    }
    recurse(this.map, 0);
    return entries;
  }

  /* Recursively visits the specified value. */
  function visit(value, i) {
    if (i < keys.length - 1) {
      for (var key in value) {
        stack.push(key);
        visit(value[key], i + 1);
        stack.pop();
      }
    } else {
      entries.push(stack.concat(value));
    }
  }

  visit(this.map, 0);
  return entries.map(function(stack) {
      var m = {};
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i], v = stack[i];
        m[k.name] = k.value ? k.value.call(null, v) : v;
      }
      return m;
    });
};
