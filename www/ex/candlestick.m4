<html>
  <head>
    <title>Protovis - Candlestick Charts</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="syntax.css"/>
    <style type="text/css">
      iframe {
        border: none;
        width: 100%;
      }
      .highlight {
        padding-left: 20px;
        border-left: solid 4px #ccc;
      }
    </style>
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
        <a href="horizon.html">&laquo; Previous</a> /
        <a href="antibiotics-burtin.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Candlestick Charts</h1>

      <iframe style="height:220px;" src="candlestick-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="candlestick-full.html" target="_blank">View full screen.</a>

      <p>Similar to the <i>New York Times</i>' <a href="weather.html">weather
      forecasts</a>,
      a <a href="http://en.wikipedia.org/wiki/Candlestick_chart">candlestick
      chart</a> concisely encodes several dimensions of data into a simple
      glyph. This example shows the performance of the Chicago Board Options
      Exchange <a href="http://en.wikipedia.org/wiki/VIX">Volatility Index</a>
      (<a href="http://finance.yahoo.com/echarts?s=%5EVIX">VIX</a>) in the
      summer of 2009. The thick bar represents the opening and closing prices,
      while the thin bar shows intraday high and low prices; if the index closed
      higher on a given day, the bars are colored <span
      style="color:darkgreen;">green</span> rather than <span
      style="color:darkred;">red</span>.

      <blockquote style="font-size:13px;">
        Next: <a href="antibiotics-burtin.html">Burtin's Antibiotics</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`candlestick-full.html.html')

      <h3>Data</h3>

m4_include(`vix.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
