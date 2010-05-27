<html>
  <head>
    <title>Protovis - Pan + Zoom</title>
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
        <a href="zoom.html">&laquo; Previous</a> /
        <a href="brush.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Pan + Zoom</h1>

      <iframe scrolling="no" style="height:550px;" src="transform-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="transform-full.html" target="_blank">View full screen.</a>

      <p>Panels in Protovis support simple geometric transformations natively,
      allowing panning and zooming when coupled with the corresponding
      behaviors. Drag with the mouse to pan, and use the mousewheel to zoom, in
      the above scatterplot. This example uses the native transforms to update
      the scales&rsquo; domains dynamically.

      <blockquote style="font-size:13px;">
        Next: <a href="brush.html">Brush + Link</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`transform-full.html.html')

      <h3>Data</h3>

m4_include(`transform.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
