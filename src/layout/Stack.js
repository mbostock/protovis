/**
 * Returns a new stack layout.
 *
 * @class A layout for stacking marks vertically or horizontally. For example,
 *
 * <pre>vis.add(pv.Layout.Stack)
 *     .layers([[1, 1.2, 1.7, 1.5, 1.7],
 *              [.5, 1, .8, 1.1, 1.3],
 *              [.2, .5, .8, .9, 1]])
 *     .step(function() this.index * 35)
 *     .size(function(d) d * 40)
 *   .layer.add(pv.Area);</pre>
 *
 * specifies a vertically-stacked area chart.
 *
 * @returns {pv.Layout.Stack} a stack layout.
 */
pv.Layout.Stack = function() {
  pv.Panel.call(this);
  var none = function() { return null; },
      prop = {t: none, l: none, r: none, b: none, w: none, h: none};

  /** @private Proxy the given property on the layer. */
  function proxy(name) {
    return function() {
        return prop[name](this.parent.index, this.index);
      };
  }

  /** @private Compute the layout! */
  function data() {
    var data = this.layers(),
        n = data.length,
        m = data[0].length,
        orient = this.orient(),
        horizontal = /^(top|bottom)\b/.test(orient),
        h = this.parent[horizontal ? "height" : "width"](),
        binds = this.binds.stack,
        x = [],
        y = [],
        dy = [];

    /* Iterate over the data, evaluating the x and y functions. */
    var stack = pv.Mark.stack;
    stack.unshift(null, null);
    for (var i = 0; i < n; i++) {
      dy[i] = [];
      y[i] = [];
      this.index = i;
      stack[1] = data[i];
      for (var j = 0; j < m; j++) {
        stack[0] = data[i][j];
        pv.Mark.prototype.index = this.layer.index = j;
        if (!i) x[j] = binds.x.apply(this.layer, stack);
        dy[i][j] = binds.y.apply(this.layer, stack);
      }
    }
    delete this.layer.index;
    delete this.index;
    stack.splice(0, 2);

    /* order */
    var index;
    switch (this.order()) {
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
    switch (this.offset()) {
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
        py = i < 0 ? (horizontal ? "b" : "l") : orient.charAt(0);
    for (var p in prop) prop[p] = none;
    prop[px] = function(i, j) { return x[j]; };
    prop[py] = function(i, j) { return y[i][j]; };
    prop[pdy] = function(i, j) { return dy[i][j]; };
    return data;
  }

  this.def("orient", "bottom-left")
      .def("offset", "zero")
      .def("order")
      .def("layers", [[]])
      .data(data);

  (this.layer = new pv.Mark()
      .data(pv.identity)
      .top(proxy("t"))
      .left(proxy("l"))
      .right(proxy("r"))
      .bottom(proxy("b"))
      .width(proxy("w"))
      .height(proxy("h")))
      .parent = this;
};

pv.Layout.Stack.prototype = pv.extend(pv.Panel);

/** @private Bind the step and size functions, allowing inheritance. */
pv.Layout.Stack.prototype.bind = function() {
  pv.Panel.prototype.bind.call(this);
  var mark = this, binds = this.binds.stack || (this.binds.stack = {});
  do {
    if (!binds.x) binds.x = mark.$step;
    if (!binds.y) binds.y = mark.$size;
  } while (mark = mark.proto);
};

/**
 * The step function; determines the position of the sample within the layer.
 * This typically corresponds to the independent variable. For example, with the
 * default "bottom-left" orientation, this function defines the "left" property.
 *
 * @param {function} f the step function.
 * @returns this.
 */
pv.Layout.Stack.prototype.step = function(f) {
  if (arguments.length) {
    this.$step = typeof f == "function" ? f : function() { return f; };
    return this;
  }
  return this.$step;
};

/**
 * The size function; determines the span size of the sample within the layer.
 * This typically corresponds to the dependent variable. For example, with the
 * default "bottom-left" orientation, this function defines the "height"
 * property.
 *
 * @param {function} f the size function.
 * @returns this.
 */
pv.Layout.Stack.prototype.size = function(f) {
  if (arguments.length) {
    this.$size = typeof f == "function" ? f : function() { return f; };
    return this;
  }
  return this.$size;
};

/**
 * The layer data in row-major order.
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
 * be built from the bottom-up, and the samples within layers will be laid out
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
 * <li><i>null</i>
 * <li>inside-out
 * <li>reverse
 *
 * </ul>.
 *
 * @type string
 * @name pv.Layout.Stack.prototype.order
 */
