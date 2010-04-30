<html>
  <head>
    <title>Protovis - CalTrain Timetable</title>
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
      <h1>CalTrain Timetable</h1>

      <iframe id="iframe" style="height:760px;" src="caltrain-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="caltrain-interactive.html" target="_blank">View full screen.</a>
      </p>

      <p>This example displays the <a href="http://www.caltrain.com/timetable.html">CalTrain Timetable</a> in the style of <a href="http://en.wikipedia.org/wiki/%C3%89tienne-Jules_Marey">E. J. Marey’s</a> <a href="marey-train-schedule.jpg">graphical train schedule</a>.
      Arrivals and departures from a station are indicated by the horizontal lines. Stations are separated in proportion to their actual distance apart.
      The slope of the line reflects the speed of the train: the more nearly vertical the line, the faster the train.</p>
      <p>A more complicated example that includes more interaction can be found <a href="caltrain-interactive.html">here</a>.</p>

      <blockquote style="font-size:13px;">
        Next: <a href="treemap.html">Treemap</a>
      </blockquote>

      <h3>Source</h3>

include(`caltrain-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="caltrain.js" target="_blank">caltrain.js</a>.

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
