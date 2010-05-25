<html>
  <head>
    <title>Protovis - Streamgraphs</title>
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
        <a href="hotel.html">&laquo; Previous</a> /
        <a href="sparklines.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Streamgraphs</h1>

      <iframe style="width:900px;height:400px;" src="stream-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="stream-full.html" target="_blank">View full screen.</a>

      <p>Streamgraphs are a generalization of <a href="stack.html">stacked area
      graphs</a> where the baseline is free. By shifting the baseline, it is
      possible to minimize the change in slope (or &ldquo;wiggle&rdquo;) in
      individual series, thereby making it easier to perceive the thickness of
      any given layer across the data. Byron &amp; Wattenberg describe several
      streamgraph algorithms in <a
      href="http://www.leebyron.com/else/streamgraph/">&ldquo;Stacked
      Graphs&mdash;Geometry &amp; Aesthetics&rdquo;</a>, several of which are
      implemented by <tt>pv.Layout.Stack</tt>. As additional examples, see
      stacked graphs of <a href="jobs.html">employment</a> and <a
      href="http://hci.stanford.edu/jheer/files/zoo/ex/time/stack.html">unemployment</a>
      statistics.

      <blockquote style="font-size:13px;">
        Next: <a href="sparklines.html">Sparklines</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`stream-full.html.html')

      <h3>Data</h3>

m4_include(`stream.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
