<html>
  <head>
    <title>Protovis - Horizon Graphs</title>
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
        <a href="bubble.html">&laquo; Previous</a> /
        <a href="candlestick.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Horizon Graphs</h1>

      <iframe style="height:120px;" src="horizon-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="horizon-full.html" target="_blank">View full screen.</a>

      <p>Horizon graphs increase data density while preserving resolution. Here
      we show national unemployment rates as a percentage of the labor force
      from 2000 to 2010, courtesy of the <a
      href="http://www.bls.gov/">U.S. Bureau of Labor Statistics</a>. <span
      style="color:brown;">Negative values</span> represent below-average
      employment and are either "mirrored" or "offset" to share the same space
      as <span style="color:steelblue;">positive values</span>, which represent
      above-average employment.

      <p>While horizon graphs may require learning, they have been found to be
      more effective than standard line and area plots when chart sizes are
      small. For more, see "<a
      href="http://vis.berkeley.edu/papers/horizon/">Sizing the Horizon</a>: The
      Effects of Chart Size and Layering on the Graphical Perception of Time
      Series Visualizations" by Heer et al., CHI 2009.

      <blockquote style="font-size:13px;">
        Next: <a href="candlestick.html">Candlestick Charts</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`horizon-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this example. See <a
      href="unemployment.js" target="_blank">unemployment.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
