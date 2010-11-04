<html>
  <head>
    <title>Protovis - Release Notes</title>
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
      <h1>Release Notes</h1>

      <h3>3.2 - May 28, 2010</h3>

      <p>layouts:
      <ul>
      <li>completely redesigned for reusable visualizations!
      <li>networks - arc, matrix, force-directed, etc.
      <li>hierarchies - dendrograms, sunbursts, trees, treemaps, circle-packing, etc.
      <li>stack layout (stacked bars, stacked areas, streamgraphs, etc.)
      <li>horizon graphs, bullet charts, and more!
      </ul>

      <p>interaction:
      <ul>
      <li>resuable behaviors - drag, pan, resize, select, point, zoom!
      <li><tt>events</tt> property for controlling event capture
      </ul>

      <p>data:
      <ul>
      <li>scales - quantile, root
      <li>ticks - date ticks, custom tick counts, tick formatting
      <li>stats - histogram, variance, deviation
      <li>text formatting and parsing - dates, numbers, times
      <li>particle simulation - constraints, forces, quadtree
      </ul>

      <p>marks and rendering:
      <ul>
      <li>partial rendering - re-render only specific marks for faster updates
      <li>anchors - no longer inherit by default, can be used across panels
      <li><tt>antialias</tt> property for crisp edges
      <li><tt>interpolate</tt> property supports &ldquo;cardinal&rdquo;, &ldquo;basis&rdquo; and &ldquo;polar&rdquo;
      <li><tt>tension</tt>, <tt>eccentricity</tt> and <tt>lineJoin</tt> properties
      <li>dynamic images
      <li>rules one-pixel wide and not antialiased by default
      </ul>

      <p>geo:
      <ul>
      <li>geo scales for mapping latitude-longitude to <i>x</i>-<i>y</i>
      <li>projections - Mercator, Gall&ndash;Peters, sinusoidal, Aitoff, Hammer
      </ul>

      <p>gitorious:
      <ul>
      <li>source code in <i>protovis</i> repository
      <li>website and documentation in <i>docs</i> repository
      </ul>

      <h3>3.1 - October 6, 2009</h3>

      <ul>
      <li>panels now support an <tt>overflow</tt> property; set to &ldquo;hidden&rdquo; for clipping
      <li>linear and log scales support tick formatting
      <li>ordinal scale supports <tt>pv.index</tt> accessor
      <li>log scale invert supports negative values
      <li>rendering no longer removes children, so as to avoid spurious events
      </ul>

      <h3>3.0 - September 19, 2009</h3>

      <p>interaction:

      <ul>
      <li>properties now behave consistently in event handlers
      <li>use local variables or properties to modify display
      <li>can redraw at any level of the scene graph
      <li>event handlers on parent panels are inherited by children
      <li>can set window location to simulate links
      <li>mark.mouse to get mouse location
      </ul>

      <p>local variables:

      <ul>
      <li>use <tt>def</tt> to define local state per mark (e.g., <tt>def("foo")</tt>)
      <li>event handlers can override def values (e.g., <tt>this.foo(42)</tt>)
      <li>properties can query def values (e.g., <tt>this.foo() == 42</tt>)
      <li>can also be used to define efficient property functions (e.g., scales)
      </ul>

      <p>scales:

      <ul>
      <li>pv.Scales is dead; long live pv.Scale
      <li>scales each have a domain (input data) and range (output pixels/color/angle)
      <li>scales are stateful, not magical
      <li>ordinal scales are categorical (discrete domain and range)
      <li>linear and log scales are quantiative (continuous domain and range)
      <li><tt>by</tt> functionality, useful as a &ldquo;view&rdquo;
      <li>support for ticks, interaction, and more!
      </ul>

      <p>colors:

      <ul>
      <li>default coloring now uses parent rather than (magical) mark index
      <li>brighter and darker operators
      <li>named colors (e.g., <tt>pv.ramp("brown", "orange")</tt>)
      <li><tt>by</tt> functionality standardized
      <li>HSL to RGB conversion bug fixed
      <li>per channel override methods (e.g. <tt>color.red(0)</tt>)
      <li>pv.Colors now uses pv.Scale.Ordinal under the hood
      </ul>

      <p>layouts:

      <ul>
      <li>treemaps!
      <li>sunbursts!
      <li>icicles!
      <li>tree size function for determining node size / children
      <li>stack: allows stacking of bars and areas (etc.) with customizable baseline
      <li>grid: two-dimensional table of bars or panels (heatmap, e.g.)
      </ul>

      <p>properties:

      <ul>
      <li>evaluated in the order they are defined, allowing dependencies
      <li>defs are evaluated before properties; constants before functions
      <li>default data property is [d] rather than [null], simplifying nesting
      <li>significant performance improvements!
      <li>width and height now supported on rules
      </ul>

      <p>data:

      <ul>
      <li>pv.repeat for array repetition
      <li>pv.random for random integers (or intervals)
      <li>pv.log{,Adjusted,Symmetric,Floor,Ceil}
      <li>pv.transpose for transposing two-dimensional arrays
      <li>pv.Vector for 2D geometry
      <li>pv.tree and pv.flatten for converting between tabular and hierarchical data
      </ul>

      <p>lines and areas:

      <ul>
      <li>can be <tt>segmented</tt> for variable lineWidth, color, visibility
      <li>segmentation can change dynamically (e.g., on mouseover tooltip refinement)
      <li>see Napoleon's March and animated examples
      <li>step functions!
      </ul>

      <p>anchors:

      <ul>
      <li>now use a single class, pv.Anchor
      <li>define properties like normal marks
      <li>support for anchors on root panel / anchors on panels
      </ul>

      <p>performance improvements:

      <ul>
      <li>separated rendering from building to allow pluggable renderers
      <li>optimized evaluation of properties
      <li>don&rsquo;t wrap constants in functions
      <li>&ldquo;bind&rdquo; phase caches inherited property definitions
      <li>minimize SVG output
      <li>job voyager is about 2x faster
      </ul>

      <p>bug fixes:

      <ul>
      <li>much more robust rebuild + re-render
      <li>panel stroke now goes over children (consistent with images, use bar otherwise)
      <li>circle dots with large lineWidths now render correctly
      <li>reverse property now more robut
      <li>type attribute now inherited; controls rendering behavior
      <li>better !JavaScript minification
      <li>use <tt>typeof == "function"</tt> rather than <tt>instanceof Function</tt>
      <li>internal scene graph structure changed to facilitate traversal
      <li>panel left/top/right/bottom now consistent with other marks
      <li>better support for Date.parse and Date.format
      </ul>

      <h3>2.6 - July 16, 2009</h3>

      <p>documentation:

      <ul>
      <li>~2,800 lines of new inline documentation
      <li>browse online at http://protovis.org/jsdoc/
      </ul>

      <p>marks:

      <ul>
      <li>Area width and height default to 0 if null
      <li>Bar anchors allow stacking of bars vertically or horizontally (see test 9)
      <li>Rule anchors reuse Bar.Anchor implementation (see test 32)
      <li>Label text-baseline vertical offset adjusted (see tests 27-29)
      <li>Label text-baseline supports font-dependent units (e.g., ex and em)
      <li>Image image property renamed "url"
      <li>Image supports fill-style and stroke-style
      <li>Panel rendering bug fixes, performance optimizations
      <li>Mark title property (a.k.a. tooltips) support
      </ul>

      <p>color:

      <ul>
      <li>more robust categorical color encoding (pv.Colors)
      <li>new quantitative color encoding (pv.Ramp)
      </ul>

      <p>miscellaneous:

      <ul>
      <li>pv.range supports negative step
      <li>pv.parse bug fix for string literals
      <li>removed undefined global (built-in since JavaScript 1.3)
      <li>experimental scales (pv.Scale)
      <li>experimental chart templates in the works; coming soon!
      <li>preliminary test framework online at http://protovis.org/test/
      </ul>
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
