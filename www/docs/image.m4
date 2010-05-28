<html>
  <head>
    <title>Protovis - Images</title>
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
      <h1>Images</h1>

      <p>The <b>image</b> mark type represents an axis-aligned rectangle that
      contains an external image, such as a <a
      href="http://en.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a> or
      <a href="http://en.wikipedia.org/wiki/JPEG">JPEG</a>. In addition, the
      image can have a background fill (via <tt>fillStyle</tt>) and foreground
      stroke (via <tt>strokeStyle</tt>). Images can be used as decorative
      elements, backgrounds, or for many other reasons.

      <p>Protovis also supports dynamic image generation using <a
      href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html"
      >HTML5 Canvas</a>&rsquo;s pixel buffer API.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Image.html">pv.Image API reference</a>

        <br>Examples:
        <a href="../ex/heatmap.html">Heatmaps</a>,
        <a href="../ex/life.html">Conway&rsquo;s Game of Life</a>,
        <a href="../ex/bzr.html">Belousov&ndash;Zhabotinsky</a>
      </blockquote>

      <h2>Placement</h2>

      <img src="bar-bhlw.png">

      <p>An image&rsquo;s position and dimensions are specified through some
      combination of properties:

      <ul>
      <li><tt>top</tt> - the distance from the top edge of the parent panel.</li>
      <li><tt>left</tt> - the distance from the left edge of the parent panel.</li>
      <li><tt>bottom</tt> - the distance from the bottom edge of the parent panel.</li>
      <li><tt>right</tt> - the distance from the right edge of the parent panel.</li>
      <li><tt>width</tt> - the width of the image.</li>
      <li><tt>height</tt> - the height of the image.</li>
      </ul>

      <p>Note that these properties are identical to <a href="bar.html">bar</a>.
      For more details and examples of positioning, see the Bar documentation.

      <h2>Style</h2>

      <p>The image itself is specified using the <tt>url</tt> property. For
      example:

      <p><table><tr><td>

m4_include(`image-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`image-1.js.txt')

      </script></td></tr></table>

      <p>An image's visual style can be further specified through three optional
      properties:

      <ul>
      <li><tt>fillStyle</tt> - the background fill color.</li>
      <li><tt>strokeStyle</tt> - the foreground stroke color.</li>
      <li><tt>lineWidth</tt> - the stroke thickness.</li>
      </ul>

      <p>By default, the fill and stroke are null, and the line width is 1.5
      pixels. For example, with a blue glow:

      <p><table><tr><td>

m4_include(`image-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`image-2.js.txt')

      </script></td></tr></table>

      <p>See the <a href="colors.html">color documentation</a> for more examples
      of acceptable values for stroke and fill styles.
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
