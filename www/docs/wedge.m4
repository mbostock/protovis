<html>
  <head>
    <title>Protovis - Wedges</title>
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
      <h1>Wedge</h1>

      <p>The <b>wedge</b> mark type represents a solid arc, akin to
      a <a href="bar.html">bar</a> in polar coordinates, that can be filled
      (via <tt>fillStyle</tt>) and stroked (via <tt>strokeStyle</tt>). Wedges
      are used for some popular visualization types, including pie charts and
      donut charts.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Wedge.html">pv.Wedge API reference</a>

        <br>Examples:
        <a href="../ex/pie.html">Pie &amp; Donut Charts</a>,
        <a href="../ex/antibiotics-burtin.html">Burtin&rsquo;s Antibiotics</a>,
        <a href="../ex/clock.html">PolarClock</a>
      </blockquote>

      <h2>Placement</h2>

      <img src="wedge.png">

      <p>A wedge&rsquo;s placement is specified through some combination of
      properties:

      <ul>
      <li><tt>top</tt> - the distance from the top edge of the parent panel to the wedge center.
      <li><tt>left</tt> - the distance from the left edge of the parent panel to the wedge center.
      <li><tt>bottom</tt> - the distance from the bottom edge of the parent panel to the wedge center.
      <li><tt>right</tt> - the distance from the right edge of the parent panel to the wedge center.
      <li><tt>startAngle</tt> - the start angle of the wedge in radians.
      <li><tt>endAngle</tt> - the end angle of the wedge in radians.
      <li><tt>angle</tt> - the angle subtended by the wedge in radians.
      <li><tt>innerRadius</tt> - the inner radius of the wedge.
      <li><tt>outerRadius</tt> - the outer radius of the wedge.
      </ul>

      <p>Should the radius be used to encode data, the area of the wedge is
      proportional to the square of the radius. The inner radius defaults to 0,
      suitable for pie charts; a positive value can be used for donut charts.

      <p>Note that first four properties together over-specify the center of the
      wedge. In practice, only two (orthogonal) properties should be
      specified. This section looks at some examples.

      <h3>Using <tt>left</tt> and <tt>bottom</tt> with <tt>angle</tt></h3>

      <p>In most cases, the left and bottom will be constant, since the
      instantiated wedges will share the same center point; the data is instead
      visually encoded using angle. For example, a simple pie chart:

      <p><table><tr><td>

m4_include(`wedge-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`wedge-1.js.txt')

      </script></td></tr></table>

      <p>Observe that the <tt>angle</tt> property is specified, rather
      than <tt>startAngle</tt> and <tt>endAngle</tt>. The default implementation
      of <tt>startAngle</tt> uses the value of the previous wedge's end
      angle. This way, by specifying just the angle, the wedges neatly stack
      together to produce a whole. It is still possible to provide custom
      implementations for the start and end angle, but this is rarely needed.

      <p>Note the preprocessing step to <a href="../jsdoc/symbols/pv.html#.normalize"
      >normalize</a> the data array. This produces a rescaled copy of the original
      data array, such that the sum of all values is 1; this simplifies the
      subsequent calculation of the wedge angle. An alternative is to calculate
      the sum:

      <p><table><tr><td>

m4_include(`wedge-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`wedge-2.js.txt')

      </script></td></tr></table>

      <p>But perhaps the best alternative is to use a <a href="scale.html"
      >linear scale</a>.

      <h3>Using <tt>innerRadius</tt> and <tt>outerRadius</tt></h3>

      <p>In the previous example, we saw that a donut chart can be produced
      instead of a pie chart by changing the inner radius. If desired, you can
      vary the inner and outer radius based on data, though note that the area
      of a wedge is proportional to the <i>square</i> of its radius:

      <p><table><tr><td>

m4_include(`wedge-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`wedge-3.js.txt')

      </script></td></tr></table>

      <p>Varying the inner radius can also be used to nest donuts (or pies):

      <p><table><tr><td>

m4_include(`wedge-4.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`wedge-4.js.txt')

      </script></td></tr></table>

      <p>The above examples merely demonstrate possible visualiations using
      wedges; they are not necessarily examples of <i>good</i> visualizations. Care
      should be taken when using wedges, as studies have shown that angle
      judgements are generally less accurate than position or length
      judgements. These inaccuracies can be compounded by bad design, as we will
      see in the next section.

      <h3>Using <tt>startAngle</tt> and <tt>endAngle</tt></h3>

      <p>Specifying <tt>startAngle</tt> and <tt>endAngle</tt> allows for
      wedge-based visualizations that are not traditional pie or donut
      charts. For example, to produce something akin to a speedometer, we can
      use a fixed start angle, equispaced inner and outer radius, and a variable
      end angle:

      <p><table><tr><td>

m4_include(`wedge-5.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`wedge-5.js.txt')

      </script></td></tr></table>

      <p>Of course, it is possible to go overboard with this technique:

      <p><table><tr><td>

m4_include(`wedge-6.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`wedge-6.js.txt')

      </script></td></tr></table>

      <p>Wedges should be used judiciously. Although the examples in this
      section may be aesthetically pleasing, note in particular that the
      innermost dark blue wedge is significantly smaller (at 260 square pixels)
      than the outermost green wedge (470 square pixels). This is grossly
      misleading, since the associated datum (1.0) is in fact 40% larger (0.7)!
      The <a href="http://www.infovis-wiki.net/index.php/Lie_Factor">lie
      factor</a> in this case is 2.7.

      <h2>Style</h2>

      <p>Like <a href="bar.html">bars</a>, a wedge&rsquo;s visual style is
      specified through three optional attributes

      <ul>
      <li><tt>fillStyle</tt>
      <li><tt>strokeStyle</tt>
      <li><tt>lineWidth</tt>
      </ul>

      <p>By default, a fill color is allocated from the <tt>category20</tt>
      <a href="color.html">color palette</a> for each mark instance. Most
      instances of a given mark share the same color, such as bars in a bar
      chart; in contrast, wedges are allocated unique colors by default. The
      default <tt>strokeStyle</tt> is null, while the default <tt>lineWidth</tt>
      is 1.5 pixels.

      <p>These three visual parameters can be specified on a per-instance basis,
      meaning they too can be used to encode data visually. For example, to make
      a rainbow:

      <p><table><tr><td>

m4_include(`wedge-7.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`wedge-7.js.txt')

      </script></td></tr></table>

      <p>If <tt>strokeStyle</tt> is non-null, a path is stroked around the
      perimeter of the wedge. The thickness of the path is controlled by
      the <tt>lineWidth</tt> property. For example, a quick way to separate
      wedges is to use a white border, at the expense of some accuracy in angle
      comparison (especially for small wedges):

      <p><table><tr><td>

m4_include(`wedge-8.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`wedge-8.js.txt')

      </script></td></tr></table>

      <p>An alternative, more correct, approach is to offset the left and bottom
      position, so the wedges are offset from the center. Perhaps this could be
      incorporated into a future <a href="layout.html">pie layout</a>.
      Here&rsquo;s an interactive example:

      <p><table><tr><td>

m4_include(`wedge-9.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`wedge-9.js.txt')

      </script></td></tr></table>

      <p>See the <a href="color.html">color documentation</a> for more examples
      of acceptable values for stroke and fill styles.
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
