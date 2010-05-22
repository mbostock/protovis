<html>
  <head>
    <title>Protovis - Bertin's Hotel</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="syntax.css"/>
    <style type="text/css">
      iframe {
        border: none;
        width: 100%;
      }
      .highlight {
        padding-left: 20px;
        border-left: solid 4px #ccc;
      }
    </style>
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
        <a href="crimea-rose.html">&laquo; Previous</a> /
        <a href="napoleon.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Bertin's Hotel</h1>

      <div style="float:left;width:520px;">
      <iframe style="width:520px;height:520px;" src="hotel-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="hotel-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:300px;">
      <a href="http://en.wikipedia.org/wiki/Jacques_Bertin">Jacques
      Bertin</a>, one of the founding researchers of information visualization,
      used this small multiples bar chart to reveal seasonal patterns in guests
      staying at a hotel. Twenty metrics for twelve months are shown, repeated
      to assist the identification of annual cycles. Black bars emphasize values
      above the mean, allowing the eye to resolve groups; these were then
      hypothesized as "active and slow periods", "discovery factors", and
      "recovery factors".

      <blockquote style="font-size:13px;">
        Next: <a href="napoleon.html">Minard's Napoleon</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

include(`hotel-full.html.html')

      <h3>Data</h3>

include(`hotel.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
