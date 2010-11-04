<html>
  <head>
    <title>Protovis - Anchors</title>
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
      <h1>Anchors</h1>

      <p><b>Anchors</b> are well-named positions on the perimeter of an existing
      mark. They can be used to place labels, dots, lines, and other adjacent
      marks.

      <blockquote>
        See also:
        <a href="../jsdoc/symbols/pv.Anchor.html">pv.Anchor API reference</a>
      </blockquote>

      <h3>Anchors with Area</h3>

      <p>For example, say we want to emphasize the edge of an area. While this
      can be done using the <tt>strokeStyle</tt> parameter, it may not produce the
      desired effect; this strokes the entire perimeter of the area, whereas we
      might want only the upper boundary of the area stroked. Instead, we can
      succinctly deriving a line, and optionally a dot, using anchors:

      <p><table><tr><td>

m4_include(`anchor-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`anchor-1.js.txt')

      </script></td></tr></table>

      <p>Horizontally-oriented areas support a top anchor and a bottom anchor,
      shown here in green and red respectively:

      <p><table><tr><td>

m4_include(`anchor-2.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`anchor-2.js.txt')

      </script></td></tr></table>

      <p>If we added another area to the top anchor, we could reproduce the
      stacked area chart shown previously. Alternatively, we can add the new
      area to the bottom anchor, producing a different visualization:

      <p><table><tr><td>

m4_include(`anchor-3.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`anchor-3.js.txt')

      </script></td></tr></table>

      <p>Note that the bottom anchor need not be a straight line. If the
      original area has a variable bottom, the bottom anchor will adjust
      appropriately. This can be used to produce yet another style
      of <a href="../ex/stack.html">stacked area chart</a>, sometimes referred
      to as a <a href="../ex/stream.html">streamgraph</a>:

      <p><table><tr><td>

m4_include(`anchor-4.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`anchor-4.js.txt')

      </script></td></tr></table>

      <p>Of course, it may be better to use the
      stack <a href="layout.html">layout</a> rather than use anchors to achieve
      this design.

      <p>Vertically-oriented areas similarly provide two anchors, right and
      left. This time we demonstrate the use of anchors with lines rather than
      dots:

      <p><table><tr><td>

m4_include(`anchor-5.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`anchor-5.js.txt')

      </script></td></tr></table>

      <p>While it is always possible to specify the location of related marks
      explicitly, this section shows that anchors are usually the most
      convenient choice.

      <h3>Anchors with Bar</h3>

      <p>Here is a reimplementation of an example from the <a href="label.html"
      >label documentation</a>, using the top anchor:

      <p><table><tr><td>

m4_include(`anchor-6.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`anchor-6.js.txt')

      </script></td></tr></table>

      <p>What took a handful of lines of code earlier now takes only one
      line. Note that in addition the position, anchors can specify reasonable
      defaults for text placement as well. The top anchor for a bar uses
      centered text a top baseline. Any number of labels (or other types of
      marks) can be associated with any anchor. The following diagram shows four
      of the available anchors for bars:

      <p><table><tr><td>

m4_include(`anchor-7.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`anchor-7.js.txt')

      </script></td></tr></table>

      <h3>Anchors with Dot</h3>

      <p>The behavior for <a href="dot.html">dots</a> is equivalent to bars:

      <p><table><tr><td>

m4_include(`anchor-8.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`anchor-8.js.txt')

      </script></td></tr></table>

      <p>Here is an example of using the right anchor on a scatterplot:

      <p><table><tr><td>

m4_include(`anchor-9.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`anchor-9.js.txt')

      </script></td></tr></table>

      <h3>Anchors with Wedge</h3>

      <p>Similarly, labels on a donut chart are easy with anchors, when they
      would be quite tricky to implement by hand. In this example note that we
      forego the use of <tt>pv.normalize</tt> and instead precompute the scale
      factor, so that the label displays the original data value:

      <p><table><tr><td>

m4_include(`anchor-10.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`anchor-10.js.txt')

      </script></td></tr></table>
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
