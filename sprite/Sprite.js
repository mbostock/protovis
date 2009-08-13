/**
 *
 */
pv.Sprite = function() {};

/**
 *
 */
pv.Sprite.prototype.updateAll = function(siblings) {
  for (var i = 0; i < siblings.length; i++) {
    siblings[i].update();
  }
};

/**
 * Updates the display for the specified mark instance <tt>s</tt> in the scene
 * graph. This implementation handles basic properties for all mark types, such
 * as visibility, cursor and title tooltip. Concrete mark types should override
 * this method to specify how marks are rendered.
 *
 * @param s a node in the scene graph; the instance of the mark to update.
 * @method pv.Sprite.prototype.update
 */

/**
 * @method pv.Sprite.prototype.create
 */

/**
 * @method pv.Sprite.prototype.dispose
 */

/**
 * Creates and inserts a new element of the specified type. The element is
 * inserted after the last element for this mark, if any.
 *
 * @method pv.Sprite.prototype.insert
 * @param {string} type the element type, such as "line".
 * @returns the new element.
 */

/**
 * Removes the specified sprite. If the specified sprite was not visible, this
 * method has no effect.
 */
pv.Sprite.prototype.dispose = function() {
  var svg = this.$dom;
  if (svg) {
    var root = svg.root.$title || svg.root;
    root.parentNode.removeChild(root);
    delete this.$dom;
  }
};

/**
 *
 */
pv.Sprite.prototype.listen = function(e) {
  // TODO clear event listeners
  for (var type in this.event) e["on" + type] = this.event[type];
};
