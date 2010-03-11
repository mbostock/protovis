pv.Layout.Horizon = function() {
  pv.Layout.call(this);
  var mode, size, red, blue;

  /** @private */
  function data() {
    mode = this.mode();
    size = Math.round((mode == "color" ? .5 : 1) * this.parent.height());
    var n = this.bands(), fill = this.backgroundStyle();
    red = pv.Scale.linear(0, n).range(fill, this.negativeStyle());
    blue = pv.Scale.linear(0, n).range(fill, this.positiveStyle());
    return pv.range(n * 2);
  }

  /* Set the fill style directly, rather than using the alias. */
  this.propertyValue("fillStyle", function(i) {
      return i ? null : this.backgroundStyle();
    }).type = 3;

  this.bands(2)
      .mode("offset")
      .backgroundStyle("white")
      .positiveStyle("#1f77b4")
      .negativeStyle("#d62728")
      .data(data)
      .overflow("hidden")
      .height(function() { return size; })
      .top(function(i) { return mode == "color" ? (i & 1) * size : 0; });

  this.band = new pv.Mark()
      .top(function(d, i) {
          return mode == "mirror" && i & 1
              ? (i + 1 >> 1) * size
              : null;
        })
      .bottom(function(d, i) {
          return mode == "mirror"
              ? (i & 1 ? null : (i + 1 >> 1) * -size)
              : ((i & 1 || -1) * (i + 1 >> 1) * size);
        })
      .fillStyle(function(d, i) {
          return (i & 1 ? red : blue)((i >> 1) + 1);
        });

  var add = this.add;
  this.add = function(type) {
    return add.call(this, pv.Panel).add(type).extend(this.band);
  };
};

pv.Layout.Horizon.prototype = pv.extend(pv.Layout)
    .property("bands", Number)
    .property("mode", String) // mirror, offset, color
    .property("backgroundStyle", pv.color)
    .property("negativeStyle", pv.color)
    .property("positiveStyle", pv.color);

pv.Layout.Horizon.prototype.fillStyle = pv.Layout.Horizon.prototype.backgroundStyle;
