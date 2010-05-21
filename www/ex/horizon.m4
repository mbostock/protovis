<html>
  <head>
    <title>Protovis - Horizon Graph</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.1a"/>
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
      <h1>Horizon Graph of U.S. Unemployment Rate, 2000-2010</h1>

      <iframe style="height:210px;" src="horizon-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="horizon-full.html" target="_blank">View full screen.</a>

      <p><i>Horizon graphs</i> are a technique for increasing the data
      density of a time-series view while preserving resolution. Here we
      use them to show national unemployment rates as a percentage of the
      labor force. Negative values represent below average employment and
      are shown in <span style="color: red;">red</span>. They are either
      "mirrored" or "offset" to share the same space as positive values,
      which represent above average employment and are shown in <span
      style="color: blue;">blue</span>. The charts can be further divided
      into bands and layered to create a nested form. The resulting charts
      preserve data resolution but use less display space. While horizon
      graphs take some time to learn, they have been found to be more
      effective than standard line and area plots when the chart sizes get
      quite small.</p>

      <p>Data source: <a href="http://www.bls.gov/">U.S. Bureau of Labor Statistics</a></p>

      <h3>Source</h3>

include(`horizon-full.html.html')

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
