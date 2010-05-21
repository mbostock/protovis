<html>
  <head>
    <title>Protovis - Stacked Graph of Unemployed U.S. Workers</title>
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
        <a href="http://protovis-js.googlecode.com/files/protovis-3.2.zip">Download</a>
      </div>
    </div>
    <div class="subhead">
      <div class="section">
        <a href="./">Index</a>
      </div>
      <div class="section">
        <a href="barley.html">&laquo; Previous</a> /
        <a href="weather.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Stacked Graph of Unemployed U.S. Workers by Industry</h1>

      <iframe style="height:480px;" src="unemployed-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="unemployed-full.html" target="_blank">View full screen.</a>

      <p>By stacking area charts on top of each other, we arrive at a visual 
      summation of time-series values &mdash; a <i>stacked graph</i>. Stacked 
      graphs (sometimes called <i>stream graphs</i>) depict aggregate patterns 
      and often support drill-down into a subset of individual series. This 
      example shows the number of unemployed workers in the United States over 
      the last decade, subdivided by industry.</p>

      <p>Data source: <a href="http://www.bls.gov/">U.S. Bureau of Labor Statistics</a></p>

      <h3>Source</h3>

include(`unemployed-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this example.
      See <a href="unemployment.js" target="_blank">unemployment.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
