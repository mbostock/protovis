<html>
  <head>
    <title>Protovis - Seattle Weather</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.1a"/>
    <link type="text/css" rel="stylesheet" href="syntax.css"/>
    <script type="text/javascript" src="../protovis-r3.1.0.js"></script> 
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
        <a href="flowers.html">&laquo; Previous</a> /
        <a href="oakland.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Seattle Weather</h1>

      <iframe style="width:200px;height:250px;" src="weather-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="weather-full.html" target="_blank">View full screen.</a>

      <p><i><a href="http://www.nytimes.com">The New York Times</a></i>
      regularly publishes compelling information displays online and in
      print. Even their weekly weather forecast is rich with information,
      showing the range of record, normal, actual and forecast temperatures
      (along with error bars!)  for each day. Here we recreate the display for a
      recent week in Seattle.

      <blockquote style="font-size:13px;">
        Next: <a href="oakland.html">Oakland Crimespotting</a>
      </blockquote>

      <h3>Source</h3>

include(`weather-full.html.html')

      <h3>Data</h3>

include(`weather.js.html')

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
