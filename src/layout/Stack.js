/**
 * Constructs a new, empty stack layout. Layouts are not typically constructed
 * directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class Implements a layout for stacked visualizations, ranging from simple
 * stacked bar charts to more elaborate "streamgraphs" composed of stacked
 * areas. Stack layouts uses length as a visual encoding, as opposed to
 * position, as the layers do not share an aligned axis.
 *
 * <p>Marks can be stacked vertically or horizontally. For example,
 *
 * <pre>vis.add(pv.Layout.Stack)
 *     .layers([[1, 1.2, 1.7, 1.5, 1.7],
 *              [.5, 1, .8, 1.1, 1.3],
 *              [.2, .5, .8, .9, 1]])
 *     .x(function() this.index * 35)
 *     .y(function(d) d * 40)
 *   .layer.add(pv.Area);</pre>
 *
 * specifies a vertically-stacked area chart, using the default "bottom-left"
 * orientation with "zero" offset. This visualization can be easily changed into
 * a streamgraph using the "wiggle" offset, which attempts to minimize change in
 * slope weighted by layer thickness. See the {@link #offset} property for more
 * supported streamgraph algorithms.
 *
 * <p>In the simplest case, the layer data can be specified as a two-dimensional
 * array of numbers. The <tt>x</tt> and <tt>y</tt> psuedo-properties are used to
 * define the thickness of each layer at the given position, respectively; in
 * the above example of the "bottom-left" orientation, the <tt>x</tt> and
 * <tt>y</tt> psuedo-properties are equivalent to the <tt>left</tt> and
 * <tt>height</tt> properties that you might use if you implemented a stacked
 * area by hand.
 *
 * <p>The advantage of using the stack layout is that the baseline, i.e., the
 * <tt>bottom</tt> property is computed automatically using the specified offset
 * algorithm. In addition, the order of layers can be computed using a built-in
 * algorithm via the <tt>order</tt> property.
 *
 * <p>With the exception of the "expand" <tt>offset</tt>, the stack layout does
 * not perform any automatic scaling of data; the values returned from
 * <tt>x</tt> and <tt>y</tt> specify pixel sizes. To simplify scaling math, use
 * this layout in conjunction with {@link pv.Scale.linear} or similar.
 *
 * <p>In other cases, the <tt>values</tt> psuedo-property can be used to define
 * the data more flexibly. As with a typical panel &amp; area, the
 * <tt>layers</tt> property corresponds to the data in the enclosing panel,
 * while the <tt>values</tt> psuedo-property corresponds to the data for the
 * area within the panel. For example, given an array of data values:
 *
 * <pre>var crimea = [
 *  { date: "4/1854", wounds: 0, other: 110, disease: 110 },
 *  { date: "5/1854", wounds: 0, other: 95, disease: 105 },
 *  { date: "6/1854", wounds: 0, other: 40, disease: 95 },
 *  ...</pre>
 *
 * and a corresponding array of series names:
 *
 * <pre>var causes = ["wounds", "other", "disease"];</pre>
 *
 * Separate layers can be defined for each cause like so:
 *
 * <pre>vis.add(pv.Layout.Stack)
 *     .layers(causes)
 *     .values(crimea)
 *     .x(function(d) x(d.date))
 *     .y(function(d, p) y(d[p]))
 *   .layer.add(pv.Area)
 *     ...</pre>
 *
 * As with the panel &amp; area case, the datum that is passed to the
 * psuedo-properties <tt>x</tt> and <tt>y</tt> are the values (an element in
 * <tt>crimea</tt>); the second argument is the layer data (a string in
 * <tt>causes</tt>). Additional arguments specify the data of enclosing panels,
 * if any.
 *
 * @extends pv.Layout
 */
pv.Layout.Stack = function() {
  pv.Layout.call(this);
  var that = this,
      /** @ignore */ none = function() { return null; },
      prop = {t: none, l: none, r: none, b: none, w: none, h: none},
      values,
      buildImplied = that.buildImplied;

  /** @private Proxy the given property on the layer. */
  function proxy(name) {
    return function() {
        return prop[name](this.parent.index, this.index);
      };
  }

  /** @private Compute the layout! */
  this.buildImplied = function(s) {
    buildImplied.call(this, s);

    var data = s.layers,
        n = data.length,
        m,
        orient = s.orient,
        horizontal = /^(top|bottom)\b/.test(orient),
        h = this.parent[horizontal ? "height" : "width"](),
        x = [],
        y = [],
        dy = [];

    /*
     * Iterate over the data, evaluating the values, x and y functions. The
     * context in which the x and y psuedo-properties are evaluated is a
     * pseudo-mark that is a grandchild of this layout.
     */
    var stack = pv.Mark.stack, o = {parent: {parent: this}};
    stack.unshift(null);
    values = [];
    for (var i = 0; i < n; i++) {
      dy[i] = [];
      y[i] = [];
      o.parent.index = i;
      stack[0] = data[i];
      values[i] = this.$values.apply(o.parent, stack);
      if (!i) m = values[i].length;
      stack.unshift(null);
      for (var j = 0; j < m; j++) {
        stack[0] = values[i][j];
        o.index = j;
        if (!i) x[j] = this.$x.apply(o, stack);
        dy[i][j] = this.$y.apply(o, stack);
      }
      stack.shift();
    }
    stack.shift();

    /* order */
    var index;
    switch (s.order) {
      case "inside-out": {
        var max = dy.map(function(v) { return pv.max.index(v); }),
            map = pv.range(n).sort(function(a, b) { return max[a] - max[b]; }),
            sums = dy.map(function(v) { return pv.sum(v); }),
            top = 0,
            bottom = 0,
            tops = [],
            bottoms = [];
        for (var i = 0; i < n; i++) {
          var j = map[i];
          if (top < bottom) {
            top += sums[j];
            tops.push(j);
          } else {
            bottom += sums[j];
            bottoms.push(j);
          }
        }
        index = bottoms.reverse().concat(tops);
        break;
      }
      case "reverse": index = pv.range(n - 1, -1, -1); break;
      default: index = pv.range(n); break;
    }

    /* offset */
    switch (s.offset) {
      case "silohouette": {
        for (var j = 0; j < m; j++) {
          var o = 0;
          for (var i = 0; i < n; i++) o += dy[i][j];
          y[index[0]][j] = (h - o) / 2;
        }
        break;
      }
      case "wiggle": {
        var o = 0;
        for (var i = 0; i < n; i++) o += dy[i][0];
        y[index[0]][0] = o = (h - o) / 2;
        for (var j = 1; j < m; j++) {
          var s1 = 0, s2 = 0, dx = x[j] - x[j - 1];
          for (var i = 0; i < n; i++) s1 += dy[i][j];
          for (var i = 0; i < n; i++) {
            var s3 = (dy[index[i]][j] - dy[index[i]][j - 1]) / (2 * dx);
            for (var k = 0; k < i; k++) {
              s3 += (dy[index[k]][j] - dy[index[k]][j - 1]) / dx;
            }
            s2 += s3 * dy[index[i]][j];
          }
          y[index[0]][j] = o -= s1 ? s2 / s1 * dx : 0;
        }
        break;
      }
      case "expand": {
        for (var j = 0; j < m; j++) {
          y[index[0]][j] = 0;
          var k = 0;
          for (var i = 0; i < n; i++) k += dy[i][j];
          if (k) {
            k = h / k;
            for (var i = 0; i < n; i++) dy[i][j] *= k;
          } else {
            k = h / n;
            for (var i = 0; i < n; i++) dy[i][j] = k;
          }
        }
        break;
      }
      default: {
        for (var j = 0; j < m; j++) y[index[0]][j] = 0;
        break;
      }
    }

    /* Propagate the offset to the other series. */
    for (var j = 0; j < m; j++) {
      var o = y[index[0]][j];
      for (var i = 1; i < n; i++) {
        o += dy[index[i - 1]][j];
        y[index[i]][j] = o;
      }
    }

    /* Find the property definitions for dynamic substitution. */
    var i = orient.indexOf("-"),
        pdy = horizontal ? "h" : "w",
        px = i < 0 ? (horizontal ? "l" : "b") : orient.charAt(i + 1),
        py = orient.charAt(0);
    for (var p in prop) prop[p] = none;
    prop[px] = function(i, j) { return x[j]; };
    prop[py] = function(i, j) { return y[i][j]; };
    prop[pdy] = function(i, j) { return dy[i][j]; };
  };

  /**
   * The layer prototype. This prototype is intended to be used with an area,
   * bar or panel mark (or subclass thereof). Other mark types may be possible,
   * though note that the stack layout is not currently designed to support
   * radial stacked visualizations using wedges.
   *
   * <p>The layer is not a direct child of the stack layout; a hidden panel is
   * used to replicate layers.
   *
   * @type pv.Mark
   * @name pv.Layout.Stack.prototype.layer
   */
  this.layer = new pv.Mark()
      .data(function() { return values[this.parent.index]; })
      .top(proxy("t"))
      .left(proxy("l"))
      .right(proxy("r"))
      .bottom(proxy("b"))
      .width(proxy("w"))
      .height(proxy("h"));

  this.layer.add = function(type) {
    return that.add(pv.Panel)
        .data(function() { return that.layers(); })
      .add(type)
        .extend(this);
  };
};

pv.Layout.Stack.prototype = pv.extend(pv.Layout)
    .property("orient", String)
    .property("offset", String)
    .property("order", String)
    .property("layers");

/**
 * Default properties for stack layouts. The default orientation is
 * "bottom-left", the default offset is "zero", and the default layers is
 * <tt>[[]]</tt>.
 *
 * @type pv.Layout.Stack
 */
pv.Layout.Stack.prototype.defaults = new pv.Layout.Stack()
    .extend(pv.Layout.prototype.defaults)
    .orient("bottom-left")
    .offset("zero")
    .layers([[]]);

/** @private */
pv.Layout.Stack.prototype.$x
    = /** @private */ pv.Layout.Stack.prototype.$y
    = function() { return 0; };

/**
 * The x psuedo-property; determines the position of the value within the layer.
 * This typically corresponds to the independent variable. For example, with the
 * default "bottom-left" orientation, this function defines the "left" property.
 *
 * @param {function} f the x function.
 * @returns {pv.Layout.Stack} this.
 */
pv.Layout.Stack.prototype.x = function(f) {
  /** @private */ this.$x = pv.functor(f);
  return this;
};

/**
 * The y psuedo-property; determines the thickness of the layer at the given
 * value.  This typically corresponds to the dependent variable. For example,
 * with the default "bottom-left" orientation, this function defines the
 * "height" property.
 *
 * @param {function} f the y function.
 * @returns {pv.Layout.Stack} this.
 */
pv.Layout.Stack.prototype.y = function(f) {
  /** @private */ this.$y = pv.functor(f);
  return this;
};

/** @private The default value function; identity. */
pv.Layout.Stack.prototype.$values = pv.identity;

/**
 * The values function; determines the values for a given layer. The default
 * value is the identity function, which assumes that the layers property is
 * specified as a two-dimensional (i.e., nested) array.
 *
 * @param {function} f the values function.
 * @returns {pv.Layout.Stack} this.
 */
pv.Layout.Stack.prototype.values = function(f) {
  this.$values = pv.functor(f);
  return this;
};

/**
 * The layer data in row-major order. The value of this property is typically a
 * two-dimensional (i.e., nested) array, but any array can be used, provided the
 * values psuedo-property is defined accordingly.
 *
 * @type array[]
 * @name pv.Layout.Stack.prototype.layers
 */

/**
 * The layer orientation. The following values are supported:<ul>
 *
 * <li>bottom-left == bottom
 * <li>bottom-right
 * <li>top-left == top
 * <li>top-right
 * <li>left-top
 * <li>left-bottom == left
 * <li>right-top
 * <li>right-bottom == right
 *
 * </ul>. The default value is "bottom-left", which means that the layers will
 * be built from the bottom-up, and the values within layers will be laid out
 * from left-to-right.
 *
 * <p>Note that with non-zero baselines, some orientations may give similar
 * results. For example, offset("silohouette") centers the layers, resulting in
 * a streamgraph. Thus, the orientations "bottom-left" and "top-left" will
 * produce similar results, differing only in the layer order.
 *
 * @type string
 * @name pv.Layout.Stack.prototype.orient
 */

/**
 * The layer order. The following values are supported:<ul>
 *
 * <li><i>null</i> - use given layer order.
 * <li>inside-out - sort by maximum value, with balanced order.
 * <li>reverse - use reverse of given layer order.
 *
 * </ul>For details on the inside-out order algorithm, refer to "Stacked Graphs
 * -- Geometry &amp; Aesthetics" by L. Byron and M. Wattenberg, IEEE TVCG
 * November/December 2008.
 *
 * @type string
 * @name pv.Layout.Stack.prototype.order
 */

/**
 * The layer offset; the y-position of the bottom of the lowest layer. The
 * following values are supported:<ul>
 *
 * <li>zero - use a zero baseline, i.e., the y-axis.
 * <li>silohouette - center the stream, i.e., ThemeRiver.
 * <li>wiggle - minimize weighted change in slope.
 * <li>expand - expand layers to fill the enclosing layout dimensions.
 *
 * </ul>For details on these offset algorithms, refer to "Stacked Graphs --
 * Geometry &amp; Aesthetics" by L. Byron and M. Wattenberg, IEEE TVCG
 * November/December 2008.
 *
 * @type string
 * @name pv.Layout.Stack.prototype.offset
 */
