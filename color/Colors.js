/**
 * Returns a new categorical color encoding using the specified colors.  The
 * arguments to this method are an array of colors; see {@link pv.color}. For
 * example, to create a categorical color encoding using the <tt>species</tt>
 * attribute:
 *
 * <pre>pv.colors("red", "green", "blue").by(function(d) d.species)</pre>
 *
 * The result of this expression can be used as a fill- or stroke-style
 * property. This assumes that the data's <tt>species</tt> attribute is a
 * string.
 *
 * @returns {pv.Colors} a new categorical color encoding.
 * @param {string} colors... categorical colors.
 * @see pv.Colors
 */
pv.colors = function() {
  return pv.Colors(arguments);
};

/**
 * Returns a new categorical color encoding using the specified colors. This
 * constructor is typically not used directly; use {@link pv.colors} instead.
 *
 * @class Represents a categorical color encoding using the specified colors.
 * The returned object can be used as a property function; the appropriate
 * categorical color will be returned by evaluating the current datum, or
 * through whatever other means the encoding uses to determine uniqueness, per
 * the {@link #by} method. The default implementation allocates a distinct color
 * per {@link pv.Mark#childIndex}.
 *
 * @param {string[]} values an array of colors; see {@link pv.color}.
 * @returns {pv.Colors} a new categorical color encoding.
 * @see pv.colors
 */
pv.Colors = function(values) {

  /**
   * @ignore Each set of colors has an associated (numeric) ID that is used to
   * store a cache of assigned colors on the root scene. As unique keys are
   * discovered, a new color is allocated and assigned to the given key.
   *
   * The key function determines how uniqueness is determined. By default,
   * colors are assigned using the mark's childIndex, such that each new mark
   * added is given a new color. Note that derived marks will not inherit the
   * exact color of the prototype, but instead inherit the set of colors.
   */
  function colors(keyf) {
    var id = pv.Colors.count++;

    function color() {
      var key = keyf.apply(this, this.root.scene.data);
      var state = this.root.scene.colors;
      if (!state) this.root.scene.colors = state = {};
      if (!state[id]) state[id] = { count: 0 };
      var color = state[id][key];
      if (color == undefined) {
        color = state[id][key] = values[state[id].count++ % values.length];
      }
      return color;
    }
    return color;
  }

  var c = colors(function() { return this.childIndex; });

  /**
   * Allows a new set of colors to be derived from the current set using a
   * different key function. For instance, to color marks using the value of the
   * field "foo", say:
   *
   * <pre>pv.Colors.category10.by(function(d) d.foo)</pre>
   *
   * For convenience, "index" and "parent.index" keys are predefined.
   *
   * @param {function} v the new key function.
   * @name pv.Colors.prototype.by
   * @function
   * @returns {pv.Colors} a new color scheme
   */
  c.by = colors;

  /**
   * A derivative color encoding using the same colors, but allocating unique
   * colors based on the mark index.
   *
   * @name pv.Colors.prototype.unique
   * @type pv.Colors
   */
  c.unique = c.by(function() { return this.index; });

  /**
   * A derivative color encoding using the same colors, but allocating unique
   * colors based on the parent index.
   *
   * @name pv.Colors.prototype.parent
   * @type pv.Colors
   */
  c.parent = c.by(function() { return this.parent.index; });

  /**
   * The underlying array of colors.
   *
   * @type string[]
   * @name pv.Colors.prototype.values
   */
  c.values = values;

  return c;
};

/** @private */
pv.Colors.count = 0;

/* From Flare. */

/**
 * A 10-color scheme.
 *
 * @type pv.Colors
 */
pv.Colors.category10 = pv.colors(
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
);

/**
 * A 20-color scheme.
 *
 * @type pv.Colors
 */
pv.Colors.category20 = pv.colors(
  "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
  "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
  "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
  "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"
);

/**
 * An alternative 19-color scheme.
 *
 * @type pv.Colors
 */
pv.Colors.category19 = pv.colors(
  "#9c9ede", "#7375b5", "#4a5584", "#cedb9c", "#b5cf6b",
  "#8ca252", "#637939", "#e7cb94", "#e7ba52", "#bd9e39",
  "#8c6d31", "#e7969c", "#d6616b", "#ad494a", "#843c39",
  "#de9ed6", "#ce6dbd", "#a55194", "#7b4173"
);
