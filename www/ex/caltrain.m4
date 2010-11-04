<html>
  <head>
    <title>Protovis - Marey&rsquo;s Trains</title>
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
        <a href="weather.html">&laquo; Previous</a> /
        <a href="stem-and-leaf.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Marey&rsquo;s Trains</h1>

      <iframe style="border:solid 4px #ccc;height:720px;"
      src="caltrain-full.html"></iframe><p><img src="popout.png" width="16"
      height="16" style="padding:0;vertical-align:top;"> <a
      style="font-size:13px;" href="caltrain-full.html" target="_blank">View
      full screen.</a> </p>

      <p>This example recreates the <a
      href="http://www.caltrain.com/timetable.html">CalTrain timetable</a> in
      the style of <a
      href="http://en.wikipedia.org/wiki/%C3%89tienne-Jules_Marey">E. J. Marey</a>&rsquo;s
      <a href="marey-train-schedule.jpg" target="_blank">graphical
      schedule</a>. Stations are separated vertically in proportion to
      geography; thus, the slope of the line reflects the actual speed of the
      train: the steeper the line, the faster the train. This display also
      reveals when and where <span style="color:rgb(183,116,9);">limited
      service</span> trains are passed by <span
      style="color:rgb(192,62,29);">baby bullets</span>.

      <blockquote style="font-size:13px;">
        Next: <a href="stem-and-leaf.html">Stemplots</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`caltrain-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="caltrain.js" target="_blank">caltrain.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
