pv.Panel = function() {
  pv.Bar.call(this);
  this.children = [];
  this.root = this;
  this.$dom = pv.Panel.$dom;
};

pv.Panel.toString = function() {
  return "panel";
};

pv.Panel.prototype = pv.Bar.extend();
pv.Panel.prototype.type = pv.Panel;
pv.Panel.prototype.defineProperty("canvas");

pv.Panel.defaults = new pv.Panel().extend(pv.Bar.defaults)
    .top(0).left(0).bottom(0).right(0)
    .fillStyle(null);

pv.Panel.prototype.add = function(type) {
  var child = new type();
  child.parent = this;
  child.root = this.root;
  child.childIndex = this.children.length;
  this.children.push(child);
  return child;
};

pv.Panel.prototype.clear = function() {
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

  /* Cache the canvas element to reuse across renders. */
  if (!this.$canvases) this.$canvases = [];
  var c = this.$canvases[this.index];
  if (!c) {
    this.$canvases[this.index] = c = document.createElement("canvas");
    this.$dom // script element for text/javascript+protovis
        ? this.$dom.parentNode.insertBefore(c, this.$dom)
        : lastChild(document.body).appendChild(c);
  }

  c.width = w;
  c.height = h;
  return c;
};

pv.Panel.prototype.buildInstance = function(s, d) {
  s = pv.Bar.prototype.buildInstance.call(this, s, d);
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
  pv.Bar.prototype.buildImplied.call(this, s);
};

pv.Panel.prototype.render = function(g) {
  if (!this.parent) {
    delete this.scene;
    this.build();
    this.listen();
  }
  this.update(g);
};

pv.Panel.prototype.update = function(g) {
  if (!this.parent) {
    this.clear();
  }
  for (var i = 0; i < this.scene.length; i++) {
    var s = this.scene[i], sg = g || s.canvas.getContext("2d");
    this.renderInstance(sg, s);
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
};

pv.Panel.prototype.listen = function() {
  if (!this.$interactive) return; // TODO selective listening
  var that = this;
  function dispatch(e) {
    if (that.dispatch(e)) {
      e.preventDefault();
    }
  }
  for (var i = 0; i < this.scene.length; i++) {
    var c = this.scene[i].canvas;
    if (!c.$listen) {
      c.$listen = true;
      c.addEventListener("click", dispatch, false);
      c.addEventListener("mousemove", dispatch, false);
      c.addEventListener("mouseout", dispatch, false);
      c.addEventListener("mousedown", dispatch, false);
    }
  }
  if (!self.$listen) {
    self.$listen = true;
    self.addEventListener("mouseup", dispatch, false);
  }
};

pv.Panel.prototype.dispatch = function(e) {
  var handled = false;

  /* Recursively compute offset for DOM element. */
  function offset(e) {
    var o = {
        left: pv.css(e, "padding-left") + pv.css(e, "border-left-width"),
        top: pv.css(e, "padding-top") + pv.css(e, "border-top-width"),
      };
    while (e.offsetParent) {
      o.left += e.offsetLeft;
      o.top += e.offsetTop;
      e = e.offsetParent;
    }
    return o;
  }

  /* Recursively visit child panels. TODO prune tree */
  function visit(x, y, s) {
    if (this.contains(x, y, s)) {
      if (!s.$mouseover) {
        if ((e.type == "mousemove") && this.onmouseover) {
          s.$mouseover = true;
          this.onmouseover(s.data);
          handled = true;
        }
      }
      if ((e.type != "mouseup") && this["on" + e.type]) {
        if (e.type == "mousedown") {
          s.$mousedown = true;
        }
        this["on" + e.type](s.data);
        handled = true;
      }
    } else if (s.$mouseover) {
      if ((e.type == "mousemove") || (e.type == "mouseout")) {
        this.onmouseout(s.data);
        handled = true;
        delete s.$mouseover;
      }
    }
    if (s.$mousedown) {
      if (e.type == "mouseup") {
        this.onmouseup(s.data);
        handled = true;
        delete s.$mousedown;
      }
    }

    if (s.children) {
      x -= s.left;
      y -= s.top;
      for (var i = 0; i < s.children.length; i++) {
        var c = this.children[i], cs = s.children[i];
        c.scene = cs;
        for (var j = 0; j < cs.length; j++) {
          c.index = j;
          visit.call(c, x, y, cs[j]);
          delete c.index;
        }
        delete c.scene;
      }
    }
  }

  /* Only root panels can have custom canvases. */
  var ex = e.pageX, ey = e.pageY;
  for (var i = 0; i < this.scene.length; i++) {
    var s = this.scene[i], c = s.canvas, o = c.$offset;
    if (!o) c.$offset = o = offset(c);
    this.index = i;
    visit.call(this, ex - o.left, ey - o.top, s);
    delete this.index;
  }

  for (var i = 0; i < this.scene.length; i++) {
    delete this.scene[i].canvas.$offset;
  }

  this.update();
  return handled;
};
