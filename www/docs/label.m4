<html>
  <head>
    <title>Protovis - Labels</title>
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
      <h1>Labels</h1>

      <p>The <b>label</b> mark type represents a textual annotation. Labels are used
      in almost all visualizations, either to identify axes, grid line values,
      or annotate specific data points.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Label.html">pv.Label API reference</a>

        <br>Examples:
        <a href="../ex/bar.html">Bar &amp; Column Charts</a>,
        <a href="../ex/stem-and-leaf.html">Stemplots</a>
      </blockquote>

      <h2>Placement</h2>

      <img src="label.png">

      <p>A label&rsquo;s placement is specified using the standard box model,
      much like a <a href="dot.html">dot</a>, through a combination of
      properties:

      <ul>
      <li><tt>top</tt> - the distance from the top edge of the parent panel to the text anchor.</li>
      <li><tt>left</tt> - the distance from the left edge of the parent panel to the text anchor.</li>
      <li><tt>bottom</tt> - the distance from the bottom edge of the parent panel to the text anchor.</li>
      <li><tt>right</tt> - the distance from the right edge of the parent panel to the text anchor.</li>
      </ul>

      <p>These properties specify the distance between the text anchor of the
      label and the corresponding edge of the parent panel. Note that these
      properties together over-specify the position of the anchor. In practice,
      only two (orthogonal) properties should be specified. This section looks
      at some examples.

      <p>Once the anchor is set, the placement of text is controlled by
      additional parameters:

      <ul>
      <li><tt>textAlign</tt> - horizontal alignment.</li>
      <li><tt>textBaseline</tt> - vertical alignment.</li>
      <li><tt>textMargin</tt> - margin to offset from the text anchor.</li>
      <li><tt>textAngle</tt> - rotation angle, in radians.</li>
      </ul>

      <p>The default text alignment is &ldquo;left&rdquo;, and the default baseline is
      &ldquo;bottom&rdquo;. The default text margin is 3, measured in pixels. The default
      text angle is 0, measured in radians.

      <h3>Using <tt>left</tt> and <tt>bottom</tt></h3>

      <p>In the simplest incarnation, a label can be instantiated singly to
      provide an annotation, such as a title. Here the title is centered near
      the top of the canvas:

      <p><table><tr><td>

m4_include(`label-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`label-1.js.txt')

      </script></td></tr></table>

      <p>Static labels can be used to provide other annotations, such as
      captions and legends. Note however that rich-formatting and wrapping
      features are not exposed in Protovis. If these features are desired, it
      may be possible to generate the appropriate HTML outside of Protovis, and
      place it over the visualization.

      <p>More commonly, labels are used to annotate data marks, such as bars,
      axis ticks, and grid lines. Using <a href="inheritance.html"
      >inheritance</a>, it is easy to derive a label from a bar. For example:

      <p><table><tr><td>

m4_include(`label-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`label-2.js.txt')

      </script></td></tr></table>

      <p>Note that the label inherits the <tt>bottom</tt> and <tt>left</tt>
      values from the bar, but otherwise retains the default values. Also note
      that the default behavior for the text property simply displays the data
      element associated with the mark instance.

      <p>In the same vein, here we use inheritance to add labels to grid lines:

      <p><table><tr><td>

m4_include(`label-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`label-3.js.txt')

      </script></td></tr></table>

      <p>While the direct inheritance approach may be sufficient for some cases,
      often we want to further specify the visual parameters of the label. For
      instance, we might want to display the label in white, centered at the top
      of the bar. One way to do this is to use <a href="chaining.html">property
      chaining</a>:

      <p><table><tr><td>

m4_include(`label-4.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`label-4.js.txt')

      </script></td></tr></table>

      <p>While explicit, an obvious downside of the above approach is that it is
      verbose. This quickly becomes tedious and error-prone when labels are
      desired for more complex marks, such as the wedges comprising a pie chart:

      <p><table><tr><td>

m4_include(`label-5.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`label-5.js.txt')

      </script></td></tr></table>

      <p>Fortunately, there is a simple alternative that allows the
      specification of marks in the familiar places: marks can expose <a
      href="anchor.html">anchors</a>. Like most other visual properties, the
      anchor name is dynamic and can vary based on data using a function rather
      than a constant. This makes it easy to use a different anchor for some
      marks. Another option is to vary the text placement relative to the
      anchor, such as on bars that would be too short to contain the label
      fully:

      <p><table><tr><td>

m4_include(`label-6.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`label-6.js.txt')

      </script></td></tr></table>

      <p>In the last section on text placement, we look at the <tt>angle</tt>
      property, which allows for text rotation. Although this by itself may
      impede readability, it is still desirable for some visualizations.

      <h3>Using <tt>angle</tt></h3>

      <p>Here is yet another way to label bars with their associated values,
      using the bottom anchor and rotating the text so that it reads vertically:

      <p><table><tr><td>

m4_include(`label-7.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`label-7.js.txt')

      </script></td></tr></table>

      <p>Note that when rotated text is used, you will often need to override
      the <tt>textAlign</tt> and <tt>textBaseline</tt> parameters as well. The
      built-in anchors are designed to work with non-rotated text by default.

      <h2>Style</h2>

      <p>A label&rsquo;s visual style is specified through optional attributes:

      <ul>
      <li><tt>font</tt> - <a href="http://www.w3.org/TR/CSS2/fonts.html">CSS2 font</a>.</li>
      <li><tt>textStyle</tt> - text color.</li>
      </ul>

      <p>By default, the <tt>textStyle</tt> is black and the font is &ldquo;10px
      sans-serif&rdquo;, consistent with the default behavior for the standard
      canvas element. Any allowable font specification can be used, but the
      system is currently designed to use the sans-serif font in pixel sizes.

      <p>It is possible to vary the font and text style on a per-instance basis,
      but this should be used judiciously:

      <p><table><tr><td>

m4_include(`label-8.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`label-8.js.txt')

      </script></td></tr></table>

      <p>See the <a href="color.html">color documentation</a> for more
      examples of acceptable values for text styles.
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
