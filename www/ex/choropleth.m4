<html>
  <head>
    <title>Choropleth Maps</title>
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
        <a href="oakland.html">&laquo; Previous</a> /
        <a href="symbol.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Choropleth Maps</h1>

      <iframe id="iframe" style="height:480px;" src="choropleth-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="choropleth-full.html" target="_blank">View full screen.</a>
      </p>

      <p>Data is often collected and aggregated by geographical area, such as
      states. A standard approach to communicating this data is to fill the area
      with a solid color, resulting in a <i><a
      href="http://en.wikipedia.org/wiki/Choropleth_map">choropleth
      map</a></i>. Here, we use color to show the prevalence of obesity across
      the U.S.

      <p>Though this technique is a widely used, some care is required. A common
      error is to encode raw data values (such as population) rather than
      normalizing values by area to produce a density map. Another concern is
      the <i><a href="http://en.wikipedia.org/wiki/Contrast_effect">contrast
      effect</a></i>: one&rsquo;s perception of the shaded value is affected
      by the surrounding areas.

      <blockquote style="font-size:13px;">
        Next: <a href="symbol.html">Graduated Symbol Maps</a>
      </blockquote>

      <h3>Source</h3>

m4_include(`choropleth-full.html.html')

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
