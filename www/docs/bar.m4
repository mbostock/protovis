<html>
  <head>
    <title>Protovis - Bars</title>
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
      <h1>Bars</h1>

      <p>The <b>bar</b> mark type represents an axis-aligned rectangle that can
      be filled (via <tt>fillStyle</tt>) and stroked (via <tt>strokeStyle</tt>).
      Bars are used for many popular visualization types, including bar charts,
      grouped bar charts, stacked bar charts and histograms.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Bar.html">pv.Bar API reference</a>

        <br>Examples:
        <a href="../ex/bar.html">Bar &amp; Column Charts</a>,
        <a href="../ex/group.html">Grouped Charts</a>,
        <a href="../ex/histogram.html">Histograms</a>
      </blockquote>

      <h2>Placement</h2>

      <img src="bar-bhlw.png">

      <p>A bar&rsquo;s position and dimensions are specified through some
      combination of properties:

      <ul>
      <li><tt>top</tt> - the distance from the top edge of the parent panel.</li>
      <li><tt>left</tt> - the distance from the left edge of the parent panel.</li>
      <li><tt>bottom</tt> - the distance from the bottom edge of the parent panel.</li>
      <li><tt>right</tt> - the distance from the right edge of the parent panel.</li>
      <li><tt>width</tt> - the width of the bar.</li>
      <li><tt>height</tt> - the height of the bar.</li>
      </ul>

      <p>Note that these properties together over-specify the placement of the
      bar. In practice, only four (orthogonal) properties should be
      specified. This section looks at some examples.

      <h3>Using <tt>left</tt>, <tt>bottom</tt>, <tt>width</tt> and <tt>height</tt></h3>

      <p>To produce a standard bar chart encoding a single variable with
      position&mdash;i.e., for <i>univariate</i> data&mdash;use constant
      <tt>bottom</tt>, constant <tt>width</tt>, equispaced <tt>left</tt> and
      variable <tt>height</tt>:

      <p><table><tr><td>

m4_include(`bar-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`bar-1.js.txt')

      </script></td></tr></table>

      <p>The <tt>left</tt> property is calculated using the automatic
      <tt>index</tt> variable. The index starts at 0 for the first datum, and is
      subsequently incremented by 1.

      <p>For <i>multivariate</i> data, simply specify additional properties as
      functions rather than constants. For example, a Gantt chart can be
      produced using variable <tt>left</tt> and <tt>width</tt>, with
      equispaced <tt>bottom</tt> and constant <tt>height</tt>:

      <p><table><tr><td>

m4_include(`bar-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`bar-2.js.txt')

      </script></td></tr></table>

      <p>Thus, with only four properties, a number of different visualizations
      can be expressed. More possibilities are available by using the additional
      top and right properties, as discussed next.

      <h3>Using <tt>top</tt> instead of <tt>bottom</tt>, or <tt>right</tt>
      and <tt>left</tt></h3>

      <p>By defining the <tt>top</tt> instead of <tt>bottom</tt>, the bars are
      flipped vertically:

      <p><table><tr><td>

m4_include(`bar-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`bar-3.js.txt')

      </script></td></tr></table>

      <p>Similarly, using <tt>right</tt> instead of <tt>left</tt> produces
      right-to-left ordering:

      <p><table><tr><td>

m4_include(`bar-4.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`bar-4.js.txt')

      </script></td></tr></table>

      <p>You can even vary which properties are defined on a per-element basis,
      by using a function that returns null if the property is undefined.

      <h3>Using <tt>left</tt> with <tt>right</tt>, or <tt>top</tt>
      with <tt>bottom</tt></h3>

      <p>Sometimes it is desirable to specify the <tt>left</tt>
      and <tt>right</tt> properties concurrently, instead of specifying one in
      conjunction with <tt>width</tt>. This is valid&mdash;for example to make
      insets&mdash;but keep in mind that the <tt>left</tt> property is relative
      to the <i>left</i> edge of the parent panel, while the <tt>right</tt>
      property is relative to the <i>right</i> edge of the parent panel. This
      results in a bar width that is proportional to the panel width, which may
      not be desired. A similar situation occurs with bar height
      when <tt>top</tt> and <tt>bottom</tt> are used together.

      <p>It may be better to pick one property for position
      (e.g., <tt>left</tt>) and another for length (e.g., <tt>width</tt>) and
      then perform subtraction in the length property if necessary, as is done
      in the Gantt chart example above.

      <h2>Style</h2>

      <p>A bar&rsquo;s visual style is specified through three optional
      properties:

      <ul>
      <li><tt>fillStyle</tt> - the fill color.</li>
      <li><tt>strokeStyle</tt> - the stroke color.</li>
      <li><tt>lineWidth</tt> - the stroke thickness.</li>
      </ul>

      <p>By default, a <tt>fillStyle</tt> color is allocated from
      the <tt>category20</tt> <a href="color.html">color palette</a> for each
      mark. The default <tt>strokeStyle</tt> is null, causing the
      related <tt>lineWidth</tt> to be ignored. These visual properties can be
      specified on a per-instance basis, meaning they too can be used to encode
      data visually. For example, to make a rainbow:

      <p><table><tr><td>

m4_include(`bar-5.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`bar-5.js.txt')

      </script></td></tr></table>

      <p>Or, to highlight all data greater than 1:

      <p><table><tr><td>

m4_include(`bar-6.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`bar-6.js.txt')

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
