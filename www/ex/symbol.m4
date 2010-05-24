<html>
  <head>
    <title>Graduated Symbol Map</title>
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
        <a href="../api/">Documentation</a>
      </div>
      <div class="section">
        <a href="../protovis.pdf">Paper</a>
      </div>
      <div class="section">
        <a href="http://protovis-js.googlecode.com/files/protovis-3.1.zip">Download</a>
      </div>
    </div>
    <div class="subhead">
      <div class="section">
        <a href="./">Index</a>
      </div>
      <div class="section">
        <a href="choropleth.html">&laquo; Previous</a> /
        <a href="cartogram.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Graduated Symbol Map</h1>

      <iframe id="iframe" style="height:400px;" src="symbol-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="symbol-interactive.html" target="_blank">View full screen.</a>
      </p>

      <p>An alternative to <a href="choropleth.html">choropleth maps</a> is the graduated
      symbol map, which instead places symbols over an underlying map. This approach avoids
      confounding geographic area with data values and allows for more dimensions to be
      visualized (e.g., symbol size, shape, and color). In addition to simple shapes like
      circles, graduated symbol maps may use more complicated glyphs such as pie charts.

      <p>In the example above the total circle size represents a state's population, and
      each slice indicates the proportion of people with a specific BMI rating. The area of
      the entire circle corresponds to the overall population of the state.</p>

      <p>A more complicated example that includes more interaction can be found
      <a href="symbol-interactive.html">here</a>.</p>

      <blockquote style="font-size:13px;">
        Next: <a href="cartogram.html">Dorling Cartogram</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`symbol-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="us_lowres.js" target="_blank">us_lowres.js</a>
      and <a href="us_stats.js" target="_blank">us_stats.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
