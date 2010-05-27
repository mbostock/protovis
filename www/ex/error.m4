<html>
  <head>
    <title>Protovis - Error Bars</title>
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
        <a href="histogram.html">&laquo; Previous</a> /
        <a href="nba.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Error Bars</h1>

      <iframe scrolling="no" style="height:340px;" src="error-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="error-full.html" target="_blank">View full screen.</a>

      <p>Empirical measurements typically have some degree of <i>error</i> or
      <i>uncertainty</i>. For example, if we attempt to measure office
      temperature, our thermometer may inaccurate, our reading of the
      thermometer may be imprecise, and in either case, the temperature inside
      the office is neither constant nor uniform due to air circulation and heat
      exchange. Rather than report just a single reading, we might take many
      readings and report the mean and error.

      <p>To convey the uncertainty of reported measurements, error bars can be
      used in one or two dimensions. Typically, error bars indicate the
      statistical <i><a
      href="http://en.wikipedia.org/wiki/Standard_error_(statistics)">standard
      error</a></i>, using the standard deviation of the sample distribution.

      <blockquote style="font-size:13px;">
        Next: <a href="nba.html">Mean &amp; Deviation</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`error-full.html.html')

      <h3>Data</h3>

m4_include(`error.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
