pv.Layout.Horizon = function() {
  pv.Layout.call(this);
  var mirror = true, // whether to mirror or offset
      size, // band size
      red, // negative band color
      blue; // positive band color

  /** @private */
  function data() {
    size = Math.round(this.parent.height());
    mirror = this.mode() == "mirror";
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
      .negativeStyle("red")
      .positiveStyle("blue")
      .data(data)
      .overflow("hidden")
      .height(function() { return size; })
      .transform(function(i) {
          var y = Math.floor((i + 1) / 2) * size * (!mirror && (i % 2) ? -1 : 1);
          return pv.Transform.identity.translate(0, y);
        });

  this.band = new pv.Mark()
      .top(function(d, i) { return mirror && (i % 2) ? 0 : null; })
      .bottom(function(d, i) { return mirror && (i % 2) ? null : 0; })
      .fillStyle(function(d, i) { return ((i % 2) ? red : blue)((i >> 1) + 1); });
};

pv.Layout.Horizon.prototype = pv.extend(pv.Layout)
    .property("bands", Number)
    .property("mode", String)
    .property("backgroundStyle", pv.color)
    .property("negativeStyle", pv.color)
    .property("positiveStyle", pv.color);

pv.Layout.Horizon.prototype.add = function(type) {
  return pv.Mark.prototype.add.call(this, pv.Panel).add(type).extend(this.band);
};

pv.Layout.Horizon.prototype.fillStyle = pv.Layout.Horizon.prototype.backgroundStyle;
