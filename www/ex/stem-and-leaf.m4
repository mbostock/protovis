<html>
  <head>
    <title>Protovis - Stemplots</title>
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
        <a href="caltrain.html">&laquo; Previous</a> /
        <a href="index-chart.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Stemplots</h1>

      <div style="float:left;width:240px;">
      <iframe style="height:460px;" src="stem-and-leaf-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="stem-and-leaf-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:630px;">
      Stemplots use the clever arrangement of text to convey the distribution of
      data: an alternative to a <a href="histogram.html">histogram</a>. Although
      originally designed for monospaced text displays, such as typewriters and
      computer terminals, they still find use today for train schedules and
      other applications that seek quick scanning and efficient use of space.

      <p>Here we show <a
      href="http://www.caltrain.com/timetable.html">CalTrain</a> weekday arrival
      times. The minutes of each northbound and southbound arrival are placed to
      the left and right, respectively, of their corresponding hour. The time is
      colored to indicate whether the train service is <span style="color:
      rgba(34,34,34,1);">normal</span>, <span style="color: rgba(183,116,9,1);">
      limited</span> or <span style="color: rgba(196,62,29,1);">bullet</span>.
      Peak times of morning and evening rush hour can be seen by increased
      activity.

      <blockquote style="font-size:13px;">
        Next: <a href="index-chart.html">Index Charts</a>
      </blockquote>

      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`stem-and-leaf-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this example. See <a
      href="caltrain.js" target="_blank">caltrain.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
