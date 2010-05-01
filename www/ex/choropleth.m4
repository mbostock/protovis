<html>
  <head>
    <title>Choropleth</title>
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
        <a href="oakland.html">&laquo; Previous</a> /
        <a href="treemap.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Choropleth</h1>

      <iframe id="iframe" style="height:400px;" src="choropleth-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="choropleth-interactive.html" target="_blank">View full screen.</a>
      </p>

      <p>Present of population classified as "Obese" (Body Mass Index in excess of 30), by state.
      Press the "Play" button to watch the obesity epidemic evolve from 1995 onwards, or drag the slider to a particular year of interest.</p>
      <p>A more complicated example that includes more interaction can be found <a href="choropleth-interactive.html">here</a>.</p>

      <blockquote style="font-size:13px;">
        Next: <a href="treemap.html">Treemap</a>
      </blockquote>

      <h3>Source</h3>

include(`choropleth-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="us_lowres.js" target="_blank">us_lowres.js</a>
      and <a href="us_stats.js" target="_blank">us_stats.js</a>.

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
