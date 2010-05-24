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
        <a href="nbody.html">&laquo; Previous</a> /
        <a href="bubbles.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Merge Sort</h1>

      <iframe id="iframe" style="height:370px;width:900px;" src="sort-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="sort-full.html" target="_blank">View full screen.</a>

      <p>7 sequential passes to sort a 200-element array in bottom-up merge
      sort. Excellent sparkline-like graphics from Robert Sedgewick,
      <i>Algorithms in C</i> (1998).

      <p>For comparison have a look at the same visualization technique applied to <a href="qsort-full.html">QuickSort</a> (with breadth first traversal).

      <blockquote style="font-size:13px;">
        Next: <a href="bubbles.html">Bubbles</a>
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
