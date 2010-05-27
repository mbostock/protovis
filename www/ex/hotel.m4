<html>
  <head>
    <title>Protovis - Bertin&rsquo;s Hotel</title>
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
        <a href="barley.html">&laquo; Previous</a> /
        <a href="stream.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Bertin&rsquo;s Hotel</h1>

      <div style="float:left;width:520px;">
      <iframe scrolling="no" style="width:520px;height:520px;" src="hotel-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="hotel-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:350px;">
      <a href="http://en.wikipedia.org/wiki/Jacques_Bertin">Jacques Bertin</a>,
      one of the founding researchers of information visualization, used this
      small multiples bar chart to reveal seasonal patterns in guests staying at
      a hotel. Twenty metrics for twelve months are shown, repeated to assist
      the identification of annual cycles. Black bars emphasize values above the
      mean, allowing the eye to resolve groups; these were then hypothesized as
      &ldquo;active and slow periods&rdquo;, &ldquo;discovery factors&rdquo;,
      and &ldquo;recovery factors&rdquo;.

      <blockquote style="font-size:13px;">
        Next: <a href="stream.html">Streamgraphs</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`hotel-full.html.html')

      <h3>Data</h3>

m4_include(`hotel.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
