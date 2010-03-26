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
 * <pre>.add(pv.Layout.Grid)
 *   .rows(arrays)
 *   .fillStyle(pv.ramp("white", "black"))</pre>
 *
 * The grid subdivides the full width and height of the parent panel into equal
 * rectangles. For more data-driven subdivision, see {@link pv.Layout.Treemap}.
 *
 * @returns {pv.Layout.Grid} a grid layout.
 */
pv.Layout.Grid = function() {
  pv.Panel.call(this);

  this.def("rows")
      .def("cols")
      .data(function(d) {
          var r = this.rows(), c = this.cols();
          if ((r == null) && (typeof c == "object")) {
            r = pv.transpose(c);
          }
          if (typeof r == "object") {
            this.rows(r.length).cols(r[0] ? r[0].length : 0);
            return pv.blend(r);
          }
          return pv.repeat([d], r * c);
        })
      .width(function() {
          return this.parent.width() / this.cols();
        })
      .height(function() {
          return this.parent.height() / this.rows();
        })
      .left(function() {
          return this.width() * (this.index % this.cols());
        })
      .top(function() {
          return this.height() * Math.floor(this.index / this.cols());
        });
};

pv.Layout.Grid.prototype = pv.extend(pv.Panel);

/**
 * The number of rows, or the data in row-major order.
 *
 * @type number|array[]
 * @name pv.Layout.Grid.prototype.rows
 */

/**
 * The number of columns, or the data in column-major order.
 *
 * @type number|array[]
 * @name pv.Layout.Grid.prototype.cols
 */
