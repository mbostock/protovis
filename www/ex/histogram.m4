<html>
  <head>
    <title>Protovis - Histograms</title>
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
      <h1>Histograms</h1>

      <div style="float:left;width:460px;">
      <iframe style="height:340px;" src="histogram-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="histogram-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:410px;">
      A <i><a href="http://en.wikipedia.org/wiki/Histogram">histogram</a></i> is
      a common graphical representation of a one-dimensional frequency
      distribution. The height of each bar encodes the freqency of an interval,
      such as the number of samples of <i>x</i> where 1.5 &le; <i>x</i> &lt;
      1.6. A histogram may alternatively show probabilities instead: the
      relative proportion of samples in each interval.

      <p>The appearance of a histogram is often heavily affected by the number
      of binning intervals, which can be easily specified in Protovis using the
      <tt>bins</tt> method. Bins are typically the same width, but non-uniform
      bins are also possible.

      <blockquote style="font-size:13px;">
        Next: <a href="error.html">Error Bars</a>
      </blockquote>
      </div>
      <br clear="all">

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
