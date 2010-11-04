<html>
  <head>
    <title>Protovis - Merge Sort</title>
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
        <a href="stem-and-leaf.html">&laquo; Previous</a> /
        <a href="index-chart.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Merge Sort</h1>

      <iframe scrolling="no" style="height:370px;width:900px;" src="sort-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="sort-full.html" target="_blank">View full screen.</a>

      <p><a href="http://www.cs.princeton.edu/~rs/">Robert Sedgewick</a>
      designed these elegant visualizations of a bottom-up merge sort algorithm,
      published in <i>Algorithms in C</i> (1998). Seven sequential passes to
      sort a 200-element array are shown, with array values encoded using
      angle. The design, reminiscent of wind gusting over tall grasses, allows
      rapid perception of sorted sub-arrays. For comparison, see the same
      visualization applied to <a href="qsort-full.html"
      target="_blank">quicksort</a>.

      <blockquote style="font-size:13px;">
        Next: <a href="index-chart.html">Index Charts</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`sort-full.html.html')

      <h3>Data</h3>

m4_include(`sort.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
