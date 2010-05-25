<html>
  <head>
    <title>Protovis - Eyes</title>
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
        <a href="bubbles.html">&laquo; Previous</a> /
        <a href="clock.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Eyes</h1>

      <div style="float:left;width:200px;">
      <script type="text/javascript+protovis">

        var vis = new pv.Panel()
            .width(200)
            .height(200)
            .fillStyle("#666")
            .strokeStyle("#ccc");

        vis.add(pv.Panel)
            .data([{x:50, y:16, r:40},
                   {x:64, y:85, r:20},
                   {x:90, y:200, r:60},
                   {x:150, y:44, r:20},
                   {x:175, y:120, r:40}])
            .left(function(d) d.x)
            .top(function(d) d.y)
          .add(pv.Dot)
            .fillStyle("#fff")
            .strokeStyle(null)
            .size(function(d) d.r * d.r)
          .add(pv.Dot)
            .def("v", function(d) {
              var m = this.mouse();
              return (m.length() > d.r / 2) ? m.norm().times(d.r / 2) : m;
            })
            .fillStyle("#aaa")
            .left(function(d) this.v().x)
            .top(function(d) this.v().y)
            .size(function(d) d.r * d.r / 4);

        vis.render();
        pv.listen(self, "mousemove", function() vis.render());

      </script>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="eyes-full.html" target="_blank">View full screen.</a>
      </div>

      <div style="float:left;padding-left:30px;width:640px;">
      This example is adapted from the
      Processing <a href="http://processing.org/learning/basics/arctangent.html">Arctangent</a>
      example. We demonstrate an equivalent technique for computing the vector
      from the dot center to the mouse
      using <tt><a href="http://protovis-js.googlecode.com/svn/trunk/jsdoc/symbols/pv.Mark.html#mouse">pv.Mark#mouse</a></tt>.

      <blockquote style="font-size:13px;">
        Next: <a href="clock.html">PolarClock</a>
      </blockquote>
      </div>
      <br clear="all">

      <h3>Source</h3>

m4_include(`eyes-full.html.html')

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
