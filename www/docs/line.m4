<html>
  <head>
    <title>Protovis - Lines</title>
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
      <h1>Lines</h1>

      <p>The <b>line</b> mark type represents a series of connected line
      segments, sometimes called a <i>polyline</i>, that can be stroked
      (via <tt>strokeStyle</tt>). Lines are used most frequently for line
      charts, but are also useful in conjunction with other marks in other types
      of visualization, such as area charts.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Line.html">pv.Line API reference</a>

        <br>Examples:
        <a href="../ex/line.html">Line &amp; Step Charts</a>,
        <a href="../ex/sparklines.html">Sparklines</a>,
        <a href="../ex/cars.html">Parallel Coordinates</a>
      </blockquote>

      <h2>Placement</h2>

      <img src="line-bl.png">

      <p>A line&rsquo;s placement is specified through some combination of
      attributes:

      <ul>
      <li><tt>top</tt> - the distance from the top edge of the parent panel to the line center.</li>
      <li><tt>left</tt> - the distance from the left edge of the parent panel to the line center.</li>
      <li><tt>bottom</tt> - the distance from the bottom edge of the parent panel to the line center.</li>
      <li><tt>right</tt> - the distance from the right edge of the parent panel to the line center.</li>
      </ul>

      <p>Note that the properties together over-specify the position of the
      line. In practice, only two (orthogonal) properties should be specified;
      the choice of which two is provided for convenience. This section looks at
      some examples.

      <h3>Using <tt>left</tt> and <tt>bottom</tt></h3>

      <p>In the simplest univariate incarnation, one property is positioned at
      regular intervals based on the data index, and the other visually encodes
      the data. For example, using equispaced left (calculated using the
      automatic <tt>index</tt> variable) and variable bottom produces a standard
      line chart:

      <p><table><tr><td>

m4_include(`line-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`line-1.js.txt')

      </script></td></tr></table>

      <p>In some cases, it may be desired to annotate the data points generating
      the line with <a href="dot.html">dots</a>. This can be done with a simple call
      to <tt>add(pv.Dot)</tt>, since lines and dots are placed using the same
      parameters:

      <p><table><tr><td>

m4_include(`line-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`line-2.js.txt')

      </script></td></tr></table>

      <p>The <tt>left</tt> property does not need to be equispaced, and thus can
      be used to specify alternative visualization types, like radar plots. For
      example, an Archimedean spiral:

      <p><table><tr><td>

m4_include(`line-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`line-3.js.txt')

      </script></td></tr></table>

      <h3>Using <tt>top</tt> instead of <tt>bottom</tt>, or <tt>right</tt> instead of <tt>left</tt></h3>

      <p>By defining the <tt>top</tt> property instead of <tt>bottom</tt>, the
      line is flipped vertically:

      <p><table><tr><td>

m4_include(`line-4.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`line-4.js.txt')

      </script></td></tr></table>

      <p>Similarly, using <tt>right</tt> instead of <tt>left</tt> flips
      horizontally:

      <p><table><tr><td>

m4_include(`line-5.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`line-5.js.txt')

      </script></td></tr></table>

      <p>The choice of <tt>bottom</tt> and <tt>left</tt> is suitable for the
      typical case of positive values in the I quadrant of the <a
      href="http://en.wikipedia.org/wiki/Cartesian_coordinate_system#Quadrants_and_octants"
      >Cartesian coordinate system</a>.

      <h3>Using <tt>segmented</tt></h3>

      <p><table><tr><td>

m4_include(`line-6.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`line-6.js.txt')

      </script></td></tr></table>

      <p>Description forthcoming.

      <h3>Using <tt>interpolate</tt></h3>

      <p><table><tr><td>

m4_include(`line-7.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`line-7.js.txt')

      </script></td></tr></table>

      <p>Description forthcoming.

      <h2>Style</h2>

      <p>A line&rsquo;s visual style is specified through two optional properties:

      <ul>
      <li><tt>strokeStyle</tt> - the stroke color.</li>
      <li><tt>lineWidth</tt> - the stroke thickness.</li>
      </ul>

      <p>By default, a <tt>strokeStyle</tt> color is allocated from
      the <tt>category10</tt> <a href="color.html">color palette</a>. The
      default <tt>fillStyle</tt> is null, and the default <tt>lineWidth</tt> is
      1.5. Unlike some other marks, these properties cannot be specified on a
      per-instance basis. TODO: that is, unless the <tt>segmented</tt> property
      is set to true.

      <p>Here is an example of some thick lines in various colors:

      <p><table><tr><td>

m4_include(`line-8.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`line-8.js.txt')

      </script></td></tr></table>

      <h3>Using <tt>fillStyle</tt></h3>

      <p><table><tr><td>

m4_include(`line-9.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`line-9.js.txt')

      </script></td></tr></table>

      <p>Description forthcoming.

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
