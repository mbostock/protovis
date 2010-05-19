<html>
  <head>
    <title>Protovis - Layouts</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.1a"/>
    <link type="text/css" rel="stylesheet" href="../ex/syntax.css?3.1"/>
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
        <a href="http://protovis-js.googlecode.com/files/protovis-3.1.zip">Download</a>
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
      representation of custom data graphics. Implicit in the
      label <i>custom</i> is that visualization specifications are largely
      unique: the code is simple enough to not require reuse across charts,
      beyond basic copy-and-paste. Yet despite the value in increased
      expressiveness and flexibility, necessary to support custom graphics, it
      is obvious that most visualization design is <i>not</i> unique. Thus, we
      introduce a mechanism to encapsulate useful techniques for reuse across
      visualizations, called <b>layouts</b>.

      <p>Layouts (in various forms) are common to many visualization and user
      interface toolkits&mdash;they reduce the code required to implement common
      visualizations types, while offering more consistent behavior by
      eliminating implementation-specific idiosyncrasies. Most importantly, they
      make available an extensible set of visualization designs for much lower
      cost, allowing these designs to see wider adoption.

      <p>Despite the prevalence of this approach, the exact form of layout
      abstraction matters. Competing with the desire to reuse layouts are two
      serious usability concerns: first, that the new abstraction will be
      difficult to learn; second, that the user must sacrifice expressiveness
      (i.e., customization and control) to facilitate reuse. To avoid these
      pitfalls, Protovis layouts are implemented as a set of related <b>mark
      prototypes</b>. Unlike previous approaches, layouts in Protovis are thus
      not a new fundamental abstraction, but a repurposing of existing
      prototypal inheritance; prototype marks provide default properties to
      instantiate the layout design, while allowing a great deal of
      customization through property overrides and construction.

      <h2>Design</h2>

      Layouts in Protovis are a minor variation of <b>panels</b>, which contain
      and replicate child marks. The only difference between the two
      classes <tt>pv.Panel</tt> and <tt>pv.Layout</tt> is that the latter
      supports custom properties. These custom properties allow high-level
      configuration of the layout; for example, a treemap layout might support
      multiple algorithms (e.g., "slide-and-dice", "squarify", "voronoi"), or a
      force-directed network layout might allow customization of spring tension
      or drag coefficients. Whereas standard properties, such as
      <tt>fillStyle</tt> and <tt>visible</tt>, share a single namespace, layout
      properties tend to be specialized and are thus defined locally.

      <p>By reusing panels and properties, the design is familiar to existing
      users; the mental model required to understand layouts is smaller. In
      addition, this leverages the expressiveness of the core language: layouts
      can be replicated and embedded in the mark hierarchy as any other mark or
      panel, and, any layout properties can be specified using data-driven
      functions. This simplifies the creation of small multiples of layouts with
      varying parameters, and allows layouts to be nested hierarchically,
      similar to <a href="http://gicentre.org/hierarchical_layouts/" >HiVE</a>.

      <h3>Mark Prototypes</h3>

      To better illustrate how mark prototypes are used to instantiate reusable
      visualization designs, we now go through a series of example layouts
      implemented in Protovis. For each example, a diagram shows panel enclosure
      (using nested rectangles) and property inheritance (using directed
      arrows). Off-screen mark prototypes that are not directly visible are
      shown with a dashed outline.

      <p>Sed iaculis commodo vestibulum. Pellentesque blandit mollis quam vitae
      egestas. Sed vehicula augue sed orci placerat id suscipit nulla
      interdum. Curabitur feugiat posuere dignissim. Nunc congue tortor tortor,
      ut commodo lectus. Fusce blandit sem ut nulla euismod venenatis. Donec
      dictum ullamcorper nisl, ut tristique dui aliquet ac. Donec placerat
      pulvinar quam, nec imperdiet tortor fermentum in. Praesent nisl nisl,
      dictum quis euismod non, condimentum accumsan risus. Class aptent taciti
      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

include(`layouts/grid.js.html')

      <p>Customize properties. Define custom layout parameters. Layout
      parameters can be defined as functions, like any other property in
      Protovis; this provides a great deal of flexibility and hierarchical
      nesting of layouts.

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate
      diam id est gravida non facilisis purus ullamcorper. Ut quis purus
      libero. Vivamus in lorem sed nisi congue pharetra. Quisque nibh sem,
      tincidunt ac consequat in, scelerisque a elit. Maecenas tristique, tellus
      vitae facilisis semper, ipsum purus iaculis lectus, in luctus neque erat
      vitae ligula. Maecenas cursus fermentum auctor. Morbi ac neque in lacus
      facilisis placerat ut sodales diam. Praesent suscipit ullamcorper eros, eu
      vulputate lacus pellentesque in.

      <p><table width="100%"><tr><td>
        <img src="layouts/grid.png">
      </td><td width="350" align="right" valign="middle">
        <a href="../ex/heatmap.html">
          <img src="layouts/grid-ex.png" style="border: solid 3px #ccc;">
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
        <img src="layouts/treemap.png">
      </td><td width="350" align="right" valign="middle">
        <a href="../ex/treemap.html">
          <img src="layouts/treemap-ex.png" style="border: solid 3px #ccc;">
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

include(`layouts/treemap.js.html')

      <p>Override default properties. Access underlying data structure.

      <p>Sed iaculis commodo vestibulum. Pellentesque blandit mollis quam vitae
      egestas. Sed vehicula augue sed orci placerat id suscipit nulla
      interdum. Curabitur feugiat posuere dignissim. Nunc congue tortor tortor,
      ut commodo lectus. Fusce blandit sem ut nulla euismod venenatis. Donec
      dictum ullamcorper nisl, ut tristique dui aliquet ac. Donec placerat
      pulvinar quam, nec imperdiet tortor fermentum in. Praesent nisl nisl,
      dictum quis euismod non, condimentum accumsan risus. Class aptent taciti
      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

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
        <a href="../ex/stack.html">
          <img src="layouts/stack-ex.png" style="border: solid 3px #ccc;">
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

include(`layouts/stack.js.html')

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
        <a href="../ex/horizon.html">
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

include(`layouts/tree.js.html')

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
