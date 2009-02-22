pv.Rule = function() {
  pv.Mark.call(this);
  this.defineProperties(pv.Rule.properties);
};

pv.Rule.prototype = pv.Mark.extend();

pv.Rule.properties = new pv.Mark.Properties();
pv.Rule.properties.define("left");
pv.Rule.properties.define("right");
pv.Rule.properties.define("top");
pv.Rule.properties.define("bottom");
pv.Rule.properties.define("lineWidth", 1);
pv.Rule.properties.define("strokeStyle", "black");

pv.Rule.toString = function() "rule";

pv.Rule.anchor = function(name) {
  var rule = this;
  var anchor = pv.Mark.prototype.add.call(this, pv.Mark.Anchor);

  anchor.name = (typeof name == "function") ? name : function() name;

  anchor.$left = function(d) {
      switch (this.name(d)) {
        case "bottom":
        case "top":
        case "left": return rule.left();
      }
      return undefined;
    };

  anchor.$right = function(d) {
      switch (this.name(d)) {
        case "right": return rule.right();
      }
      return undefined;
    };

  anchor.$top = function(d) {
      switch (this.name(d)) {
        case "left":
        case "right":
        case "top": return rule.top();
      }
      return undefined;
    };

  anchor.$bottom = function(d) {
      switch (this.name(d)) {
        case "bottom": return rule.bottom();
      }
      return undefined;
    };

  anchor.$textAlign = function(d) {
      switch (this.name(d)) {
        case "top":
        case "bottom": return "center";
        case "right": return "left";
        case "left": return "right";
      }
      return undefined;
    };

  anchor.$textBaseline = function(d) {
      switch (this.name(d)) {
        case "right":
        case "left": return "middle";
        case "top": return "bottom";
        case "bottom": return "top";
      }
      return undefined;
    };

  return anchor;
};

pv.Rule.render = function(g) {
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

    var l = this.$left ? this.$left(d) : null;
    var r = this.$right ? this.$right(d) : null;
    var t = this.$top ? this.$top(d) : null;
    var b = this.$bottom ? this.$bottom(d) : null;

    var horizontal
        = ((l != null) && (r != null) && (t == null) && (b != null))
       || ((l != null) && (r != null) && (t != null) && (b == null))
       || ((l == null) && (t == null) && (b != null))
       || ((l == null) && (t != null) && (b == null));

    if (l == null) {
      if (r == null) {
        l = r = 0;
      } else {
        l = g.canvas.width - r;
      }
    } else if (r == null) {
      r = g.canvas.width - l;
    }

    if (b == null) {
      if (t == null) {
        b = t = 0;
      } else {
        b = g.canvas.height - t;
      }
    } else if (t == null) {
      t = g.canvas.height - b;
    }

    var strokeStyle = this.$strokeStyle(d);
    var lineWidth = this.$lineWidth(d);

    if (strokeStyle) {
      g.save();
      g.lineWidth = lineWidth;
      g.strokeStyle = strokeStyle;
      g.beginPath();
      g.moveTo(l, t);
      if (horizontal) {
        g.lineTo((g.canvas.width - r), t);
      } else {
        g.lineTo(l, (g.canvas.height - b));
      }
      g.stroke();
      g.restore();
    }

    markState[this.index] = {
      data : d,
      top : t,
      left : l,
      bottom : b,
      right : r,
      strokeStyle : strokeStyle,
      lineWidth : lineWidth,
    };

    this.visualization.index++;
  }
};
