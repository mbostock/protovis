/**
 * Returns a new stack layout.
 *
 * @class A layout for stacking marks vertically or horizontally. For example,
 *
 * <pre>vis.add(pv.Layout.Stack)
 *     .data([[1, 1.2, 1.7, 1.5, 1.7],
 *            [.5, 1, .8, 1.1, 1.3],
 *            [.2, .5, .8, .9, 1]])
 *   .add(pv.Area)
 *     .height(function(d) d * 40)
 *     .left(function() this.index * 35);</pre>
 *
 * specifies a vertically-stacked area chart.
 *
 * @returns {pv.Layout.Stack} a stack layout.
 */
pv.Layout.Stack = function() {
  pv.Layout.call(this);
  var that = this;

  /** @private */
  var label = new pv.Mark()
      .data(pv.identity)
      .visible(function() {
          return this.index == that.scene.$stack.max[this.parent.index];
        })
      .textBaseline("middle")
      .textAlign("center");

  /**
   * Adds a mark of the specified type to a new panel, using this stack layout.
   * Any positional properties defined on the returned mark will be evaluated
   * immediately after the panel's data, allowing the layout to compute the
   * implied offset.
   */
  this.add = function(type) {
      var mark = that.parent.add(pv.Panel)
              .extend(that)
              .data(function() {
                  var data = that.scene.$stack.data;
                  that.prebuild(data, this.children[0]);
                  return data;
                })
              .visible(function() { return that.scene[this.index].visible; })
            .add(type)
              .data(pv.identity),
          bind = mark.bind;
      mark.bind = function() { that.prebind(bind, this); };

      /** @private Returns the target instance of the mark. */
      function target() {
        return mark.parent.scene[this.parent.index].children[0][this.index];
      }

      /** The label prototype; bound to the added mark. */
      mark.label = new pv.Mark()
          .extend(label)
          .left(function() {
              var s = target.call(this);
              return s.left + s.width / 2;
            })
          .bottom(function() {
              var s = target.call(this);
              return s.bottom + s.height / 2;
            });

      /**
       * Adds a label of the specified type (typically pv.Label) to a new panel
       * using this stack layout. One label will be rendered per series, at the
       * maximum value of the series.
       */
      mark.label.add = function(type) {
          return that.parent.add(pv.Panel)
              .data(function() { return that.scene.$stack.data; })
            .add(type)
              .extend(this);
        };

      return mark;
    };
};

pv.Layout.Stack.prototype = pv.extend(pv.Layout)
    .property("orient", String)
    .property("order", String)
    .property("offset", String);

pv.Layout.Stack.prototype.defaults = new pv.Layout.Stack()
    .extend(pv.Layout.prototype.defaults)
    .orient("bottom")
    .offset("zero");

/** @private Capture the panel data on initialization. */
pv.Layout.Stack.prototype.init = function(data) {
  this.scene.$stack = {data: data};
};

/**
 * @private Before the child is bound, capture the original positional property
 * definitions so that the layout can use these properties to compute the
 * offset.
 */
pv.Layout.Stack.prototype.prebind = function(bind, child) {
  var o = child.binds ? child.binds.$stack : {};
  bind.call(child);

  /** @private The positional properties for dynamic substitution. */
  var positionals = {
    "left": 1,
    "right": 1,
    "top": 1,
    "bottom": 1,
    "width": 1,
    "height": 1
  };

  /** @private Returns a constant property function for the specified value. */
  function constant(x) {
    return function() { return x; };
  }

  /* Override the positional properties with dynamics. */
  var properties = child.binds.properties;
  for (var name in positionals) {
    var p = properties[name];
    if (!p.original) { // ignore our dynamic binds
      var d = o[name] = child.propertyValue(name, p.value);
      d.type = p.type;
      d.original = p.value;
    }
  }

  /* Rebind the dynamic properties. */
  bind.call(child);
  child.binds.$stack = o;
};

/**
 * @private Before the child is built, reassign the positional properties to the
 * appropriate dynamic function, so as to lookup the computed offset.
 */
pv.Layout.Stack.prototype.prebuild = function(data, child) {
  var orient = this.orient(),
      horizontal = /^(top|bottom)$/.test(orient),
      n = data.length,
      m = data[0].length,
      h = this.parent[horizontal ? "height" : "width"](),
      x = [],
      y = [],
      dy = [],
      z = [],
      parent = child.parent,
      properties = child.binds.$stack;

  /* Find the property definitions for dynamic substitution. */
  var pdy = properties[horizontal ? "height" : "width"],
      px = horizontal ? properties.left : properties.top,
      py = properties[orient];

  /* If the x-property is null (the default), use the alternative. */
  if (px.value == null) px = horizontal ? properties.right : properties.bottom;

  /* Iterate over the data, evaluating the x and dy functions. */
  var stack = pv.Mark.stack;
  stack.unshift(null);
  for (var i = 0; i < n; i++) {
    dy[i] = [];
    y[i] = [];
    z[i] = this.scene[i].visible;
    parent.index = i;
    for (var j = 0; j < m; j++) {
      stack[0] = data[i][j];
      pv.Mark.prototype.index = child.index = j;
      if (!i) x[j] = px.original.apply(child, stack);
      dy[i][j] = z[i] ? pdy.original.apply(child, stack) : 0;
    }
  }
  delete parent.index;
  delete child.index;
  stack.shift();

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
      var nz = pv.sum(z);
      for (var j = 0; j < m; j++) {
        y[index[0]][j] = 0;
        var k = 0;
        for (var i = 0; i < n; i++) k += dy[i][j];
        if (k) {
          k = h / k;
          for (var i = 0; i < n; i++) dy[i][j] *= k;
        } else {
          k = h / nz;
          for (var i = 0; i < n; i++) dy[i][j] = z[i] ? k : 0;
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

  /* Populate the maximum indices for labeling. */
  this.scene.$stack.max = dy.map(function(array) {
      return pv.max.index(array);
    });

  /* Substitute the dynamic properties so the child can build. */
  px.type = py.type = pdy.type = 3;
  px.value = function() { return x[this.index]; };
  py.value = function() { return y[this.parent.index][this.index]; };
  pdy.value = function() { return dy[this.parent.index][this.index]; };
  return data;
};
