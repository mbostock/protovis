/**
 * Returns a new grid layout.
 *
 * @class A grid layout with regularly-sized rows and columns. <img
 * src="../grid.png" width="160" height="160" align="right"> The number of rows
 * and columns are determined from their respective properties. For example, the
 * 2&times;3 array:
 *
 * <pre>1 2 3
 * 4 5 6</pre>
 *
 * can be represented using the <tt>rows</tt> property as:
 *
 * <pre>[[1, 2, 3], [4, 5, 6]]</pre>
 *
 * If your data is in column-major order, you can equivalently use the
 * <tt>columns</tt> property. If the <tt>rows</tt> property is an array, it
 * takes priority over the <tt>columns</tt> property.
 *
 * <p>This layout defines left, top, width, height and data properties. The data
 * property will be the associated element in the array. For example, if the
 * array is a two-dimensional array of values in the range [0,1], a simple
 * heatmap can be generated as:
 *
 * <pre>vis.add(pv.Layout.Grid)
 *     .rows(arrays)
 *   .add(pv.Bar)
 *     .fillStyle(pv.ramp("white", "black"))</pre>
 *
 * The grid subdivides the full width and height of the parent panel into equal
 * rectangles. For more data-driven subdivision, see {@link pv.Layout.Treemap}.
 *
 * @extends pv.Layout
 * @constructor
 * @returns {pv.Layout.Grid} a grid layout.
 */
pv.Layout.Grid = function() {
  pv.Layout.call(this);
  var that = this,
      add = that.add;

  var cells = new pv.Panel()
      .data(function() {
          return that.scene[that.index].$grid;
        })
      .width(function() {
          return that.width() / that.cols();
        })
      .height(function() {
          return that.height() / that.rows();
        })
      .left(function() {
          return this.width() * (this.index % that.cols());
        })
      .top(function() {
          return this.height() * Math.floor(this.index / that.cols());
        });

  that.add = function(type) {
    return add.call(this, pv.Panel).extend(cells).add(type);
  };
};

pv.Layout.Grid.prototype = pv.extend(pv.Layout)
    .property("rows")
    .property("cols");

pv.Layout.Grid.prototype.defaults = new pv.Layout.Grid()
    .extend(pv.Layout.prototype.defaults)
    .rows(1)
    .cols(1);

/** @private */
pv.Layout.Grid.prototype.buildImplied = function(s) {
  pv.Layout.prototype.buildImplied.call(this, s);
  var r = s.rows, c = s.cols;
  if (typeof c == "object") r = pv.transpose(c);
  if (typeof r == "object") {
    s.$grid = pv.blend(r);
    s.rows = r.length;
    s.cols = r[0] ? r[0].length : 0;
  } else {
    s.$grid = pv.repeat([s.data], r * c);
  }
};

/**
 * The number of rows. This property can also be specified as the data in
 * row-major order; in this case, the rows property is implicitly set to the
 * length of the array, and the cols property is set to the length of the first
 * element in the array.
 *
 * @type number
 * @name pv.Layout.Grid.prototype.rows
 */

/**
 * The number of columns. This property can also be specified as the data in
 * column-major order; in this case, the cols property is implicitly set to the
 * length of the array, and the rows property is set to the length of the first
 * element in the array.
 *
 * @type number
 * @name pv.Layout.Grid.prototype.cols
 */
