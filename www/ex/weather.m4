<html>
  <head>
    <title>Protovis - Seattle Weather</title>
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
        <a href="driving.html">&laquo; Previous</a> /
        <a href="caltrain.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Seattle Weather</h1>

      <div style="float:left;width:200px;">
      <iframe style="width:200px;height:250px;" src="weather-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="weather-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:670px;">
      Another compelling information display from <i>The New York Times</i>,
      this weekly weather forecast is rich with information: it shows the range
      of record, normal, actual and forecast temperatures (along with error
      bars!) for each day. The design is similar to a <a
      href="candlestick.html">candlestick chart</a>. Here we recreate the
      display for a recent week in Seattle.

      <blockquote style="font-size:13px;">
        Next: <a href="caltrain.html">Marey&rsquo;s Trains</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`weather-full.html.html')

      <h3>Data</h3>

m4_include(`weather.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
