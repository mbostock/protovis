<html>
  <head>
    <title>Protovis - Index Chart</title>
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
      <h1>Index Chart of Technology Stocks, 2000-2010</h1>

      <iframe style="height:400px;" src="index-chart-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="index-chart-full.html" target="_blank">View full screen.</a>

      <p>With some forms of time-series data, raw values are less important than
	  relative changes. Consider investors, who are more interested in a stock's 
      growth rate than its specific price. Multiple stocks may have dramatically 
      different baseline prices, but be meaningfully compared when normalized. 
      An <i>index chart</i> is an interactive line chart that shows percentage 
      changes for a collection of time-series based on a selected index point. 
      In this example, we see the percentage change of selected stock prices 
      according to the day of purchase. For January 2005, one can see the rocky 
      rise enjoyed by those who invested in Amazon, Apple, or Google at that 
      time. Mouse over a point in the chart to change the reference month.</p>

      <p>Data source: <a href="http://finance.yahoo.com/">Yahoo! 
      Finance</a></p>

      <h3>Source</h3>

include(`index-chart-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="stocks.js" target="_blank">stocks.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
