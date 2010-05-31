<html>
  <head>
    <title>Protovis - Documentation</title>
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
        Documentation
      </div>
      <div class="section">
        <a href="http://protovis-js.googlecode.com/files/protovis-3.2.zip">Download</a>
      </div>
    </div>

    <div class="body">
      <div style="float:left;width:260px;">
        <h3>Reference</h3>
        <a href="../jsdoc/">API Documentation</a><br>
        <p>
        <a href="area.html">Areas</a><br>
        <a href="bar.html">Bars</a><br>
        <a href="dot.html">Dots</a><br>
        <a href="image.html">Images</a><br>
        <a href="label.html">Labels</a><br>
        <a href="line.html">Lines</a><br>
        <a href="rule.html">Rules</a><br>
        <a href="wedge.html">Wedges</a><br>
        <p>
        <a href="anchor.html">Anchors</a><br>
        <a href="scale.html">Scales</a><br>
        <a href="color.html">Colors</a><br>

        <h3>Design</h3>
        <a href="mark.html">Marks</a><br>
        <a href="panel.html">Panels</a><br>
        <a href="layout.html">Layouts</a><span class="new">New</span><br>
        <a href="inheritance.html">Inheritance</a><br>
        <a href="interaction.html">Interaction</a><br>
        <span style="color:#999;">Behaviors</span><span class="new">New</span><br>
        <a href="chaining.html">Property Chaining</a><br>
        <a href="local.html">Local Variables</a><br>
        <a href="animation.html">Animation</a><br>

        <h3>Tutorials</h3>
        <a href="http://code.google.com/p/protovis-js/wiki/GettingStarted">Getting Started</a><br>
        <a href="http://code.google.com/p/protovis-js/wiki/PairsPlot">Scatterplot Matrix</a><br>
        <a href="http://code.google.com/p/protovis-js/wiki/ScaleInvert">Scale Interaction</a><br>

        <h3>Publications</h3>
        <a href="../protovis.pdf">IEEE InfoVis 2009</a>
      </div>

      <div style="float:left;width:640px;">
        <h1>
          <div class="subtitle">Language Manifesto</div>
          Documentation
        </h1>

        <p>Many graphics libraries exist for drawing shapes and manipulating
        pixels. These are often easy-to-learn and compatible with &ldquo;visual
        thinking&rdquo;: they provide a direct way to draw curves, polygons, and
        other visual elements. Yet if used for visualization, these low-level
        interfaces can be tedious due to the lack of common abstractions, such
        as scales for color and position.

        <p>At the other end of the spectrum, many visualization libraries allow
        the concise expression of charts and visual encodings. Some even allow
        fully-customizable, interactive design. Yet while these tools make
        certain tasks easy, they often relinquish direct control over the
        rendered marks. Furthermore, the implicit, top-down approach can be
        difficult to grasp and impede visual design.

        <p>Our goal with Protovis is to find a middle ground that offers some of
        the benefits of both types of system. Protovis is a <i>graphical</i>
        toolkit, designed for <i>visualization</i>. It retains some of the
        conceptual simplicity and low-level control of graphical systems by
        dealing directly with graphical elements (shapes, lines, i.e., marks),
        but specifies marks declaratively as encodings of data. Additionally, we
        provide useful abstractions such as scales and layouts to simplify
        common tasks.

        <h2>Declarative and Data-Driven</h2>

        <p>Protovis is similar to other graphics libraries such as Java 2D or
        Processing: we provide a mechanism for drawing rectangles (bars),
        circles (dots), lines, and polygons (areas). However, Protovis uses a
        <i>declarative</i>, rather than <i>imperative</i>, syntax. Consider, for
        example, how this representation affects a pie chart specification.

        <p>In Processing, you might specify a pie chart as series of arcs using
        a <tt>for</tt> loop and a call to <tt>arc</tt>, which immediately draws
        a single arc to the canvas:

m4_include(`pie-processing.java.html')

        <p>In Protovis, you almost never use a <tt>for</tt> loop. A set of related
        graphical elements, such as the arcs in a pie chart, are specified as a
        single mark. The mark is associated with data, and the properties are
        specified as functions, encoding the data graphically:

m4_include(`pie-protovis.js.html')

        <p>Note that in Processing, you have to increment the start angle
        (<tt>lastAng</tt>) by hand. In Protovis, the angle encoding is specified
        as a function: a linear scale. The start angle is automatically the
        previous wedge's end angle, so no bookkeeping is necessary. The
        declarative syntax allows for many such conveniences:

        <p><b>Inheritance</b> - New marks can be added to a visualization that
        inherit properties from existing marks. This allows encodings to be
        reused, and eliminates code duplication. In addition, it provides the
        basis for some of the more advanced tools, such as standard layouts
        (e.g., treemaps).

        <p><b>Property Chaining</b> - One mark's properties can be defined in
        terms of another mark's properties. For example, say you wrote a
        complicated function to compute a mark's fill color. If you want the
        stroke color to be the same, but translucent, you can define it as
        this.fillStyle().alpha(.4). This technique can also be used to position
        related marks and annotations, as with anchors.

        <p><b>Smart Properties</b> - Because related graphical elements are
        expressed as a single mark, with properties derived from data, smart
        defaults are possible, as shown above with the wedge start
        angle. Another example is default categorical colors for fill and
        stroke. Even better, we can write reusable property functions, such as
        scales.

        <p><b>Interaction and Animation</b> - A mark is not just a command to
        color some pixels, but a description of the visualization's
        structure. This means you can associate event handlers with marks, much
        like you can with parts of a web page. In addition, when the
        visualization is updated for animation, Protovis can redraw
        efficiently. In the future, we'll also support smoothly-animated
        transitions.
      </div>
      <br clear="all">
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
