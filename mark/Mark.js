pv.Mark = function() {};

pv.Mark.toString = function() {
  return "mark";
};

pv.Mark.property = function(name) {
  return function(v) {
      if (arguments.length) {
        if (this.scene) {
          this.scene[this.index][name] = v;
        } else {
          this["$" + name] = (v instanceof Function) ? v : function() { return v; };
        }
        return this;
      }
      return this.scene[this.index][name];
    };
};

pv.Mark.prototype.defineProperty = function(name) {
  if (!this.hasOwnProperty("properties")) {
    this.properties = (this.properties || []).concat();
  }
  this.properties.push(name);
  this[name] = pv.Mark.property(name);
};

pv.Mark.prototype.type = pv.Mark;
pv.Mark.prototype.proto = null;
pv.Mark.prototype.parent = null;
pv.Mark.prototype.childIndex = -1;
pv.Mark.prototype.index = -1;
pv.Mark.prototype.scene = null;
pv.Mark.prototype.root = null;
pv.Mark.prototype.defineProperty("data");
pv.Mark.prototype.defineProperty("visible");
pv.Mark.prototype.defineProperty("left");
pv.Mark.prototype.defineProperty("right");
pv.Mark.prototype.defineProperty("top");
pv.Mark.prototype.defineProperty("bottom");
pv.Mark.prototype.defineProperty("cursor");
pv.Mark.prototype.defineProperty("title");

pv.Mark.defaults = new pv.Mark()
  .data([null])
  .visible(true);

pv.Mark.prototype.extend = function(proto) {
  this.proto = proto;
  return this;
};

pv.Mark.prototype.add = function(type) {
  return this.parent.add(type).extend(this);
};

pv.Mark.Anchor = function() {
  pv.Mark.call(this);
};

pv.Mark.Anchor.prototype = pv.extend(pv.Mark);
pv.Mark.Anchor.prototype.name = pv.Mark.property("name");

pv.Mark.prototype.anchor = function(name) {
  var anchorType = this.type;
  while (!anchorType.Anchor) {
    anchorType = anchorType.defaults.proto.type;
  }
  var anchor = new anchorType.Anchor().extend(this).name(name);
  anchor.parent = this.parent;
  anchor.type = this.type;
  return anchor;
};

pv.Mark.prototype.anchorTarget = function() {
  var target = this;
  while (!(target instanceof pv.Mark.Anchor)) {
    target = target.proto;
  }
  return target.proto;
};

pv.Mark.prototype.first = function() {
  return this.scene[0];
};

pv.Mark.prototype.last = function() {
  return this.scene[this.scene.length - 1];
};

pv.Mark.prototype.sibling = function() {
  return (this.index == 0) ? null : this.scene[this.index - 1];
};

pv.Mark.prototype.cousin = function(panel, i) {
  var s = panel
      ? panel.scene[this.parent.index]
      : (this.parent && this.parent.sibling());
  return (s && s.children)
      ? s.children[this.childIndex][(i == undefined) ? this.index : i]
      : null;
};

/**
 * Renders this mark; includes all children marks if this is a panel. This
 * method consists of two phases: BUILD and UPDATE.
 */
pv.Mark.prototype.render = function() {
  this.build();
  this.update();
};

/**
 * Evaluates properties and computes implied properties.
 */
pv.Mark.prototype.build = function(parent) {
  if (!this.scene) {
    this.scene = [];
    if (!this.parent) {
      this.scene.data = [];
    }
  }

  var data = this.get("data");
  var stack = this.root.scene.data;
  stack.unshift(null);
  this.index = -1;
  for (var i = 0, d; i < data.length; i++) {
    pv.Mark.prototype.index = ++this.index;
    var s = {};

    /*
     * This is a bit confusing and could be cleaned up. This "scene" stores the
     * previous scene graph; we want to reuse SVG elements that were created
     * previously rather than recreating them, so we extract them. We also want
     * to reuse SVG child elements as well.
     */
    if (this.scene[this.index]) {
      s.svg = this.scene[this.index].svg;
      s.children = this.scene[this.index].children;
    }
    this.scene[this.index] = s;

    s.index = i;
    s.data = stack[0] = data[i];
    s.parent = parent;
    s.visible = this.get("visible");
    if (s.visible) {
      this.buildInstance(s);
    }
  }
  stack.shift();
  delete this.index;
  pv.Mark.prototype.index = -1;

  /* Clear any old instances from the scene. */
  for (var i = data.length; i < this.scene.length; i++) {
    this.clearInstance(this.scene[i]);
  }
  this.scene.length = data.length;

  return this;
};

pv.Mark.prototype.clearInstance = function(s) {
  if (s.svg) {
    s.parent.svg.removeChild(s.svg);
  }
};

pv.Mark.prototype.buildInstance = function(s) {
  var p = this.type.prototype;
  for (var i = 0; i < p.properties.length; i++) {
    var name = p.properties[i];
    if (!(name in s)) {
      s[name] = this.get(name);
    }
  }
  this.buildImplied(s);
};

pv.Mark.prototype.buildImplied = function(s) {
  var p = this.type.prototype;

  var l = s.left;
  var r = s.right;
  var t = s.top;
  var b = s.bottom;
  var w = p.width ? s.width : 0;
  var h = p.height ? s.height : 0;

  var width = s.parent ? s.parent.width : 0;
  if (w == null) {
    w = width - (r = r || 0) - (l = l || 0);
  } else if (r == null) {
    r = width - w - (l = l || 0);
  } else if (l == null) {
    l = width - w - (r = r || 0);
  }

  var height = s.parent ? s.parent.height : 0;
  if (h == null) {
    h = height - (t = t || 0) - (b = b || 0);
  } else if (b == null) {
    b = height - h - (t = t || 0);
  } else if (t == null) {
    t = height - h - (b = b || 0);
  }

  s.left = l;
  s.right = r;
  s.top = t;
  s.bottom = b;
  if (p.width) s.width = w;
  if (p.height) s.height = h;
};

pv.Mark.prototype.get = function(name) {
  var mark = this;
  while (!mark["$" + name]) {
    mark = mark.proto;
    if (!mark) {
      mark = this.type.defaults;
      while (!mark["$" + name]) {
        mark = mark.proto;
        if (!mark) {
          return null;
        }
      }
      break;
    }
  }

  // Note that the property function is applied to the 'this' instance (the
  // leaf-level mark), rather than whatever mark defined the property function.
  // This can be confusing because a property function can be called on an
  // object of a different "class", but is useful for logic reuse.
  return mark["$" + name].apply(this, this.root.scene.data);
};

/**
 * Previously-computed property values are used to update the display. In cases
 * where the scene graph has been manipulated externally, this method can be
 * invoked separately to update the display (e.g., changing the color of a mark
 * on mouse-over).
 */
pv.Mark.prototype.update = function() {
  for (var i = 0; i < this.scene.length; i++) {
    this.updateInstance(this.scene[i]);
  }
};

pv.Mark.prototype.updateInstance = function(s) {
  var that = this, v = s.svg;

  if (!s.visible) {
    if (v) v.setAttribute("display", "none");
    return;
  }
  v.removeAttribute("display");

  /* TODO set title via mouseover + mouseout. */
  if (s.cursor) v.style.cursor = s.cursor;

  function dispatch(type) {
    return function(e) {
        /* TODO set full scene stack. */
        var data = [s.data], p = s;
        while (p = p.parent) {
          data.push(p.data);
        }
        that.index = s.index;
        that.scene = s.parent.children[that.childIndex];
        that.events[type].apply(that, data);
        that.updateInstance(s); // XXX updateInstance, bah!
        delete that.index;
        delete that.scene;
        e.preventDefault();
      };
  };

  /* TODO inherit event handlers. */
  for (var type in this.events) {
    v["on" + type] = dispatch(type);
  }
};

pv.Mark.prototype.event = function(type, handler) {
  if (!this.events) this.events = {};
  this.events[type] = handler;
  return this;
};
