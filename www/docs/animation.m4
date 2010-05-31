<html>
  <head>
    <title>Protovis - Animation</title>
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
      <h1>Animation</h1>

      <p>Description forthcoming.

      <h3>Example</h3>

      <p><table><tr><td>

m4_include(`animation-1.js.html')

      </td><td align="right"><script type="text/javascript+protovis">

m4_include(`animation-1.js.txt')

      </script></td></tr></table>

      <h2>Types of Animation</h2>

      <p><b>Time-based animation.</b>  This happens outside of Protovis using
      <tt>setInterval</tt> or <tt>setTimeout</tt> to trigger re-rendering. Of
      course, depending on how this is implemented it may be too inefficient to
      rebuild the entire visualization; we may want to be smart about which
      properties to re-evaluate and which graphical elements to re-render.

      <p><i>Example</i>: Twitter messages containing the word
      &ldquo;morning&rdquo; by location and time for a given day; highway
      traffic over time; evolution of social network over time; etc.

      <p><b>Animated transitions.</b> Given two computed states of a
      visualization (scene graphs), it&rsquo;s often desirable to generate a
      smooth transition between the two states. For example, you might fade in
      new marks, interpolate colors, or interpolate locations.

      <p><i>Example</i>: recompute the PolarClock time once per second, but
      animate the transitions between updates so the wedges &ldquo;bounce&rdquo;
      like physical clock parts.
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
