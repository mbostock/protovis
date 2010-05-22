<html>
  <head>
    <title>Protovis - Burtin's Antibiotics</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="syntax.css"/>
    <script type="text/javascript" src="../protovis-r3.2.js"></script>
  </head>
  <body>

    <div class="title">
      <div class="subtitle">
        A graphical toolkit for visualization
      </div>
      <a href="../">Protovis</a><
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
        <a href="napoleon.html">&laquo; Previous</a> /
        <a href="barley.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Burtin's Antibiotics</h1>

      <iframe style="border:solid 1px #aaa;height:800px;"
      src="antibiotics-burtin-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="antibiotics-burtin-full.html" target="_blank">View full screen.</a>

      <p>After World War II, antibiotics earned the moniker &ldquo;wonder
      drugs&rdquo; for quickly treating previously-incurable diseases. Data was
      gathered to determine which drug worked best for each bacterial
      infection. Comparing drug performance was an enormous aid for
      practitioners and scientists alike. In the fall of
      1951, <a href="http://en.wikipedia.org/wiki/Will_Burtin">Will Burtin</a>
      published this graph showing the effectiveness of three popular
      antibiotics on 16 different bacteria, measured in terms
      of <a href="http://en.wikipedia.org/wiki/Minimum_inhibitory_concentration">minimum
      inhibitory concentration</a>.

      <p>Recreating this display revealed some minor errors in
      the <a href="http://graphics8.nytimes.com/images/2008/06/01/books/heller-1.jpg"
      target="_blank">original</a>: a missing grid line at 0.01 &mu;g/ml, and an
      exaggeration of some values for penicillin.

      <blockquote style="font-size:13px;">
        Next: <a href="barley.html">Becker's Barley</a>
      </blockquote>

      <h3>Source</h3>

include(`antibiotics-burtin-full.html.html')

      <h3>Data</h3>

include(`antibiotics.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
