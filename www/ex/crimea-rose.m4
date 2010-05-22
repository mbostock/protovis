<html>
  <head>
    <title>Protovis - Nightingale's Rose</title>
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
        <a href="wheat.html">&laquo; Previous</a> /
        <a href="hotel.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Nightingale's Rose</h1>

      <iframe style="height:520px;" src="crimea-rose-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="crimea-rose-full.html" target="_blank">View full screen.</a>

      <p><a href="http://en.wikipedia.org/wiki/Florence_Nightingale">Florence
      Nightingale</a> used this <i>rose</i> or <i>coxcomb</i> diagram to
      emphasize the number of deaths due to "preventible or mitigable zymotic
      diseases" in
      the <a href="http://en.wikipedia.org/wiki/Crimean_War">Crimean War</a>.
      Like <a href="antibiotics-burtin.html">Burtin</a>, Nightingale employed a
      polar bar chart, though Nightingale employed a clever ordering of wedges
      by value to minimize occlusion. Color encodes the cause of death: blue is
      disease, red is wounds, and black is uncategorized.

      <p>For comparison, see the same data as a <a target="_blank"
      href="crimea-stacked-area.html">stacked area chart</a>, a <a target="_blank"
      href="crimea-stacked-bar.html">stacked bar chart</a>, a <a target="_blank"
      href="crimea-grouped-bar.html">grouped bar chart</a> and
      a <a target="_blank" href="crimea-line.html">line chart</a>. Which do you
      think best shows the data, and why?

      <blockquote style="font-size:13px;">
        Next: <a href="hotel.html">Bertin's Hotel</a>
      </blockquote>

      <h3>Source</h3>

include(`crimea-rose-full.html.html')

      <h3>Data</h3>

include(`crimea.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
