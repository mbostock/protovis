<html>
  <head>
    <title>Protovis - Area Charts</title>
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
        <a href="cars.html">&laquo; Previous</a> /
        <a href="bar.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Area Charts</h1>

      <div style="float:left;width:430px;">
      <iframe style="height:225px;" src="area-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="area-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:410px;">
      This simple area chart is constructed using
      an <a href="http://code.google.com/p/protovis-js/wiki/PvArea">area</a>
      mark, with an
      added <a href="http://code.google.com/p/protovis-js/wiki/PvLine">line</a>
      for emphasis on the top
      edge. Next, <a href="http://code.google.com/p/protovis-js/wiki/PvRule">rules</a>
      and <a href="http://code.google.com/p/protovis-js/wiki/PvLabel">labels</a>
      are added for reference values.

      <p>Although this example is basic, it provides a good starting point for
      adding more complex features. For
      instance, <a href="http://code.google.com/p/protovis-js/wiki/ScaleInvert">mouseover
      interaction</a> can be added to allow precise reading of data values. Or
      multiple series of data can be added to produce
      a <a href="http://protovis-js.googlecode.com/svn/trunk/examples/area-stacked.html"
      target="_blank">stacked area chart</a>.

      <blockquote style="font-size:13px;">
        Next: <a href="bar.html">Bar &amp; Column Charts</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

include(`area-full.html.html')

      <h3>Data</h3>

include(`area.js.html')

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
