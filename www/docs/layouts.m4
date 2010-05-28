<html>
  <head>
    <title>Protovis - Layouts</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="../ex/syntax.css?3.2"/>
    <script type="text/javascript" src="../protovis-r3.2.js"></script>
  </head>
  <body>

    <div class="title">
      <div class="subtitle">
        A graphical toolkit for visualization
      </div>
      <a href="../">Protovis</a>
    </div>

    <div class="head">
      <div class="section">
        <a href="../">Overview</a>
      </div>
      <div class="section">
        <a href="../ex/">Examples</a>
      </div>
      <div class="section selected">
        <a href="../docs/">Documentation</a>
      </div>
      <div class="section">
        <a href="http://protovis-js.googlecode.com/files/protovis-3.2.zip">Download</a>
      </div>
    </div>
    <div class="subhead">
      <div class="section">
        <a href="./">Index</a>
      </div>
    </div>

    <div class="body">
      <h1>Layouts</h1>

      <blockquote>[When] you see excellent graphics, find out how they were
      done. Borrow strength from demonstrated excellence. The idea for
      information design is: Don't get it original, get it right. <a
      href="http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=00000p"
      >&mdash;Edward Tufte</a></blockquote>

      <h2>Introduction</h2>

      <p>At its core, Protovis is intended as a concise, declarative
      representation of <i>custom</i> data graphics. Implicit in the label
      &ldquo;custom&rdquo; is that visualization specifications are largely
      unique: the code is simple enough to not require reuse across charts,
      beyond basic copy-and-paste. Yet despite the inherent value in
      expressiveness and flexibility necessary to support custom graphics, it is
      obvious that most visualization designs are <i>not</i> unique. Thus, we
      introduce a mechanism to encapsulate useful techniques for reuse across
      visualizations, called <b>layouts</b>.

      <p>Layouts (in various forms) are common to many visualization and user
      interface toolkits&mdash;they reduce the code required to implement common
      visualizations types, while offering more consistent behavior by
      eliminating implementation-specific idiosyncrasies. Most importantly, they
      make available an extensible set of visualization designs for much lower
      cost, allowing these designs to see wider adoption.

      <p>Despite the prevalence of this approach, the exact form of abstraction
      matters. Competing with the desire to reuse layouts are two serious
      usability concerns: first, that the new abstraction will be difficult to
      learn; second, that the user must sacrifice expressiveness (i.e.,
      customization and control) to facilitate reuse. To avoid these pitfalls,
      Protovis layouts are implemented as a set of related <b>mark
      prototypes</b>. Unlike previous approaches, layouts in Protovis do not
      introduce new fundamental abstractions, instead repurposing prototypal
      inheritance; prototype marks provide default properties to instantiate the
      layout design, while allowing a great deal of customization through
      property overrides and construction.

      <h2>Design</h2>

     Layouts in Protovis are a minor variation of <b><a
      href="http://code.google.com/p/protovis-js/wiki/PvPanel">panels</a></b>,
      which contain and replicate child marks. Indeed, the only difference
      between the classes <tt>pv.Panel</tt> and <tt>pv.Layout</tt> is that the
      latter supports custom properties. These custom properties allow top-level
      configuration of the layout; for example, a treemap layout might support
      multiple algorithms (e.g., &ldquo;slide-and-dice&rdquo;,
      &ldquo;squarify&rdquo;, &ldquo;voronoi&rdquo;), while a force-directed
      network layout might allow tweaking of spring tension or drag
      coefficients. Whereas standard properties, such as <tt>fillStyle</tt> and
      <tt>visible</tt>, share a single namespace, layout properties tend to be
      specialized and are thus defined locally.

      <p>By reusing panels and properties, the design is familiar to existing
      users; the mental model required to understand layouts is simpler. In
      addition, this leverages the expressiveness of the core language: layouts
      can be replicated and embedded in the mark hierarchy as any other mark or
      panel, and, any layout properties can be specified using data-driven
      functions. This simplifies the creation of small multiples of layouts with
      varying parameters, and allows layouts to be nested hierarchically,
      similar to <a href="http://gicentre.org/hierarchical_layouts/" >HiVE</a>.
      We will explore examples shortly.

      <p>On the other hand, our approach has two hidden complexities:

      <p>Layout implementations typically require an additional pre-processing
      step per instance, where the bulk of the layout work is performed; this is
      typically accomplished by overriding the internal <tt>buildImplied</tt>
      method. Although this detail can be overlooked by <i>users</i> of layouts,
      it must be understood to implement a new layout, and represents a
      divergence from standard mark and panel specification.

      <!-- Discuss psuedo-properties? -->

      <p>The simplicity of the layout interface means there is no guarantee of
      consistency across layout implementation: users must understand the
      semantics of the mark prototypes for each implementation in order to
      instantiate and customize the layout. Of course, for this reason it is
      important to establish good practices across layout designs, and to reuse
      code whenever possible (e.g., across hierarchical and network layouts).

      <h3>Mark Prototypes</h3>

      The core idea behind Protovis layouts is that a set of related mark
      prototypes can instantiate reusable visualization designs. To better
      illustrate how mark prototypes are used, we now go through a series of
      example layout implementations. For each example, a diagram shows panel
      enclosure (using nested rectangles) and property inheritance (using
      directed arrows). Off-screen mark prototypes that are not directly visible
      are shown with a dashed outline.

      <p>The <b>grid</b> layout is arguably the simplest non-trivial layout
      implementation: given a two-dimensional array of data, it divides the
      layout panel into a series of equally-spaced rows and columns. It exports
      a single mark prototype, <tt>cell</tt>, with positional properties
      computed from the mark index. For instance, the left margin is <i>width *
      (index % cols)</i>, where <i>cols</i> is the number of columns derived
      from the data. If our two-dimensional array contains numbers that
      represent elevation, we can instantiate simple topographic map using a
      grid of colored bars:

m4_include(`layouts/grid.js.html')

      <p>Adding a layout to a visualization looks similar to adding a panel,
      with two differences: we can use custom properties such as <tt>rows</tt>
      to configure the layout, and we can add to a mark prototype such as
      <tt>cell</tt>, rather than adding directly to the panel. By adding to the
      <tt>cell</tt> prototype in this example, we are creating a new <a
      href="http://code.google.com/p/protovis-js/wiki/PvBar">bar</a> that
      inherits properties from <tt>cell</tt>, while simultaneously adding it to
      the layout panel. As a diagram:

      <p><table width="100%"><tr><td>
        <img src="layouts/grid.png">
      </td><td width="350" align="right" valign="middle">
        <a href="../ex/heatmap.html">
          <img src="layouts/grid-ex.png" style="border: solid 3px #ccc;">
        </a>
      </td></tr></table>

      <p>Thus, the root panel <tt>vis</tt> contains the <tt>grid</tt> layout.
      That's the first line of code in the above example. The layout in turn
      contains the added bar (line 3); this bar extends from the <tt>cell</tt>
      prototype. We can override properties on the added bar (line 4), which
      will trump any default logic inherited from the prototype.

      <p>Note that the <tt>cell</tt> prototype is not contained inside the
      layout, and so is off to the right with a dashed border in the diagram:
      this is what is meant by an &ldquo;off-screen&rdquo; prototype.  The
      prototype is not rendered directly, used only for extending properties to
      any explicitly-added marks (such as the bar, here). This gives the user
      more control over and visibility into how marks are added to the scene
      graph: the user can choose the order in which marks are added,
      affecting <i>z-order</i>; the user can choose the <i>implementation</i> of
      the added mark (for example, using a panel or another layout rather than a
      bar); the user can <i>pick and choose</i> which prototype to add, if
      multiple prototypes are available.

      <p>How is the cell replicated? All marks in Protovis have a <tt>data</tt>
      property that controls replication: a mark instance is created for each
      element in the data array. The <tt>cell</tt> prototype exported by the
      grid layout has a <tt>data</tt> property derived from the layout's
      <tt>rows</tt> property: the two-dimensional array is flattened (blended)
      into a one-dimensional array. The data on the added bar are thus the
      numbers in the heatmap array, which is then used to derive the fill style.

      <p>More powerful, and yet conceptually similar, is the <b>treemap</b>
      layout. Like the grid layout, treemaps can be instantiated by adding a bar
      to the layout's mark prototype; the treemap&rsquo;s prototype is
      called <tt>node</tt>&mdash;rather than <tt>cell</tt>&mdash;but serves a
      similar function in exporting positional properties based on the results
      of running the squarified treemap layout algorithm. (The choice of treemap
      algorithm can be specified using the <tt>mode</tt> custom property.) In
      addition, the treemap layout provides a <tt>label</tt> prototype that is a
      little bit smarter than anchoring a label to the center of the bar:

      <p><table width="100%"><tr><td>
        <img src="layouts/treemap.png">
      </td><td width="350" align="right" valign="middle">
        <a href="../ex/treemap.html">
          <img src="layouts/treemap-ex.png" style="border: solid 3px #ccc;">
        </a>
      </td></tr></table>

      <p>The <tt>label</tt> prototype extends from the <tt>node</tt> prototype,
      although this is purely for the sake of convenience. We can instantiate a
      treemap by first adding it to the root panel, then adding the node bar,
      and finally adding the label:

m4_include(`layouts/treemap.js.html')

      <p>We have customized the treemap layout slightly by redefining the fill
      style: we use translucent blue for internal nodes, and opaque orange for
      leaf nodes. This in conjunction with the six-pixel padding makes it easy
      to see the tree structure through containment. We also override the label
      visibility such that labels are hidden on internal nodes; an alternative
      strategy would be to position the labels at the top-left, which can be
      done by anchoring a label on the bar.

      <p>As with all properties in Protovis, properties are defined in terms of
      data. With layouts, this means that we can access the underlying data
      structure used by the layout when defining properties. For example, the
      treemap layout computes the <i>size</i> and <i>depth</i> of each node as a
      side-effect of running the treemap algorithm; these attributes are then
      exposed through the data and can be used to derive custom properties. Th
      above example uses the <tt>firstChild</tt> attribute to distinguish
      internal from leaf nodes.

      <p><b>Matrix:</b> Sed iaculis commodo vestibulum. Pellentesque blandit
      mollis quam vitae egestas. Sed vehicula augue sed orci placerat id
      suscipit nulla interdum. Curabitur feugiat posuere dignissim. Nunc congue
      tortor tortor, ut commodo lectus. Fusce blandit sem ut nulla euismod
      venenatis. Donec dictum ullamcorper nisl, ut tristique dui aliquet
      ac. Donec placerat pulvinar quam, nec imperdiet tortor fermentum
      in. Praesent nisl nisl, dictum quis euismod non, condimentum accumsan
      risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
      per inceptos himenaeos.

      <p><table width="100%"><tr><td>
        <img src="layouts/matrix.png">
      </td><td width="350" align="right" valign="middle">
        <a href="../ex/matrix.html">
          <img src="layouts/matrix-ex.png" style="border: solid 3px #ccc;">
        </a>
      </td></tr></table>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate
      diam id est gravida non facilisis purus ullamcorper. Ut quis purus
      libero. Vivamus in lorem sed nisi congue pharetra. Quisque nibh sem,
      tincidunt ac consequat in, scelerisque a elit. Maecenas tristique, tellus
      vitae facilisis semper, ipsum purus iaculis lectus, in luctus neque erat
      vitae ligula. Maecenas cursus fermentum auctor. Morbi ac neque in lacus
      facilisis placerat ut sodales diam. Praesent suscipit ullamcorper eros, eu
      vulputate lacus pellentesque in.

      <h3>Implicit Replication</h3>

      <p>Sed iaculis commodo vestibulum. Pellentesque blandit mollis quam vitae
      egestas. Sed vehicula augue sed orci placerat id suscipit nulla
      interdum. Curabitur feugiat posuere dignissim. Nunc congue tortor tortor,
      ut commodo lectus. Fusce blandit sem ut nulla euismod venenatis. Donec
      dictum ullamcorper nisl, ut tristique dui aliquet ac. Donec placerat
      pulvinar quam, nec imperdiet tortor fermentum in. Praesent nisl nisl,
      dictum quis euismod non, condimentum accumsan risus. Class aptent taciti
      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

      <p><table width="100%"><tr><td>
        <img src="layouts/stack.png">
      </td><td width="350" align="right" valign="middle">
        <a href="../ex/stream.html">
          <img src="layouts/stack-ex.png" style="border: solid 3px #ccc;">
        </a>
      </td></tr></table>

      <p>Layout parameters can be defined as functions, like any other property
      in Protovis; this provides a great deal of flexibility and hierarchical
      nesting of layouts.

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate
      diam id est gravida non facilisis purus ullamcorper. Ut quis purus
      libero. Vivamus in lorem sed nisi congue pharetra. Quisque nibh sem,
      tincidunt ac consequat in, scelerisque a elit. Maecenas tristique, tellus
      vitae facilisis semper, ipsum purus iaculis lectus, in luctus neque erat
      vitae ligula. Maecenas cursus fermentum auctor. Morbi ac neque in lacus
      facilisis placerat ut sodales diam. Praesent suscipit ullamcorper eros, eu
      vulputate lacus pellentesque in.

m4_include(`layouts/stack.js.html')

      <p>Sed iaculis commodo vestibulum. Pellentesque blandit mollis quam vitae
      egestas. Sed vehicula augue sed orci placerat id suscipit nulla
      interdum. Curabitur feugiat posuere dignissim. Nunc congue tortor tortor,
      ut commodo lectus. Fusce blandit sem ut nulla euismod venenatis. Donec
      dictum ullamcorper nisl, ut tristique dui aliquet ac. Donec placerat
      pulvinar quam, nec imperdiet tortor fermentum in. Praesent nisl nisl,
      dictum quis euismod non, condimentum accumsan risus. Class aptent taciti
      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

      <p><table width="100%"><tr><td>
        <img src="layouts/horizon.png">
      </td><td width="350" align="right" valign="middle">
        <a href="../ex/horizon.html">
          <img src="layouts/horizon-ex.png" style="border: solid 3px #ccc;">
        </a>
      </td></tr></table>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate
      diam id est gravida non facilisis purus ullamcorper. Ut quis purus
      libero. Vivamus in lorem sed nisi congue pharetra. Quisque nibh sem,
      tincidunt ac consequat in, scelerisque a elit. Maecenas tristique, tellus
      vitae facilisis semper, ipsum purus iaculis lectus, in luctus neque erat
      vitae ligula. Maecenas cursus fermentum auctor. Morbi ac neque in lacus
      facilisis placerat ut sodales diam. Praesent suscipit ullamcorper eros, eu
      vulputate lacus pellentesque in.

      <p>Sed iaculis commodo vestibulum. Pellentesque blandit mollis quam vitae
      egestas. Sed vehicula augue sed orci placerat id suscipit nulla
      interdum. Curabitur feugiat posuere dignissim. Nunc congue tortor tortor,
      ut commodo lectus. Fusce blandit sem ut nulla euismod venenatis. Donec
      dictum ullamcorper nisl, ut tristique dui aliquet ac. Donec placerat
      pulvinar quam, nec imperdiet tortor fermentum in. Praesent nisl nisl,
      dictum quis euismod non, condimentum accumsan risus. Class aptent taciti
      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

      <p><table width="100%"><tr><td>
        <img src="layouts/tree.png">
      </td><td width="350" align="right" valign="middle">
        <a href="../ex/tree.html">
          <img src="layouts/tree-ex.png" style="border: solid 3px #ccc;">
        </a>
      </td></tr></table>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate
      diam id est gravida non facilisis purus ullamcorper. Ut quis purus
      libero. Vivamus in lorem sed nisi congue pharetra. Quisque nibh sem,
      tincidunt ac consequat in, scelerisque a elit. Maecenas tristique, tellus
      vitae facilisis semper, ipsum purus iaculis lectus, in luctus neque erat
      vitae ligula. Maecenas cursus fermentum auctor. Morbi ac neque in lacus
      facilisis placerat ut sodales diam. Praesent suscipit ullamcorper eros, eu
      vulputate lacus pellentesque in.

m4_include(`layouts/tree.js.html')

      <p>Add order affects z-order. Can also be selective about which marks to
      include.

      <p>Sed iaculis commodo vestibulum. Pellentesque blandit mollis quam vitae
      egestas. Sed vehicula augue sed orci placerat id suscipit nulla
      interdum. Curabitur feugiat posuere dignissim. Nunc congue tortor tortor,
      ut commodo lectus. Fusce blandit sem ut nulla euismod venenatis. Donec
      dictum ullamcorper nisl, ut tristique dui aliquet ac. Donec placerat
      pulvinar quam, nec imperdiet tortor fermentum in. Praesent nisl nisl,
      dictum quis euismod non, condimentum accumsan risus. Class aptent taciti
      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
