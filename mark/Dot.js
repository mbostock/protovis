pv.Dot = function() {
  pv.Mark.call(this);
  this.defineProperties(pv.Dot.properties);
  this.radius = function() {
      return Math.sqrt(this.size());
    };
};

pv.Dot.prototype = pv.Mark.extend();

pv.Dot.properties = new pv.Mark.Properties();
pv.Dot.properties.define("left");
pv.Dot.properties.define("right");
pv.Dot.properties.define("top");
pv.Dot.properties.define("bottom");
pv.Dot.properties.define("size", 20);
pv.Dot.properties.define("shape", "circle");
pv.Dot.properties.define("lineWidth", 1.5);
pv.Dot.properties.define("strokeStyle", pv.Colors.category10());
pv.Dot.properties.define("fillStyle", null);

pv.Dot.toString = function() "dot";

pv.Dot.anchor = function(name) {
  var dot = this;
  var anchor = pv.Mark.prototype.add.call(this, this.type);

  anchor.name = (name instanceof Function) ? name : function() name;

  anchor.$left = function(d) {
      switch (this.name(d)) {
        case "bottom":
        case "top":
        case "center": return dot.left();
        case "left": return dot.left() - dot.radius();
      }
      return undefined;
    };

  anchor.$right = function(d) {
      switch (this.name(d)) {
        case "bottom":
        case "top":
        case "center": return dot.right();
        case "right": return dot.right() - dot.radius();
      }
      return undefined;
    };

  anchor.$top = function(d) {
      switch (this.name(d)) {
        case "left":
        case "right":
        case "center": return dot.top();
        case "top": return dot.top() - dot.radius();
      }
      return undefined;
    };

  anchor.$bottom = function(d) {
      switch (this.name(d)) {
        case "left":
        case "right":
        case "center": return dot.bottom();
        case "bottom": return dot.bottom() - dot.radius();
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

pv.Dot.render = function(g) {
  var markState = this.renderState.marks[this.markIndex] = [];

  function path(shape, size) {
    g.beginPath();
    var radius = Math.sqrt(size);
    switch (shape) {
      case "cross": {
        g.moveTo(-radius, -radius);
        g.lineTo(radius, radius);
        g.moveTo(radius, -radius);
        g.lineTo(-radius, radius);
        break;
      }
      case "triangle": {
        var h = radius;
        var w = radius * 2 / Math.sqrt(3);
        g.moveTo(0, h);
        g.lineTo(w, -h);
        g.lineTo(-w, -h);
        g.closePath();
        break;
      }
      case "diamond": {
        radius *= Math.sqrt(2);
        g.moveTo(0, -radius);
        g.lineTo(radius, 0);
        g.lineTo(0, radius);
        g.lineTo(-radius, 0);
        g.closePath();
        break;
      }
      case "square": {
        g.moveTo(-radius, -radius);
        g.lineTo(radius, -radius);
        g.lineTo(radius, radius);
        g.lineTo(-radius, radius);
        g.closePath();
        break;
      }
      default: {
        g.arc(0, 0, radius, 0, 2.0 * Math.PI, false);
        break;
      }
    }
  }

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
      x = g.canvas.width - this.$right(d);
    }

    var y = this.$top(d);
    if (y == undefined) {
      y = g.canvas.height - this.$bottom(d);
    }

    var fillStyle = this.$fillStyle(d);
    var strokeStyle = this.$strokeStyle(d);
    var lineWidth = this.$lineWidth(d);
    var shape = this.$shape(d);
    var size = this.$size(d);

    g.save();
    g.translate(x, y);
    path(shape, size);
    if (fillStyle) {
      g.fillStyle = fillStyle;
      g.fill();
    }
    if (strokeStyle) {
      g.lineWidth = lineWidth;
      g.strokeStyle = strokeStyle;
      g.stroke();
    }
    g.restore();

    markState[this.index] = {
      data : d,
      top : y,
      left : x,
      bottom : g.canvas.height - y,
      right : g.canvas.width - x,
      size : size,
      shape : shape,
      fillStyle : fillStyle,
      strokeStyle : strokeStyle,
      lineWidth : lineWidth,
    };

    this.visualization.index++;
  }
};
