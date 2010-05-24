<html>
  <head>
    <title>Protovis - Anderson's Flowers</title>
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
        <a href="caltrain.html">&laquo; Previous</a> /
        <a href="stem-and-leaf.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Anderson's Flowers</h1>

      <iframe style="height:705px;" src="flowers-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="flowers-full.html" target="_blank">View full screen.</a>

      <p>A matrix of <a href="dot.html">scatterplots</a> is well-suited to
      visualize Edgar Anderson's data on <a
      href="http://en.wikipedia.org/wiki/Iris_flower_data_set">Iris flowers in
      the Gasp&eacute; Peninsula</a>. Here we can easily see how the three
      species of Iris cluster in any two dimensions: sepal width, sepal length,
      petal width and petal length. <i>Iris setosa</i> is shown with a red dot,
      <i>versicolor</i> in green and <i>virginica</i> in blue.  Note that some
      of the data points overlap; alpha blending improves perceptibility of
      colocated dots.

      <p>This style of chart is modeled after
      R's <a href="http://code.google.com/p/protovis-js/wiki/PairsPlot"><tt>pairs</tt>
      plot</a>.

      <blockquote style="font-size:13px;">
        Next: <a href="stem-and-leaf.html">Stem-and-Leaf</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`flowers-full.html.html')

      <h3>Data</h3>

m4_include(`flowers.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
