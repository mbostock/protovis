<html>
  <head>
    <title>Protovis - Dymaxion Map</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="syntax.css"/>
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
      <div class="section selected">
        <a href="./">Examples</a>
      </div>
      <div class="section">
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
      <div class="section">
        <a href="heatmap.html">&laquo; Previous</a> /
        <a href="qqplot.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Dymaxion Map</h1>

      <iframe scrolling="no" style="height:400px;" src="dymax-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="dymax-full.html" target="_blank">View full screen.</a>

      <p>The <a href="http://en.wikipedia.org/wiki/Dymaxion_map">Dymaxion
      map</a>, designed by <a
      href="http://en.wikipedia.org/wiki/Buckminster_Fuller">Buckminster
      Fuller</a>, projects the world onto the surface of an icosahedron. This
      polyhedron is then unfolded to form a two-dimension image with less
      distortion than <a href="projection.html">conventional projections</a>.
      Unusually, the icosahedron can be oriented and unfolded in different ways
      to maintain contiguity in different regions (e.g., land masses or oceans).

      <blockquote style="font-size:13px;">
        Next: <a href="qqplot.html">Q-Q Plots</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`dymax-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="countries.js" target="_blank">countries.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
