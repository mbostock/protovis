/**
 * Returns a new grid layout.
 *
 * @class A grid layout with regularly-sized rows and columns. <img
 * src="../grid.png" width="160" height="160" align="right"> The number of rows
 * and columns are determined from the array, which should be in row-major
 * order. For example, the 2&times;3 array:
 *
 * <pre>1 2 3
 * 4 5 6</pre>
 *
 * should be represented as:
 *
 * <pre>[[1, 2, 3], [4, 5, 6]]</pre>
 *
 * If your data is in column-major order, you can use {@link pv.transpose} to
 * transpose it.
 *
 * <p>This layout defines left, top, width, height and data properties. The data
 * property will be the associated element in the array. For example, if the
 * array is a two-dimensional array of values in the range [0,1], a simple
 * heatmap can be generated as:
 *
 * <pre>.add(pv.Layout.Grid)
 *   .data(arrays)
 * .add(pv.Bar)
 *   .fillStyle(pv.ramp("white", "black"))</pre>
 *
 * By default, the grid fills the full width and height of the parent panel.
 *
 * @param {array[]} rows an array of arrays.
 * @returns {pv.Layout.grid} a grid layout.
 */
pv.Layout.Grid = function() {
  pv.Layout.call(this);

  /* Set the default data directly, rather than using the wrapper. */
  this.propertyValue("data", function(d) {
      return pv.range(this.rows() * this.cols()).map(function() { return d; });
    }).type = 3;

  this.rows(1)
      .cols(1)
      .width(function() { return this.parent.width() / this.cols(); })
      .height(function() { return this.parent.height() / this.rows(); })
      .left(function() { return this.width() * (this.index % this.cols()); })
      .top(function() { return this.height() * Math.floor(this.index / this.cols()); });
};

pv.Layout.Grid.prototype = pv.extend(pv.Layout)
    .property("rows", Number)
    .property("cols", Number);

/**
 * Sets the number of rows. This method can be used to replicate the enclosing
 * panel data in the abscence of a data property. Note that if the data property
 * is specified, it takes priority over the rows property.
 *
 * @param {number} v the number of rows.
 * @function
 * @name pv.Layout.grid.prototype.rows
 * @returns {pv.Layout.grid} this.
 */

/**
 * Sets the number of columns. This method can be used to replicate the
 * enclosing panel data in the abscence of a data property. Note that if the
 * data property is specified, it takes priority over the columns property.
 *
 * @param {number} v the number of columns.
 * @function
 * @name pv.Layout.grid.prototype.cols
 * @returns {pv.Layout.grid} this.
 */

/**
 * Sets the data. The data should be specified as an array of arrays; this array
 * will be blended such that child marks will see elements of the subarrays.
 * Setting the data associated with this grid implicitly sets the number of rows
 * and columns.
 *
 * @param {array[]} v the new data.
 * @function
 * @name pv.Layout.grid.prototype.data
 * @returns {pv.Layout.grid} this.
 */
pv.Layout.Grid.prototype.data = function(v) {
  if (arguments.length) {
    var x;
    if (typeof v == "function") {
      x = function() {
          var x = v.apply(this, arguments);
          this.rows(x.length).cols(x[0] ? x[0].length : 0);
          return pv.blend(x);
        };
    } else {
      x = pv.blend(v);
      this.rows(v.length).cols(v[0] ? v[0].length : 0);
    }
    return pv.Mark.prototype.data.call(this, x);
  }
  return this.instance().data;
};
