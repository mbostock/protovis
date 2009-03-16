pv.Mark = function() {};

pv.Mark.toString = function() "mark";

pv.Mark.property = function(name) {
  return function(v) {
      if (arguments.length) {
        this["$" + name] = pv.function(v);
        return this;
      }
      return this.renderState[this.index][name];
    };
};

pv.Mark.prototype.defineProperty = function(name) {
  this[name] = pv.Mark.property(name);
};

pv.Mark.prototype.type = pv.Mark;
pv.Mark.prototype.proto = null;
pv.Mark.prototype.panel = null;
pv.Mark.prototype.markIndex = -1;
pv.Mark.prototype.index = -1;
pv.Mark.prototype.renderState = null;
pv.Mark.prototype.root = null;
pv.Mark.prototype.defineProperty("data");
pv.Mark.prototype.defineProperty("visible");
pv.Mark.prototype.defineProperty("left");
pv.Mark.prototype.defineProperty("right");
pv.Mark.prototype.defineProperty("top");
pv.Mark.prototype.defineProperty("bottom");

pv.Mark.defaults = new pv.Mark()
  .data(function() pv.singleton(null))
  .visible(true);

pv.Mark.prototype.offset = function(name) {
  var c = this.panel;
  return c ? c.offset(name) + c.renderState[c.index][name] : 0;
};

pv.Mark.prototype.extend = function(type) {
  var mark = new type();
  mark.proto = this;
  return mark;
};

pv.Mark.prototype.add = function(type) {
  var mark = this.panel.add(type);
  mark.proto = this;
  return mark;
};

pv.Mark.Anchor = function() {
  pv.Mark.call(this);
};

pv.Mark.Anchor.prototype = pv.Mark.extend();
pv.Mark.Anchor.prototype.name = pv.Mark.property("name");

pv.Mark.prototype.anchor = function(name) {
  var anchorType = this.type;
  while (!anchorType.Anchor) {
    anchorType = anchorType.defaults.type;
  }
  var anchor = this.extend(anchorType.Anchor).name(name);
  anchor.panel = this.panel;
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

pv.Mark.prototype.previous = function() {
  return (this.index == 0) ? null : this.renderState[this.index - 1];
};

pv.Mark.prototype.render = function(g) {
  this.renderState = [];
  var data = this.get("data");
  this.root.renderData.unshift(null);
  this.index = -1;
  for each (let d in data) {
    pv.Mark.prototype.index = ++this.index;
    this.root.renderData[0] = d;
    if (this.get("visible")) {
      this.renderInstance(g, d);
    } else {
      this.renderState[this.index] = { data : d, visible : false };
    }
  }
  this.root.renderData.shift();
  delete this.index;
  pv.Mark.prototype.index = -1;
};

pv.Mark.prototype.dispose = function() {
  delete this.renderState;
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
  return mark["$" + name].apply(this, this.root.renderData);
};
