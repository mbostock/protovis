pv.Panel = function() {
  pv.Mark.call(this);
  this.children = [];
  this.root = this;
};

pv.Panel.toString = function() {
  return "panel";
};

pv.Panel.prototype = pv.Mark.extend();
pv.Panel.prototype.type = pv.Panel;
pv.Panel.prototype.defineProperty("width");
pv.Panel.prototype.defineProperty("height");
pv.Panel.prototype.defineProperty("canvas");

pv.Panel.defaults = new pv.Panel().extend(pv.Mark.defaults)
    .top(0).left(0).bottom(0).right(0);

pv.Panel.prototype.add = function(type) {
  var child = new type();
  child.parent = this;
  child.root = this.root;
  child.childIndex = this.children.length;
  this.children.push(child);
  return child;
};

pv.Panel.prototype.clear = function(g) {
  for (var i = 0; i < this.scene.length; i++) {
    var c = this.scene[i].canvas;
    if (!c.$clear) {
      c.$clear = true;
      c.getContext("2d").clearRect(0, 0, c.width, c.height);
    }
  }
  for (var i = 0; i < this.scene.length; i++) {
    delete this.scene[i].canvas.$clear;
  }
};

pv.Panel.prototype.createCanvas = function(w, h) {
  function lastChild(node) {
    while (node.lastChild && node.lastChild.tagName) {
      node = node.lastChild;
    }
    return (node == document.body) ? node : node.parentNode;
  }
  var c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  pv.$dom // script element for text/javascript+protovis
      ? pv.$dom.parentNode.insertBefore(c, pv.$dom)
      : lastChild(document.body).appendChild(c);
  return c;
};

pv.Panel.prototype.buildInstance = function(s, d) {
  s = pv.Mark.prototype.buildInstance.call(this, s, d);
  this.scene[this.index] = s;
  s.children = [];
  for (var i = 0; i < this.children.length; i++) {
    s.children.push(this.children[i].build(s).scene);
  }
  for (var i = 0; i < this.children.length; i++) {
    delete this.children[i].scene;
  }
  return s;
};

pv.Panel.prototype.buildImplied = function(s) {
  var c = s.canvas;
  if (c) {
    if (typeof c == "string") {
      s.canvas = c = document.getElementById(c);
    }
    s.width = c.width - s.left - s.right;
    s.height = c.height - s.top - s.bottom;
  } else if (s.parent.canvas) {
    s.canvas = s.parent.canvas;
  } else {
    s.canvas = this.createCanvas(
        s.width + s.left + s.right,
        s.height + s.top + s.bottom);
  }
  pv.Mark.prototype.buildImplied.call(this, s);
};

pv.Panel.prototype.render = function(g) {
  if (!this.parent) {
    this.build();
    this.clear();
  }

  for (var i = 0; i < this.scene.length; i++) {
    var s = this.scene[i], sg = g || s.canvas.getContext("2d");
    sg.save();
    sg.translate(s.left, s.top);
    for (var j = 0; j < this.children.length; j++) {
      var c = this.children[j];
      c.scene = s.children[j];
      c.render(sg);
      delete c.scene;
    }
    sg.restore();
  }

  delete this.scene;
};
