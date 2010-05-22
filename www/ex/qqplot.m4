<html>
  <head>
    <title>Protovis - Quantile-Quantile Plot</title>
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
        <a href="http://protovis-js.googlecode.com/files/protovis-3.2.zip">Download</a>
      </div>
    </div>
    <div class="subhead">
      <div class="section">
        <a href="./">Index</a>
      </div>
      <div class="section">
        <a href="barley.html">&laquo; Previous</a> /
        <a href="weather.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Q-Q Plot of Mechanical Turk Participation Rates</h1>

      <iframe style="height:400px;" src="qqplot-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="qqplot-full.html" target="_blank">View full screen.</a>

	  <p><i>Quantile-Quantile (or Q-Q) plots</i> compare two probability 
      distributions by graphing their
      <a href="http://en.wikipedia.org/wiki/Quantile"
      title="Wikipedia: Quantile">quantiles</a> against each other. If the two 
      are similar, the plotted values will roughly lie along the central 
      diagonal. If the two are linearly related, values will again lie along a 
      line, though with varying slope and intercept. This example shows 
      Mechanical Turk participation data compared to three statistical 
      distributions. Note how the data forms three distinct components when 
      compared to uniform and normal (Gaussian) distributions: this suggests 
      that a statistical model with three components might be more 
      appropriate, and indeed we see in the final plot that a fitted mixture 
      of three normal distributions provides a better fit.</p>

      <h3>Source</h3>

m4_include(`qqplot-full.html.html')

      <h3>Data</h3>

m4_include(`turkers.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
