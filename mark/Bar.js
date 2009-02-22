pv.Bar = function() {
  pv.Mark.call(this);
  this.defineProperties(pv.Bar.properties);
};

pv.Bar.prototype = pv.Mark.extend();

pv.Bar.properties = new pv.Mark.Properties();
pv.Bar.properties.define("left");
pv.Bar.properties.define("right");
pv.Bar.properties.define("top");
pv.Bar.properties.define("bottom");
pv.Bar.properties.define("width");
pv.Bar.properties.define("height");
pv.Bar.properties.define("lineWidth", 1);
pv.Bar.properties.define("strokeStyle", null);
pv.Bar.properties.define("fillStyle", pv.Colors.category20());

pv.Bar.toString = function() "bar";

pv.Bar.anchor = function(name) {
  var bar = this;
  var anchor = pv.Mark.prototype.add.call(this, pv.Mark.Anchor);

  anchor.name = (typeof name == "function") ? name : function() name;

  anchor.$left = function(d) {
      switch (this.name(d)) {
        case "bottom":
        case "top":
        case "center": return bar.left() + bar.width() / 2;
        case "left": return bar.left();
      }
      return undefined;
    };

  anchor.$right = function(d) {
      switch (this.name(d)) {
        case "bottom":
        case "top":
        case "center": return bar.right() + bar.width() / 2;
        case "right": return bar.right();
      }
      return undefined;
    };

  anchor.$top = function(d) {
      switch (this.name(d)) {
        case "left":
        case "right":
        case "center": return bar.top() + bar.height() / 2;
        case "top": return bar.top();
      }
      return undefined;
    };

  anchor.$bottom = function(d) {
      switch (this.name(d)) {
        case "left":
        case "right":
        case "center": return bar.bottom() + bar.height() / 2;
        case "bottom": return bar.bottom();
      }
      return undefined;
    };

  anchor.$textAlign = function(d) {
      switch (this.name(d)) {
        case "left": return "left";
        case "bottom":
        case "top":
        case "center": return "center";
        case "right": return "right";
      }
      return undefined;
    };

  anchor.$textBaseline = function(d) {
      switch (this.name(d)) {
        case "right":
        case "left":
        case "center": return "middle";
        case "top": return "top";
        case "bottom": return "bottom";
      }
      return undefined;
    };

  return anchor;
};

pv.Bar.render = function(g) {
  var markState = this.renderState.marks[this.markIndex] = [];
  for each (let d in this.$data()) {

    /* Skip invisible marks. */
    if (!this.$visible(d)) {
      markState[this.index] = {
        data : d,
        visible : false,
      };
      this.visualization.index++;
      continue;
    }

    var x = this.$left(d);
    if (x == undefined) {
      x = g.canvas.width - this.$right(d) - this.$width(d);
    }

    var y = this.$top(d);
    if (y == undefined) {
      y = g.canvas.height - this.$bottom(d) - this.$height(d);
    }

    var w = this.$width(d);
    if (w == undefined) {
      w = g.canvas.width - this.$right(d) - x;
    }

    var h = this.$height(d);
    if (h == undefined) {
      h = g.canvas.height - this.$bottom(d) - y;
    }

    var fillStyle = this.$fillStyle(d);
    var strokeStyle = this.$strokeStyle(d);
    var lineWidth = this.$lineWidth(d);

    g.save();
    if (fillStyle) {
      g.fillStyle = fillStyle;
      g.fillRect(x, y, w, h);
    }
    if (strokeStyle) {
      g.lineWidth = lineWidth;
      g.strokeStyle = strokeStyle;
      g.strokeRect(x, y, w, h);
    }
    g.restore();

    markState[this.index] = {
      data : d,
      visible : true,
      top : y,
      left : x,
      bottom : g.canvas.height - y - h,
      right : g.canvas.width - x - w,
      width : w,
      height : h,
      fillStyle : fillStyle,
      strokeStyle : strokeStyle,
      lineWidth : lineWidth,
    };

    this.visualization.index++;
  }
};
