<html>
  <head>
    <title>Protovis - Brush + Link</title>
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
        <a href="transform.html">&laquo; Previous</a> /
        <a href="tipsy.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Brush + Link</h1>

      <iframe scrolling="no" style="height:705px;" src="brush-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="brush-full.html" target="_blank">View full screen.</a>

      <p>Here we add interactivity to the earlier <a href="flowers.html"
      >scatterplot matrix</a> of Edgar Anderson&rsquo;s data on Iris flowers.
      Click and drag with the mouse (<i>brushing</i>) to create a selection.
      Matching samples in the other views will be highlighted (<i>linking</i>).
      This method of interaction is used heaviy by statistical tools such as <a
      href="http://www.ggobi.org/demos/brushing-simple.html">GGobi</a>.

      <blockquote style="font-size:13px;">
        Next: <a href="tipsy.html">Tooltips</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`brush-full.html.html')

      <h3>Data</h3>

m4_include(`flowers.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
