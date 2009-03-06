pv.Container = function() {
  pv.Mark.call(this);
  this.marks = [];
  this.root = this;
};

pv.Container.toString = function() "container";

pv.Container.prototype = pv.Mark.extend();
pv.Container.prototype.type = pv.Container;
pv.Container.prototype.renderIndex = -1;
pv.Container.prototype.renderData = null;
pv.Container.prototype.defineProperty("width");
pv.Container.prototype.defineProperty("height");

pv.Container.defaults = pv.Mark.defaults.extend(pv.Container)
    .left(0)
    .right(0)
    .top(0)
    .bottom(0);

pv.Container.prototype.add = function(type) {
  var mark = new (type || this.type)();
  mark.container = this;
  mark.root = this.root;
  mark.markIndex = this.marks.length;
  this.marks.push(mark);
  return mark;
};

pv.Container.prototype.render = function(g) {
  if (!this.container) {
    g.clearRect(0, 0, g.canvas.width, g.canvas.height);
    this.renderData = [];
  }
  pv.Mark.prototype.render.apply(this, arguments);
  if (!this.container) {
    this.dispose();
    delete this.renderData;
  }
};

pv.Container.prototype.renderInstance = function(g, d) {
  var l = this.get("left");
  var r = this.get("right");
  var t = this.get("top");
  var b = this.get("bottom");
  var w = this.get("width");
  var h = this.get("height");

  var width = g.canvas.width - this.offset("right") - this.offset("left");
  if (l == null) {
    l = width - w - r;
  } else if (r == null) {
    r = width - w - l;
  } else if (w == null) {
    w = width - r - l;
  }

  var height = g.canvas.height - this.offset("bottom") - this.offset("top");
  if (t == null) {
    t = height - h - b;
  } else if (b == null) {
    b = height - h - t;
  } else if (h == null) {
    h = height - t - b;
  }

  var x = l + this.offset("left");
  var y = t + this.offset("top");

  this.renderState[this.index] = {
      data : d,
      visible : true,
      top : t,
      left : l,
      bottom : b,
      right : r,
      width : w,
      height : h,
    };

  for each (let m in this.marks) {
    m.render(g);
  }
};

pv.Container.prototype.dispose = function() {
  pv.Mark.prototype.dispose.call(this);
  for each (var mark in this.marks) {
    mark.dispose();
  }
};
