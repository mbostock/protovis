<html>
  <head>
    <title>Protovis - Rainbow Worm</title>
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
        <a href="clock.html">&laquo; Previous</a> /
        <a href="./">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Rainbow Worm</h1>

      <iframe scrolling="no" style="height:465px;" src="segmented-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="segmented-full.html" target="_blank">View full screen.</a>

      <p>This psychedelic example, reminiscent of an <a
      href="http://en.wikipedia.org/wiki/Earthworm">earthworm</a>, demonstrates
      the difference between a segmented and unsegmented <a
      href="http://protovis-js.googlecode.com/svn/trunk/jsdoc/symbols/pv.Line.html">line</a>.
      Normally, the line width and stroke style of a line are fixed properties:
      they are evaluated once, and the line is rendered with the given width and
      color. However, in some visualizations&mdash;such as <a
      href="napoleon.html">flow maps</a>&mdash;it is desirable to use a variable
      width and color to encode additional dimensions of data.

      <p><a href="segmented-area.html" target="_blank">Segmented areas</a> are
      also possible, allowing the fill color and title tooltip to vary across
      the area.

      <h3>Source</h3>

m4_include(`segmented-full.html.html')

      <h3>Data</h3>

      This example has no data, making it a meaningless (though fun) visualization!

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
