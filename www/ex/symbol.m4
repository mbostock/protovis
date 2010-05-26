<html>
  <head>
    <title>Symbol Maps</title>
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
        <a href="choropleth.html">&laquo; Previous</a> /
        <a href="cartogram.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Symbol Maps</h1>

      <iframe id="iframe" style="height:460px;" src="symbol-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="symbol-full.html" target="_blank">View full screen.</a>
      </p>

      <p>An alternative to the <a href="choropleth.html">choropleth map</a> is
      the <i>graduated symbol map</i>, which places symbols over an underlying
      map.  This approach avoids confounding geographic area with data values
      and allows for more dimensions to be visualized (<i>e.g.</i>, symbol size,
      shape, and color). In addition to simple shapes like circles, graduated
      symbol maps may use more complicated glyphs such as <a href="pie.html">pie
      charts</a>.

      <p>In this example, the total circle size represents a state&rsquo;s
      population, and each slice indicates the proportion of people within a
      given BMI category.

      <blockquote style="font-size:13px;">
        Next: <a href="cartogram.html">Dorling Cartogram</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`symbol-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="us_lowres.js" target="_blank">us_lowres.js</a>
      and <a href="us_stats.js" target="_blank">us_stats.js</a>.

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
