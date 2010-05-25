<html>
  <head>
    <title>Protovis - Bullet Charts</title>
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
        <a href="sparklines.html">&laquo; Previous</a> /
        <a href="bubble.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Bullet Charts</h1>

      <div style="float:left;width:520px;">
      <iframe style="height:350px;" src="bullet-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="bullet-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:350px;">
      Designed by <a
      href="http://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf"
      >Stephen Few</a>, a bullet chart &ldquo;provides a rich display of data in
      a small space.&rdquo; A variation on a <a href="bar.html">bar chart</a>,
      bullet charts compare a given quantitative measure (such as profit or
      revenue) against qualitative ranges (e.g., <span
      style="color:#333;">poor</span>, <span
      style="color:#666;">satisfactory</span>, <span style="color:#999;"
      >good</span>) and related markers (e.g., <script
      type="text/javascript+protovis">

new pv.Panel()
    .width(12)
    .height(12)
  .anchor("center").add(pv.Dot)
    .strokeStyle("black")
    .shape("triangle")
  .root.render();

      </script>, the same measure a year ago).

      <p>The bullet layout in Protovis is based
      on <a href="http://projects.instantcognition.com/protovis/bulletchart/">an
      earlier implementation</a> by Clint Ivy and Jamie Love.</p>

      <blockquote style="font-size:13px;">
        Next: <a href="bubble.html">Bubble Charts</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`bullet-full.html.html')

      <h3>Data</h3>

m4_include(`bullet.js.html')

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
