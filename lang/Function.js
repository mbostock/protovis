Function.prototype.extend = function() {
  function f() {}
  f.prototype = this.prototype;
  return new f();
};
