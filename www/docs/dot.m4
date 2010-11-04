<html>
  <head>
    <title>Protovis - Dots</title>
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
      <h1>Dots</h1>

      <p>The <b>dot</b> mark type represents a symbol that can be stroked (via
      <tt>strokeStyle</tt>) and sometimes filled (via <tt>fillStyle</tt>). Dots are used most
      frequently for scatterplots, but are also useful for annotating data
      points in other types of visualization, such as line charts and area
      charts.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Dot.html">pv.Dot API reference</a>

        <br>Examples:
        <a href="../ex/dot.html">Scatterplots</a>,
        <a href="../ex/flowers.html">Anderson&rsquo;s Flowers</a>,
        <a href="../ex/bubble.html">Bubble Charts</a>
      </blockquote>

      <h2>Placement</h2>

      <img src="dot-bl.png">

      <p>A dot's position and dimensions are specified through some combination
      of properties:

      <ul>
      <li><tt>top</tt> - the distance from the top edge of the parent panel to the dot center.</li>
      <li><tt>left</tt> - the distance from the left edge of the parent panel to the dot center.</li>
      <li><tt>bottom</tt> - the distance from the bottom edge of the parent panel to the dot center.</li>
      <li><tt>right</tt> - the distance from the right edge of the parent panel to the dot center.</li>
      <li><tt>size</tt> - the size (proportional to area) of the dot.</li>
      </ul>

      <p>Note that the first four properties together over-specify the position
      of the dot. In practice, only two (orthogonal) properties should be
      specified. This section looks at some examples.

      <h3>Using <tt>left</tt> and <tt>bottom</tt></h3>

      <p>The most common combination of parameters is <tt>left</tt>
      and <tt>bottom</tt>. In the typical bivariate (i.e., <i>x</i>
      and <i>y</i>) incarnation, each property visually encodes one dimension of
      the data. For example, a simple scatterplot:

      <p><table><tr><td>

m4_include(`dot-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`dot-1.js.txt')

      </script></td></tr></table>

      <p>It is also possible to use dots with univariate (one-dimensional)
      data. In this case, one property is positioned at regular intervals based
      on the data index, while the other encodes the data. For example, using
      equispaced <tt>left</tt> (calculated using the automatic <tt>index</tt>
      variable) and variable <tt>bottom</tt>, in conjunction
      with <a href="rule.html">rules</a>, produces a popsicle forest:

      <p><table><tr><td>

m4_include(`dot-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`dot-2.js.txt')

      </script></td></tr></table>

      <p>The <tt>size</tt> property, which defaults to 20, provides an
      additional non-stylistic encoding dimension to the scatterplot:

      <p><table><tr><td>

m4_include(`dot-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`dot-3.js.txt')

      </script></td></tr></table>

      <p>Occlusion is frequently an issue with large, filled dots. This can be
      mitigated by drawing the largest dots first&mdash;a simple sort of the
      data. Alpha blending can also be used:

      <p><table><tr><td>

m4_include(`dot-4.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`dot-4.js.txt')

      </script></td></tr></table>

      <h3>Using <tt>top</tt> instead of <tt>bottom</tt>, or <tt>right</tt>
      instead of <tt>left</tt></h3>

      <p>By defining the <tt>top</tt> parameter instead of <tt>bottom</tt>, the
      dots are flipped vertically:

      <p><table><tr><td>

m4_include(`dot-5.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`dot-5.js.txt')

      </script></td></tr></table>

      <p>Similarly, using <tt>right</tt> instead of <tt>left</tt> flips
      horizontally:

      <p><table><tr><td>

m4_include(`dot-6.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`dot-6.js.txt')

      </script></td></tr></table>

      <p>The choice of <tt>bottom</tt> and <tt>left</tt> is suitable for the
      typical case of positive values in the I quadrant of the <a
      href="http://en.wikipedia.org/wiki/Cartesian_coordinate_system#Quadrants_and_octants"
      >Cartesian coordinate system</a>.

      <h2>Style</h2>

      <p>A dot&rsquo;s visual style is specified through four optional properties:

      <ul>
      <li><tt>shape</tt> - the type of shape (e.g., "circle", "triangle", "square").</li>
      <li><tt>strokeStyle</tt> - the stroke color.</li>
      <li><tt>lineWidth</tt> - the stroke thickness.</li>
      <li><tt>fillStyle</tt> - the fill color.</li>
      </ul>

      <p>By default, a <tt>strokeStyle</tt> color is allocated from
      the <tt>category10</tt> <a href="color.html">color palette</a>. The
      default <tt>fillStyle</tt> is null, and the default <tt>lineWidth</tt> is
      1.5. The default shape is "circle"; other supported shapes include
      "triangle", "diamond", "cross" and "square". These visual parameters can
      be specified on a per-instance basis, meaning they too can be used to
      encode data visually.

      <p>Although it is generally advisable to use colors and shapes sparingly,
      as together they can confound the perception of data patterns, it is
      possible to use these parameters to make lucky charms:

      <p><table><tr><td>

m4_include(`dot-7.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`dot-7.js.txt')

      </script></td></tr></table>
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
