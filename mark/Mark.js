pv.Mark = function() {
  this.defineProperties(pv.Mark.properties);
};

pv.Mark.prototype.add = function(type) {
  if (arguments.length && !type) {
    throw "undefined mark type";
  }
  function f() {}
  f.prototype = this;
  var o = new f();
  o.type = type || this.type;
  o.type.call(o);
  return o;
};

pv.Mark.toString = function() "mark";

pv.Mark.prototype.$data = function() pv.singleton();

pv.Mark.prototype.render = function(g) {};

pv.Mark.prototype.anchor = function(name) {
  return this.type.anchor.call(this, name);
};

pv.Mark.Properties = function() {
  this.map = {};
  this.defaults = {};
};

pv.Mark.Properties.prototype.define = function(name, defaultValue) {
  this.map[name] = function(v) {
      if (arguments.length) {
        this["$" + name] = ((v instanceof Function) ? v : function() v);
        return this;
      }
      if (!this.renderState) {
        return this["$" + name]();
      }
      var v = this.renderState.marks[this.markIndex][this.index][name];
      return (v == undefined) ? this["$" + name]() : v;
    };
  this.defaults[name] = (defaultValue instanceof Function)
      ? defaultValue : function() defaultValue;
};

pv.Mark.prototype.defineProperties = function(properties) {
  for (let name in properties.map) {
    this[name] = properties.map[name];
  }
  for (let name in properties.defaults) {
    if (!this["$" + name]) { // don't override inherited values
      this["$" + name] = properties.defaults[name];
    }
  }
};

pv.Mark.prototype.previous = function() {
  if (this.index == 0) {
    return null;
  }
  function f() {}
  f.prototype = this;
  var o = new f();
  o.index = this.index - 1;
  return o;
};

pv.Mark.properties = new pv.Mark.Properties();
pv.Mark.properties.define("data");
pv.Mark.properties.define("visible", true);
