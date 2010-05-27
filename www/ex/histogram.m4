<html>
  <head>
    <title>Protovis - Histogram</title>
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
        <a href="box-and-whisker.html">&laquo; Previous</a> /
        <a href="error.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Box and Whisker</h1>

      <div style="float:left;width:360px;">
      <iframe id="iframe" style="height:360px;" src="histogram-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="histogram-full.html" target="_blank">View full screen.</a>
      </div>

      <p>Histograms are a common way of graphically displaying a frequency distribution.
      the data is binned and then bars are drawn with variables heights (and sometimes
      widths, if the bin sizes are not uniform) so that the area of the bar represents
      the number of results that fall into its bin.

      <p>Histograms are often used to show the color distribution in a photograph and
      in quality control.

      <blockquote style="font-size:13px;">
        Next: <a href="error.html">2D Errors</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`histogram-full.html.html')

      <h3>Data</h3>

m4_include(`histogram.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
