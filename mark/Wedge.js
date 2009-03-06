pv.Wedge = function() {
  pv.Mark.call(this);
  this.defineProperties(pv.Wedge.properties);
  this.midRadius = function() {
      return (this.innerRadius() + this.outerRadius()) / 2;
    };
  this.midAngle = function() {
      return (this.startAngle() + this.endAngle()) / 2;
    };
};

pv.Wedge.prototype = pv.Mark.extend();

pv.Wedge.properties = new pv.Mark.Properties();
pv.Wedge.properties.define("left");
pv.Wedge.properties.define("right");
pv.Wedge.properties.define("top");
pv.Wedge.properties.define("bottom");
pv.Wedge.properties.define("startAngle", function() {
    return this.index ? this.previous().endAngle() : -Math.PI / 2;
  });
pv.Wedge.properties.define("angle");
pv.Wedge.properties.define("endAngle");
pv.Wedge.properties.define("innerRadius", 0);
pv.Wedge.properties.define("outerRadius");
pv.Wedge.properties.define("lineWidth", 1);
pv.Wedge.properties.define("strokeStyle", null);
pv.Wedge.properties.define("fillStyle", pv.Colors.category20.unique);

pv.Wedge.toString = function() "wedge";

pv.Wedge.anchor = function(name) {
  var wedge = this;
  var anchor = pv.Mark.prototype.add.call(this, this.type);

  anchor.name = (name instanceof Function) ? name : function() name;

  anchor.$left = function(d) {
      function cos(a) wedge.midRadius() * Math.cos(a);
      switch (this.name(d)) {
        case "start": return wedge.left() + cos(wedge.startAngle());
        case "center": return wedge.left() + cos(wedge.midAngle());
        case "end": return wedge.left() + cos(wedge.endAngle());
      }
      return undefined;
    };

  anchor.$right = function(d) {
      function cos(a) wedge.midRadius() * Math.cos(a);
      switch (this.name(d)) {
        case "start": return wedge.right() + cos(wedge.startAngle());
        case "center": return wedge.right() + cos(wedge.midAngle());
        case "end": return wedge.right() + cos(wedge.endAngle());
      }
      return undefined;
    };

  anchor.$top = function(d) {
      function sin(a) wedge.midRadius() * Math.sin(a);
      switch (this.name(d)) {
        case "start": return wedge.top() + sin(wedge.startAngle());
        case "center": return wedge.top() + sin(wedge.midAngle());
        case "end": return wedge.top() + sin(wedge.endAngle());
      }
      return undefined;
    };

  anchor.$bottom = function(d) {
      function sin(a) wedge.midRadius() * Math.sin(a);
      switch (this.name(d)) {
        case "start": return wedge.bottom() + sin(wedge.startAngle());
        case "center": return wedge.bottom() + sin(wedge.midAngle());
        case "end": return wedge.bottom() + sin(wedge.endAngle());
      }
      return undefined;
    };

  anchor.$textAlign = function(d) {
      switch (this.name(d)) {
        case "start": return "right";
        case "center": return "center";
        case "end": return "left";
      }
      return undefined;
    };

  anchor.$textBaseline = function(d) {
      switch (this.name(d)) {
        case "start":
        case "end":
        case "center": return "middle";
      }
      return undefined;
    };

  return anchor;
};

pv.Wedge.render = function(g) {
  var markState = this.renderState.marks[this.markIndex] = [];

  function path(a0, a1, r0, r1) {
    g.beginPath();
    if (r0 == 0) {
      g.moveTo(0, 0);
      g.arc(0, 0, r1, a0, a1, false);
    } else if (r0 == r1) {
      g.arc(0, 0, r0, a0, a1, false);
    } else {
      g.arc(0, 0, r0, a0, a1, false);
      g.arc(0, 0, r1, a1, a0, true);
    }
    if (a0 != a1) {
      g.closePath();
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

    var a0 = this.$startAngle(d);
    var a1 = this.$endAngle(d);
    if (a1 == undefined) {
      a1 = a0 + this.$angle(d);
    }

    var r0 = this.$innerRadius(d);
    var r1 = this.$outerRadius(d);

    var fillStyle = this.$fillStyle(d);
    var strokeStyle = this.$strokeStyle(d);
    var lineWidth = this.$lineWidth(d);

    g.save();
    g.translate(x, y);
    path(a0, a1, r0, r1);
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
      startAngle : a0,
      endAngle : a1,
      angle : a1 - a0,
      innerRadius : r0,
      outerRadius : r1,
      fillStyle : fillStyle,
      strokeStyle : strokeStyle,
      lineWidth : lineWidth,
    };

    this.visualization.index++;
  }
};
