pv.Area = function() {
  pv.Mark.call(this);
  this.defineProperties(pv.Area.properties);
};

pv.Area.prototype = pv.Mark.extend();

pv.Area.properties = new pv.Mark.Properties();
pv.Area.properties.define("left");
pv.Area.properties.define("right");
pv.Area.properties.define("top");
pv.Area.properties.define("bottom");
pv.Area.properties.define("width");
pv.Area.properties.define("height");
pv.Area.properties.define("lineWidth", 1.5);
pv.Area.properties.define("strokeStyle", null);
pv.Area.properties.define("fillStyle", pv.Colors.category20());

pv.Area.toString = function() "area";

pv.Area.anchor = function(name) {
  var area = this;
  var anchor = pv.Mark.prototype.add.call(this, this.type);

  anchor.name = (name instanceof Function) ? name : function() name;

  anchor.$left = function(d) {
      switch (this.name(d)) {
        case "bottom":
        case "top":
        case "center": return area.left() + area.width() / 2;
        case "right": return area.left() + area.width();
      }
      return undefined;
    };

  anchor.$right = function(d) {
      switch (this.name(d)) {
        case "bottom":
        case "top":
        case "center": return area.right() + area.width() / 2;
        case "left": return area.right() + area.width();
      }
      return undefined;
    };

  anchor.$top = function(d) {
      switch (this.name(d)) {
        case "left":
        case "right":
        case "center": return area.top() + area.height() / 2;
        case "bottom": return area.top() + area.height();
      }
      return undefined;
    };

  anchor.$bottom = function(d) {
      switch (this.name(d)) {
        case "left":
        case "right":
        case "center": return area.bottom() + area.height() / 2;
        case "top": return area.bottom() + area.height();
      }
      return undefined;
    };

  anchor.$textAlign = function(d) {
      switch (this.name(d)) {
        case "left": return "right";
        case "bottom":
        case "top":
        case "center": return "center";
        case "right": return "left";
      }
      return undefined;
    };

  anchor.$textBaseline = function(d) {
      switch (this.name(d)) {
        case "right":
        case "left":
        case "center": return "middle";
        case "top": return "bottom";
        case "bottom": return "top";
      }
      return undefined;
    };

  return anchor;
};

pv.Area.render = function(g) {
  var markState = this.renderState.marks[this.markIndex] = [];

  g.save();
  var move = true;
  var back = [];
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

    var l = this.$left(d);
    var r = this.$right(d);
    var t = this.$top(d);
    var b = this.$bottom(d);
    var w = this.$width(d);
    var h = this.$height(d);

    var x0 = (l == undefined) ? (g.canvas.width - r)
        : l;
    var y1 = (t == undefined) ? (g.canvas.height - b)
        : t;
    var x1 = (w == undefined) ? x0
        : ((l == undefined) ? (x0 - w) : (x0 + w));
    var y0 = (h == undefined) ? y1
        : ((t == undefined) ? (y1 - h) : (y1 + h))

    back.push({ x: x1, y: y1 });

    if (move) {
      move = false;
      g.beginPath();
      g.moveTo(x0, y0);
    } else {
      g.lineTo(x0, y0);
    }

    markState[this.index] = {
      data : d,
      top : y0,
      left : x0,
      bottom : g.canvas.height - y1,
      right : g.canvas.width - x1,
      width : x1 - x0,
      height : y1 - y0,
    };

    this.visualization.index++;
  }

  back.reverse();
  for each (let v in back) {
    g.lineTo(v.x, v.y);
  }
  g.closePath();

  var fillStyle = this.$fillStyle();
  if (fillStyle) {
    g.fillStyle = fillStyle;
    g.fill();
  }
  var strokeStyle = this.$strokeStyle();
  if (strokeStyle) {
    g.lineWidth = this.$lineWidth();
    g.strokeStyle = strokeStyle;
    g.stroke();
  }

  g.restore();
};
