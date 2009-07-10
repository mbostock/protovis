/**
 * Represents a data-driven graphical mark. The {@code Mark} class is the
 * abstract base class for all graphical marks in Protovis; it does not provide
 * any specific rendering functionality, but together with {@link Panel}
 * establishes the core framework.
 *
 * <p>Concrete mark types include familiar visual elements such as bars, lines
 * and labels. Although a bar mark may be used to construct a bar chart, marks
 * know nothing about charts; it is only through their specification and
 * composition that charts are produced. These building blocks permit many
 * combinatorial possibilities.
 *
 * <p>Marks are associated with <b>data</b>: a mark is generated once per
 * associated datum, mapping the datum to visual <b>properties</b> such as
 * position and color. Thus, a single mark specification represents a set of
 * visual elements that share the same data and visual encoding. The type of
 * mark defines the names of properties and their meaning. A property may be
 * static, ignoring the associated datum and returning a constant; or, it may be
 * dynamic, derived from the associated datum or index. Such dynamic encodings
 * can be specified succinctly using anonymous functions. Special properties
 * called event handlers can be registered to add interactivity.
 *
 * <p>Protovis uses <b>inheritance</b> to simplify the specification of related
 * marks: a new mark can be derived from an existing mark, inheriting its
 * properties. The new mark can then override properties to specify new
 * behavior, potentially in terms of the old behavior. In this way, the old mark
 * serves as the <b>prototype</b> for the new mark. Most mark types share the
 * same basic properties for consistency and to facilitate inheritance.
 */
pv.Mark = function() {};

/**
 * Returns the mark type name. Names should be lower case, with words separated
 * by hyphens. For example, the mark class {@code FooBar} should return
 * "foo-bar".
 *
 * <p>Note that this method is defined on the constructor, not on the prototype,
 * and thus is a static method. The constructor is accessible through the {@link
 * #type} field.
 */
pv.Mark.toString = function() {
  return "mark";
};

/**
 * Defines and registers a property method for the property with the given name.
 * This method should be called on a mark class prototype to define each exposed
 * property. (Note this refers to the JavaScript {@code prototype}, not the
 * Protovis mark prototype, which is the {@link #proto} field.)
 *
 * <p>The created property method supports several modes of invocation: <ol>
 *
 * <li>If invoked with a {@code Function} argument, this function is evaluated
 * for each associated datum. The return value of the function is used as the
 * computed property value. The context of the function ({@code this}) is this
 * mark. The arguments to the function are the associated data of this mark and
 * any enclosing panels. For example, to use a linear encoding of numerical data
 * to height, saying
 *
 * <pre>m.height(function(d) d * 100);</pre>
 *
 * will use the specified function to evaluate the height property for each mark
 * instance. This function is stored in the {@code $height} field. The return
 * value of the property method (e.g., {@code m.height}) is this mark ({@code
 * m})).
 *
 * <li>If invoked with a non-function argument, the property is treated as a
 * constant, and wrapped with a simple accessor function. This wrapper function
 * is stored in the equivalent internal ({@code $}-prefixed) field. The return
 * value of the property method (e.g., {@code m.height}) is this mark.
 *
 * <li>If invoked from an event handler, the specified value is set on the
 * current instance (i.e., the instance that triggered the event, such as a
 * mouse click). In this case, the value should be a constant and not a
 * function. For example, saying
 *
 * <p>this.fillStyle("red");</pre>
 *
 * from a "click" event handler will set the fill color to red for any marks
 * that are clicked.
 *
 * <li>If invoked with no arguments, the computed property value for the current
 * mark instance in the scene graph is returned. This facilitates <i>property
 * chaining</i>, where one mark's properties are defined in terms of another's.
 * For example, to offset a mark's location from its prototype, you might say
 *
 * <pre>m.top(function() this.proto.top() + 10);</pre>
 *
 * Note that this style of invocation is a bit magical and potentially
 * confusing; the index of the mark being evaluated (in the above example,
 * {@code this.proto}) is inherited from the {@code Mark} class and set by this
 * mark. So, if the fifth element's top property is being evaluated, the fifth
 * instance of {@code this.proto} will similarly be queried for the value of its
 * top property. If the mark being evaluated has a different number of
 * instances, or its data is unrelated, the behavior of this method is
 * undefined. In these cases it may be better to index the {@code scene}
 * explicitly to specify the exact instance.
 *
 * </ol><p>Property names should follow standard JavaScript method naming
 * conventions, using lowerCamel-style capitalization.
 *
 * <p>In addition to creating the property method, every property is registered
 * in the {@link #properties} array on the {@code prototype}. Although this
 * array is an instance field, it is considered immutable and shared by all
 * instances of a given mark type. The {@code properties} array can be queried
 * to see if a mark type defines a particular property, such as width or height.
 *
 * @param name the property name.
 */
pv.Mark.prototype.defineProperty = function(name) {
  if (!this.hasOwnProperty("properties")) {
    this.properties = (this.properties || []).concat();
  }
  this.properties.push(name);
  this[name] = function(v) {
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

/**
 * The constructor; the mark type. This mark type may define default property
 * functions (see {@link #defaults}) that are used if the property is not
 * overriden by the mark or any of its prototypes.
 */
pv.Mark.prototype.type = pv.Mark;

/**
 * The mark prototype, possibly null, from which to inherit property
 * functions. The mark prototype is not necessarily of the same type as this
 * mark. Any properties defined on this mark will override properties inherited
 * either from the prototype or from the type-specific defaults.
 */
pv.Mark.prototype.proto = null;

/**
 * The enclosing parent panel. The parent panel is generally null only for the
 * root panel; however, it is possible to create "offscreen" marks that are used
 * only for inheritance purposes.
 */
pv.Mark.prototype.parent = null;

/**
 * The child index. -1 if the enclosing parent panel is null; otherwise, the
 * zero-based index of this mark into the parent panel's {@code children} array.
 */
pv.Mark.prototype.childIndex = -1;

/**
 * The mark index. The value of this field depends on which instance (i.e.,
 * which element of the data array) is currently being evaluated. During the
 * build phase, the index is incremented over each datum; when handling events,
 * the index is set to the instance that triggered the event.
 */
pv.Mark.prototype.index = -1;

/**
 * The scene graph. The scene graph is an array of objects; each object (or
 * "node") corresponds to an instance of this mark and an element in the data
 * array. The scene graph can be traversed to lookup previously-evaluated
 * properties.
 *
 * <p>For instance, consider a stacked area chart. The bottom property of the
 * area can be defined using the <i>cousin</i> instance, which is the
 * corresponding area instance in the previous instantiation of the parent
 * panel. In this sample code,
 *
 * <pre>new pv.Panel()
 *     .width(150).height(150)
 *   .add(pv.Panel)
 *     .data([[1, 1.2, 1.7, 1.5, 1.7],
 *            [.5, 1, .8, 1.1, 1.3],
 *            [.2, .5, .8, .9, 1]])
 *   .add(pv.Area)
 *     .data(function(d) d)
 *     .bottom(function() {
 *         var c = this.cousin();
 *         return c ? (c.bottom + c.height) : 0;
 *       })
 *     .height(function(d) d * 40)
 *     .left(function() this.index * 35)
 *   .root.render();</pre>
 *
 * the bottom property is computed based on the upper edge of the corresponding
 * datum in the previous series. The area's parent panel is instantiated once
 * per series, so the cousin refers to the previous (below) area mark. (Note
 * that the position of the upper edge is not the same as the top property,
 * which refers to the top margin: the distance from the top edge of the panel
 * to the top edge of the mark.)
 *
 * @see #first
 * @see #last
 * @see #sibling
 * @see #cousin
 */
pv.Mark.prototype.scene = null;

/**
 * The root parent panel. This may be null for "offscreen" marks that are
 * created for inheritance purposes only.
 */
pv.Mark.prototype.root = null;

/**
 * The data property; an array of objects. The size of the array determines the
 * number of marks that will be instantiated; each element in the array will be
 * passed to property functions to compute the property values. Typically, the
 * data property is specified as a constant array, such as
 *
 * <pre>m.data([1, 2, 3, 4, 5]);</pre>
 *
 * However, it is perfectly acceptable to define the data property as a
 * function. This function might compute the data dynamically, allowing
 * different data to be used per enclosing panel. For instance, in the stacked
 * area graph example (see {@link #scene}), the data function on the area mark
 * dereferences each series.
 */
pv.Mark.prototype.defineProperty("data");

/**
 * The visible property; a boolean determining whether or not the mark instance
 * is visible. If a mark instance is not visible, its other properties will not
 * be evaluated. Similarly, for panels no child marks will be rendered.
 */
pv.Mark.prototype.defineProperty("visible");

/**
 * The left margin; the distance, in pixels, between the left edge of the
 * enclosing panel and the left edge of this mark. Note that in some cases this
 * property may be redundant with the right property, or with the conjunction of
 * right and width.
 */
pv.Mark.prototype.defineProperty("left");

/**
 * The right margin; the distance, in pixels, between the right edge of the
 * enclosing panel and the right edge of this mark. Note that in some cases this
 * property may be redundant with the left property, or with the conjunction of
 * left and width.
 */
pv.Mark.prototype.defineProperty("right");

/**
 * The top margin; the distance, in pixels, between the top edge of the
 * enclosing panel and the top edge of this mark. Note that in some cases this
 * property may be redundant with the bottom property, or with the conjunction
 * of bottom and height.
 */
pv.Mark.prototype.defineProperty("top");

/**
 * The bottom margin; the distance, in pixels, between the bottom edge of the
 * enclosing panel and the bottom edge of this mark. Note that in some cases
 * this property may be redundant with the top property, or with the conjunction
 * of top and height.
 */
pv.Mark.prototype.defineProperty("bottom");

/**
 * The cursor property; corresponds to the CSS cursor property. This is
 * typically used in conjunction with event handlers to indicate interactivity.
 */
pv.Mark.prototype.defineProperty("cursor");

/**
 * The title property; corresponds to the HTML/SVG title property, allowing the
 * general of simple plain text tooltips.
 */
pv.Mark.prototype.defineProperty("title");

/**
 * Default properties for all mark types. By default, the data array is a single
 * null element; if the data property is not specified, this causes each mark to
 * be instantiated as a singleton. The visible property is true by default.
 */
pv.Mark.defaults = new pv.Mark()
  .data([null])
  .visible(true);

/**
 * Sets the prototype of this mark to the specified mark. Any properties not
 * defined on this mark may be inherited from the specified prototype mark, or
 * its prototype, and so on. The prototype mark need not be the same type of
 * mark as this mark. (Note that for inheritance to be useful, properties with
 * the same name on different mark types should have equivalent meaning.)
 *
 * @param proto the new prototype.
 * @return this mark.
 */
pv.Mark.prototype.extend = function(proto) {
  this.proto = proto;
  return this;
};

/**
 * Adds a new mark of the specified type to the enclosing parent panel, whilst
 * simultaneously setting the prototype of the new mark to be this mark.
 *
 * @param type the type of mark to add.
 * @return the new mark.
 */
pv.Mark.prototype.add = function(type) {
  return this.parent.add(type).extend(this);
};

pv.Mark.Anchor = function() {
  pv.Mark.call(this);
};

pv.Mark.Anchor.prototype = pv.extend(pv.Mark);
pv.Mark.Anchor.prototype.defineProperty("name");

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

  this.$$data = data; // XXX

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

var property; // XXX

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
  property = name; // XXX
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

  /* cursor */
  if (s.cursor) v.style.cursor = s.cursor;

  /* title (Safari only supports xlink:title on anchor elements) */
  if (s.title) {
    if (!s.svg.$title) {
      s.svg.$title = document.createElementNS(pv.ns.svg, "a");
      s.parent.svg.insertBefore(s.svg.$title, s.svg);
      s.svg.$title.appendChild(s.svg);
    }
    s.svg.$title.setAttributeNS(pv.ns.xlink, "title", s.title);
  } else if (s.svg.$title) {
    s.parent.svg.insertBefore(s.svg, s.svg.$title);
    s.parent.svg.removeChild(s.svg.$title);
    delete s.svg.$title;
  }

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
