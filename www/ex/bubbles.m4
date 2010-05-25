<html>
  <head>
    <title>Protovis - Bubbles</title>
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
        <a href="sort.html">&laquo; Previous</a> /
        <a href="eyes.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Bubbles</h1>

      <div style="float:left;width:200px;">
      <script type="text/javascript+protovis">

var vis = new pv.Panel()
    .width(200)
    .height(200)
    .fillStyle("#222")
    .strokeStyle("#aaa");

vis.add(pv.Panel)
    .data(pv.range(0, 201, 20))
    .left(function(x) x)
  .add(pv.Panel)
    .data(pv.range(0, 201, 20))
    .top(function(y) y)
  .add(pv.Dot)
    .fillStyle("rgba(255, 255, 255, .5)")
    .strokeStyle(null)
    .size(function() this.mouse().length());

vis.render();
pv.listen(self, "mousemove", function() vis.render());

      </script>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="bubbles-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:640px;">
      This example is adapted from the
      Processing <a href="http://processing.org/learning/basics/distance2d.html">Distance
      2D</a> example. We demonstrate an equivalent technique for computing the
      distance from the panel to the mouse
      using <tt><a href="http://protovis-js.googlecode.com/svn/trunk/jsdoc/symbols/pv.Mark.html#mouse">pv.Mark#mouse</a></tt>. One
      benefit of a pure-JavaScript approach is that user interface events that
      happen outside of the canvas&mdash;such as mouse movement&mdash;can still
      be captured by visualization.

      <blockquote style="font-size:13px;">
        Next: <a href="eyes.html">Eyes</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`bubbles-full.html.html')

      <h3>Data</h3>

      This example has no data, making it a meaningless (though fun) visualization!

    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
