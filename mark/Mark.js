/**
 * Represents a data-driven graphical mark. The {@code Mark} class is the base
 * class for all graphical marks in Protovis; it does not provide any specific
 * rendering functionality, but together with {@link Panel} establishes the core
 * framework.
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
 * any enclosing panels. For example, a linear encoding of numerical data to
 * height is specified as
 *
 * <pre>m.height(function(d) d * 100);</pre>
 *
 * The expression {@code d * 100} will be evaluated for the height property of
 * each mark instance. This function is stored in the {@code $height} field. The
 * return value of the property method (e.g., {@code m.height}) is this mark
 * ({@code m})).
 *
 * <li>If invoked with a non-function argument, the property is treated as a
 * constant, and wrapped with an accessor function. This wrapper function is
 * stored in the equivalent internal ({@code $}-prefixed) field. The return
 * value of the property method (e.g., {@code m.height}) is this mark.
 *
 * <li>If invoked from an event handler, the property is set to the specified
 * value on the current instance (i.e., the instance that triggered the event,
 * such as a mouse click). In this case, the value should be a constant and not
 * a function. The return value is this mark. For example, saying
 *
 * <p>this.fillStyle("red").strokeStyle("black");</pre>
 *
 * from a "click" event handler will set the fill color to red, and the stroke
 * color to black, for any marks that are clicked.
 *
 * <li>If invoked with no arguments, the computed property value for the current
 * mark instance in the scene graph is returned. This facilitates <i>property
 * chaining</i>, where one mark's properties are defined in terms of another's.
 * For example, to offset a mark's location from its prototype, you might say
 *
 * <pre>m.top(function() this.proto.top() + 10);</pre>
 *
 * Note that the index of the mark being evaluated (in the above example, {@code
 * this.proto}) is inherited from the {@code Mark} class and set by this
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
 * area can be defined using the <i>cousin</i> instance, which is the current
 * area instance in the previous instantiation of the parent panel. In this
 * sample code,
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

/**
 * Represents an anchor on a given mark. An anchor is itself a mark, but without
 * a visual representation. It serves only to provide useful default properties
 * that can be inherited by other marks. Each type of mark can define any number
 * of named anchors for convenience. If the concrete mark type does not define
 * an anchor implementation specifically, one will be inherited from the mark's
 * parent class.
 *
 * <p>For example, the bar mark provides anchors for its four sides: left,
 * right, top and bottom. Adding a label to the top anchor of a bar,
 *
 * <pre>bar.anchor("top").add(pv.Label);</pre>
 *
 * will render a text label on the top edge of the bar; the top anchor defines
 * the appropriate position properties (top and left), as well as text-rendering
 * properties for convenience (textAlign and textBaseline).
 */
pv.Mark.Anchor = function() {
  pv.Mark.call(this);
};
pv.Mark.Anchor.prototype = pv.extend(pv.Mark);

/**
 * The anchor name. The set of supported anchor names is dependent on the
 * concrete mark type; see the mark type for details. For example, bars support
 * left, right, top and bottom anchors.
 *
 * <p>While anchor names are typically constants, the anchor name is a true
 * property, which means you can specify a function to compute the anchor name
 * dynamically. For instance, if you wanted to alternate top and bottom anchors,
 * saying
 *
 * <pre>m.anchor(function() (this.index % 2) ? "top" : "bottom").add(pv.Dot);</pre>
 *
 * would have the desired effect.
 */
pv.Mark.Anchor.prototype.defineProperty("name");

/**
 * Returns an anchor with the specified name. While anchor names are typically
 * constants, the anchor name is a true property, which means you can specify a
 * function to compute the anchor name dynamically. See the {@link #name}
 * property for details.
 *
 * @param name the anchor name; either a string or a property function.
 */
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

/**
 * Returns the anchor target of this mark, if it is derived from an anchor;
 * otherwise returns null. For example, if a label is derived from a bar anchor,
 *
 * <pre>bar.anchor("top").add(pv.Label);</pre>
 *
 * then property functions on the label can refer to the bar via the {@code
 * anchorTarget} method. This method is also useful for mark types defining
 * properties on custom anchors.
 *
 * @return the anchor target of this mark; possibly null.
 */
pv.Mark.prototype.anchorTarget = function() {
  var target = this;
  while (!(target instanceof pv.Mark.Anchor)) {
    target = target.proto;
    if (!target) return null;
  }
  return target.proto;
};

/**
 * Returns the first instance of this mark in the scene graph. This method can
 * only be called when the mark is bound to the scene graph (for example, from
 * an event handler, or within a property function).
 *
 * @return a node in the scene graph.
 */
pv.Mark.prototype.first = function() {
  return this.scene[0];
};

/**
 * Returns the last instance of this mark in the scene graph. This method can
 * only be called when the mark is bound to the scene graph (for example, from
 * an event handler, or within a property function). In addition, note that mark
 * instances are built sequentially, so the last instance of this mark may not
 * yet be constructed.
 *
 * @return a node in the scene graph.
 */
pv.Mark.prototype.last = function() {
  return this.scene[this.scene.length - 1];
};

/**
 * Returns the previous instance of this mark in the scene graph, or null if
 * this is the first instance.
 *
 * @return a node in the scene graph, or null.
 */
pv.Mark.prototype.sibling = function() {
  return (this.index == 0) ? null : this.scene[this.index - 1];
};

/**
 * Returns the current instance in the scene graph of this mark, in the previous
 * instance of the enclsoing parent panel. May return null if this instance
 * could not be found.
 *
 * @return a node in the scene graph, or null.
 */
pv.Mark.prototype.cousin = function() {
  var p = this.parent, s = p && p.sibling();
  return (s && s.children) ? s.children[this.childIndex][this.index] : null;
};

/**
 * Renders this mark, including recursively rendering all child marks if this is
 * a panel. Rendering consists of two phases: <b>build</b> and <b>update</b>. In
 * the future, the update phase could conceivably be decoupled to allow
 * different rendering engines. Similarly, future work is needed to allow
 * dynamic rebuilding based on interaction. (For example, dynamic expansion of a
 * tree visualization.)
 *
 * <p>In the build phase (see {@link #build}), all properties are evaluated, and
 * the scene graph is generated. However, nothing is rendered.
 *
 * <p>In the update phase (see {@link #update}), the mark is rendered by
 * creating and updating elements and attributes in the SVG image. No properties
 * are evaluated during the update phase; instead the values computed previously
 * in the build phase are simply translated into SVG.
 */
pv.Mark.prototype.render = function() {
  this.build();
  this.update();
};

/**
 * Evaluates properties and computes implied properties. Properties are stored
 * in the {@link #scene} array for each instance of this mark.
 *
 * <p>As marks are built recursively, the {@link #index} property is updated to
 * match the current index into the data array for each mark. Note that the
 * index property is only set for the mark currently being built and its
 * enclosing parent panels. The index property for other marks is unset, but is
 * inherited from the global {@code Mark} class prototype. This allows mark
 * properties to refer to properties on other marks <i>in the same panel</i>
 * conveniently; however, in general it is better to reference mark instances
 * specifically through the scene graph rather than depending on the magical
 * behavior of {@link #index}.
 *
 * <p>The root scene array has a special property, {@code data}, which stores
 * the current data stack. The first element in this stack is the current datum,
 * followed by the datum of the enclosing parent panel, and so on. The data
 * stack should not be accessed directly; instead, property functions are passed
 * the current data stack as arguments.
 *
 * <p>The evaluation of the {@code data} and {@code visible} properties is
 * special. The {@code data} property is evaluated first; unlike the other
 * properties, the data stack is from the parent panel, rather than the current
 * mark, since the data is not defined until the data property is evaluated.
 * The {@code visisble} property is subsequently evaluated for each instance;
 * only if true will the {@link #buildInstance} method be called, evaluating
 * other properties and recursively building the scene graph.
 *
 * <p>If this mark is being re-built, any old instances of this mark that no
 * longer exist (because the new data array contains fewer elements) will be
 * cleared using {@link #clearInstance}.
 *
 * @param parent the instance of the parent panel from the scene graph.
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

/**
 * Removes the specified mark instance from the SVG image. This method depends
 * on the {@code svg} property of the scene graph node. If the specified mark
 * instance was not present in the SVG image (for example, because it was not
 * visible), this method has no effect.
 *
 * @param s a node in the scene graph; the instance of the mark to clear.
 */
pv.Mark.prototype.clearInstance = function(s) {
  if (s.svg) {
    s.parent.svg.removeChild(s.svg);
  }
};

/**
 * Evaluates all of the properties for this mark for the specified instance
 * {@code s} in the scene graph. The set of properties to evaluate is retrieved
 * from the {@link #properties} array for this mark type (see {@link #type}).
 * After these properties are evaluated, any <b>implied</b> properties may be
 * computed by the mark and set on the scene graph; see {@link #buildImplied}.
 *
 * <p>For panels, this method recursively builds the scene graph for all child
 * marks as well. In general, this method should not need to be overridden by
 * concrete mark types.
 *
 * @param s a node in the scene graph; the instance of the mark to build.
 */
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

/**
 * Computes the implied properties for this mark for the specified instance
 * {@code s} in the scene graph. Implied properties are those with dependencies
 * on multiple other properties; for example, the width property may be implied
 * if the left and right properties are set. This method can be overridden by
 * concrete mark types to define new implied properties, if necessary.
 *
 * <p>The default implementation computes the implied CSS box model properties.
 * The prioritization of redundant properties is as follows:<ol>
 *
 * <li>If the {@code width} property is not specified (i.e., null), its value is
 * the width of the parent panel, minus this mark's left and right margins; the
 * left and right margins are zero if not specified.
 *
 * <li>Otherwise, if the {@code right} margin is not specified, its value is the
 * width of the parent panel, minus this mark's width and left margin; the left
 * margin is zero if not specified.
 *
 * <li>Otherwise, if the {@code left} property is not specified, its value is
 * the width of the parent panel, minus this mark's width and the right margin.
 *
 * </ol>This prioritization is then duplicated for the {@code height}, {@code
 * bottom} and {@code top} properties, respectively.
 *
 * @param s a node in the scene graph; the instance of the mark to build.
 */
pv.Mark.prototype.buildImplied = function(s) {
  var l = s.left;
  var r = s.right;
  var t = s.top;
  var b = s.bottom;

  /* Assume width and height are zero if not supported by this mark type. */
  var p = this.type.prototype;
  var w = p.width ? s.width : 0;
  var h = p.height ? s.height : 0;

  /* Compute implied width, right and left. */
  var width = s.parent ? s.parent.width : 0;
  if (w == null) {
    w = width - (r = r || 0) - (l = l || 0);
  } else if (r == null) {
    r = width - w - (l = l || 0);
  } else if (l == null) {
    l = width - w - (r = r || 0);
  }

  /* Compute implied height, bottom and top. */
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

  /* Only set width and height if they are supported by this mark type. */
  if (p.width) s.width = w;
  if (p.height) s.height = h;
};

var property; // XXX

/**
 * Evaluates the property function with the specified name for the current data
 * stack. The data stack, {@code this.root.scene.data}, contains the current
 * datum, followed by the datum for the enclosing panel, and so on.
 *
 * <p>This method first finds the implementing property function by querying the
 * current mark. If the current mark does not define the property function, the
 * prototype mark is queried, and so on. If none of the mark prototypes define a
 * property function with the given name, the type default function is used. If
 * no default function is provided, this method returns null.
 *
 * <p>The context of the property function is {@code this} instance (i.e., the
 * leaf-level mark), rather than whatever mark defined the property function.
 * Because of this behavior, a property function may be called on an object of a
 * different "class" (e.g., a Dot inheriting the fill style from a Line). Also
 * note that properties are not inherited statically; inheritance happens at the
 * property function / mark level, not per property value / mark instance. Thus,
 * even if a Dot extends from a Line, if the Line's fill style is defined using
 * a function that generates a random color, the Dot may get a different color.
 *
 * @param name the property name.
 * @return the evaluated property value.
 */
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
  property = name; // XXX
  return mark["$" + name].apply(this, this.root.scene.data);
};

/**
 * Updates the display, propagating property values computed in the build phase
 * to the SVG image. This method is typically invoked by {@link #render}, but is
 * also invoked after an event handler is triggered to update the display of a
 * specific mark.
 *
 * @see #event
 */
pv.Mark.prototype.update = function() {
  for (var i = 0; i < this.scene.length; i++) {
    this.updateInstance(this.scene[i]);
  }
};

/**
 * Updates the display for the specified mark instance {@code s} in the scene
 * graph. This implementation handles basic properties for all mark types, such
 * as visibility, cursor and title tooltip. Concrete mark types should override
 * this method to specify how marks are rendered.
 *
 * @param s a node in the scene graph; the instance of the mark to update.
 */
pv.Mark.prototype.updateInstance = function(s) {
  var that = this, v = s.svg;

  /* visible */
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

  /* event */
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

/**
 * Registers an event handler for the specified event type with this mark. When
 * an event of the specified type is triggered, the specified handler will be
 * invoked. The handler is invoked in a similar method to property functions:
 * the context is {@code this} mark instance, and the arguments are the full
 * data stack. Event handlers can use property methods to manipulate the display
 * properties of the mark:
 *
 * <pre>m.event("click", function() this.fillStyle("red"));</pre>
 *
 * Alternatively, the external data can be manipulated and the visualization
 * redrawn:
 *
 * <pre>m.event("click", function(d) {
 *     data = all.filter(function(k) k.name == d);
 *     vis.render();
 *   });</pre>
 *
 * TODO: In the current event handler implementation, only the mark instance
 * that triggered the event is updated, even if the event handler dirties the
 * rest of the scene. While this can be ameliorated by explicitly re-rendering,
 * it would be better and more efficient for the event dispatcher to handle
 * dirtying and redraw automatically.
 *
 * <p>The complete set of event types is defined by SVG; see the reference
 * below. The set of supported event types is:<ul>
 *
 * <li>click
 * <li>mousedown
 * <li>mouseup
 * <li>mouseover
 * <li>mousemove
 * <li>mouseout
 *
 * </ul>Since Protovis does not specify any concept of focus, it does not
 * support key events; these should be handled outside the visualization using
 * standard JavaScript. In the future, support for interaction may be extended
 * to support additional event types, particularly those most relevant to
 * interactive visualization, such as selection.
 *
 * <p>TODO: In the current implementation, event handlers are not inherited from
 * prototype marks. They must be defined explicitly on each interactive mark. In
 * addition, only one event handler for a given event type can be defined; when
 * specifying multiple event handlers for the same type, only the last one will
 * be used.
 *
 * @see http://www.w3.org/TR/SVGTiny12/interact.html#SVGEvents
 */
pv.Mark.prototype.event = function(type, handler) {
  if (!this.events) this.events = {};
  this.events[type] = handler;
  return this;
};
