<html>
  <head>
    <title>Protovis - Pie &amp; Donut Charts</title>
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
        <a href="dot.html">&laquo; Previous</a> /
        <a href="line.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Pie &amp; Donut Charts</h1>

      <div style="float:left;width:400px;">
      <iframe style="height:400px;" src="pie-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="pie-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:400px;">
      <a href="http://protovis-js.googlecode.com/svn/trunk/examples/pie.html"
      target="_blank">Pie charts</a> are useful for performing relative
      comparisons: how do the parts make up the whole? A more legible
      alternative is the donut chart, as shown here. Mouseover to compare the
      two chart designs.

      <p>Both pie and donut charts are made
      using <a href="http://code.google.com/p/protovis-js/wiki/PvWedge">wedges</a>,
      which can also be used to make other sorts of visualizations, as we saw in
      the <a href="sunburst.html">sunburst</a>, <a href="antibiotics-burtin.html">Burtin's
      antibiotics</a> and <a href="clock.html">PolarClock</a> examples.

      <p>Note that we sort the data in descending order, so that by convention
      the largest wedge starts at 12 o'clock.

      <blockquote style="font-size:13px;">
        Next: <a href="line.html">Line &amp; Step Charts</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

include(`pie-full.html.html')

      <h3>Data</h3>

include(`pie.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
