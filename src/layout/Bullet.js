// ranges (bad, satisfactory, good)
// measures (actual, forecast)
// markers (previous, goal)

/*
 * Chart design based on the recommendations of Stephen Few. Implementation
 * based on the work of Clint Ivy, Jamie Love, and Jason Davies.
 * http://projects.instantcognition.com/protovis/bulletchart/
 */

/**
 * Constructs a new, empty bullet layout. Layouts are not typically constructed
 * directly; instead, they are added to an existing panel via
 * {@link pv.Mark#add}.
 *
 * @class
 * @extends pv.Layout
 */
pv.Layout.Bullet = function() {
  pv.Layout.call(this);
  var that = this,
      buildImplied = that.buildImplied,
      scale = that.x = pv.Scale.linear(),
      orient,
      horizontal,
      rangeColor,
      measureColor,
      x;

  /** @private Cache layout state to optimize properties. */
  this.buildImplied = function(s) {
    buildImplied.call(this, x = s);
    orient = s.orient;
    horizontal = /^left|right$/.test(orient);
    rangeColor = pv.ramp("#bbb", "#eee")
        .domain(0, Math.max(1, x.ranges.length - 1));
    measureColor = pv.ramp("steelblue", "lightsteelblue")
        .domain(0, Math.max(1, x.measures.length - 1));
  };

  /**
   * The range prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.Bullet.prototype.range
   */
  (this.range = new pv.Mark())
      .data(function() { return x.ranges; })
      .reverse(true)
      .left(function() { return orient == "left" ? 0 : null; })
      .top(function() { return orient == "top" ? 0 : null; })
      .right(function() { return orient == "right" ? 0 : null; })
      .bottom(function() { return orient == "bottom" ? 0 : null; })
      .width(function(d) { return horizontal ? scale(d) : null; })
      .height(function(d) { return horizontal ? null : scale(d); })
      .fillStyle(function() { return rangeColor(this.index); })
      .antialias(false)
      .parent = that;

  /**
   * The measure prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.Bullet.prototype.measure
   */
  (this.measure = new pv.Mark())
      .extend(this.range)
      .data(function() { return x.measures; })
      .left(function() { return orient == "left" ? 0 : horizontal ? null : this.parent.width() / 3.25; })
      .top(function() { return orient == "top" ? 0 : horizontal ? this.parent.height() / 3.25 : null; })
      .right(function() { return orient == "right" ? 0 : horizontal ? null : this.parent.width() / 3.25; })
      .bottom(function() { return orient == "bottom" ? 0 : horizontal ? this.parent.height() / 3.25 : null; })
      .fillStyle(function() { return measureColor(this.index); })
      .parent = that;

  /**
   * The marker prototype.
   *
   * @type pv.Mark
   * @name pv.Layout.Bullet.prototype.marker
   */
  (this.marker = new pv.Mark())
      .data(function() { return x.markers; })
      .left(function(d) { return orient == "left" ? scale(d) : horizontal ? null : this.parent.width() / 2; })
      .top(function(d) { return orient == "top" ? scale(d) : horizontal ? this.parent.height() / 2 : null; })
      .right(function(d) { return orient == "right" ? scale(d) : null; })
      .bottom(function(d) { return orient == "bottom" ? scale(d) : null; })
      .strokeStyle("black")
      .shape("bar")
      .angle(function() { return horizontal ? 0 : Math.PI / 2; })
      .parent = that;

  (this.tick = new pv.Mark())
      .data(function() { return scale.ticks(7); })
      .left(function(d) { return orient == "left" ? scale(d) : null; })
      .top(function(d) { return orient == "top" ? scale(d) : null; })
      .right(function(d) { return orient == "right" ? scale(d) : horizontal ? null : -6; })
      .bottom(function(d) { return orient == "bottom" ? scale(d) : horizontal ? -8 : null; })
      .height(function() { return horizontal ? 6 : null; })
      .width(function() { return horizontal ? null : 6; })
      .parent = that;
};

pv.Layout.Bullet.prototype = pv.extend(pv.Layout)
    .property("orient", String) // left, right, top, bottom
    .property("ranges")
    .property("markers")
    .property("measures")
    .property("maximum", Number);

/**
 * Default properties for bullet layouts.
 *
 * @type pv.Layout.Bullet
 */
pv.Layout.Bullet.prototype.defaults = new pv.Layout.Bullet()
    .extend(pv.Layout.prototype.defaults)
    .orient("left")
    .ranges([])
    .markers([])
    .measures([]);

/**
 * The orientation.
 *
 * @type string
 * @name pv.Layout.Bullet.prototype.orient
 */

/**
 * The array of range values.
 *
 * @type array
 * @name pv.Layout.Bullet.prototype.ranges
 */

/**
 * The array of marker values.
 *
 * @type array
 * @name pv.Layout.Bullet.prototype.markers
 */

/**
 * The array of measure values.
 *
 * @type array
 * @name pv.Layout.Bullet.prototype.measures
 */

/**
 * Optional; the maximum range value.
 *
 * @type number
 * @name pv.Layout.Bullet.prototype.maximum
 */

/** @private */
pv.Layout.Bullet.prototype.buildImplied = function(s) {
  pv.Layout.prototype.buildImplied.call(this, s);
  var size = this.parent[/^left|right$/.test(s.orient) ? "width" : "height"]();
  s.maximum = s.maximum || pv.max([].concat(s.ranges, s.markers, s.measures));
  this.x.domain(0, s.maximum).range(0, size);
};
