<html>
  <head>
    <title>Dorling Cartogram</title>
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
        <a href="symbol.html">&laquo; Previous</a> /
        <a href="projection.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Dorling Cartogram</h1>

      <iframe id="iframe" style="height:430px;" src="cartogram-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="cartogram-interactive.html" target="_blank">View full screen.</a>
      </p>

      <p>Cartograms distort the shape of geographic regions so that the area directly encodes
      a data variable. A common example is to redraw every country in the world sizing it
      proportionally to population or GDP. Many types of cartograms have been created; in
      this example we use the Dorling cartogram, which represents each geographic region with
      a sized circle, placed so as to resemble the true geographic configuration.
      <p>In the above cartogram the absolute number of obese people per state and percentage of
      obese people, represented with circle area and color respectively. California dominates
      the map due to its large population size, while color indicates that Mississippi and Alabama
      are the states with the highest obesity rate.</p>
      <p>A more complicated example that includes more interaction can be found
      <a href="cartogram-interactive.html">here</a>.</p>

      <blockquote style="font-size:13px;">
        Next: <a href="projection.html">Map Projections</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`cartogram-full.html.html')

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
