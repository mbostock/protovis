<html>
  <head>
    <title>Protovis - How-To: Scale Interaction</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="../ex/syntax.css?3.2"/>
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
      <div class="section">
        <a href="../ex/">Examples</a>
      </div>
      <div class="section selected">
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
        <a href="start.html">&laquo; Previous</a> /
        <a href="invert.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>How-To: Scale Interaction</h1>

      <p>Let&rsquo;s add some useful interaction to the simple <a
      href="../ex/line.html">line chart</a> included with the example
      gallery. The goal is that when the user mouses over the plot, we highlight
      the closest point in the data with a dot, as well as showing the exact
      value. (You may have already seen an example of this interaction technique
      with the <a href="../ex/minnesota.html">Minnesota Employment</a> example.)

      <h3>With a Single Series</h3>

      <p>The data associated with the line is an array of <i>xy</i>-coordinates.
      So the first thing we need is a global <tt>i</tt> to store the index of the
      coordinates nearest the mouse. It can default to -1, indicating that the
      mouse is not over the visualization:

m4_include(`invert-1.js.html')

      <p>Next, we need to add a dot to the line, highlighting the value closest
      to the mouse&rsquo;s <i>x</i>-coordinate:

m4_include(`invert-2.js.html')

      <p>Note that the dot is invisible if <tt>i</tt> is negative (the default
      value of -1). The data is a single-element array containing the
      <i>xy</i>-coordinate closest to the mouse; by doing it this way, we can
      inherit all of the other properties from the line. Most importantly, we
      inherit the <tt>bottom</tt> and <tt>left</tt> properties which place the
      dot in the desired position. We also use <a href="chaining.html">property
      chaining</a> to set the fill color of the dot to match the line&rsquo;s
      stroke color.

      <p>We might also want to add a second dot to the visualization in the
      lower-left corner, accompanied by a label showing the value of
      the <i>y</i>-coordinate. That can be done simply as:

m4_include(`invert-3.js.html')

      <p>Lastly, we need to specify event handlers to wire everything up.
      Ideally, we could add those directly to the root panel and be done with
      it, but there are some minor flickering issues caused by child elements.
      So for now, we use an invisible bar to capture the events flicker-free:

m4_include(`invert-4.js.html')

      <p>Let&rsquo;s look more closely at what these event handlers are doing.

      <p>The job of the &ldquo;mouseout&rdquo; event handler is to clear the
      global <tt>i</tt>, by setting it to -1. It then returns <tt>vis</tt> which
      causes the root panel to be re-rendered. We could equivalently
      call <tt>vis.render()</tt>.

      <p>The &ldquo;mouseover&rdquo; event handler requires slightly more work:
      given the mouse position, it needs to calculate the index of the closest
      <i>xy</i>-coordinate in the data. This requires two steps: first, the
      mouse&rsquo;s <i>x</i>-coordinate is <a
      href="../jsdoc/symbols/pv.Scale.linear.html#invert">inverted</a>, mapping
      the pixel location back into a value along the <i>x</i>-axis. Second, we
      perform a <a href="../jsdoc/symbols/pv.html#.search">binary search</a> on
      the data, finding the index of the closest <i>xy</i>-coordinate. Note that
      this requires the data array to be sorted by <i>x</i>-coordinate. Lastly,
      because <tt>pv.search</tt> will return a negative number if the exact
      value is not found, we invert the value to set <tt>i</tt> as the insertion
      point. (See the API reference for details.)

      <p>Putting everything together:

      <p><script type="text/javascript+protovis">(function(){

m4_include(`invert-8.js.txt')

      })();</script>

      <h3>With Multiple Series</h3>

      <p>The above example works great with a single series, but what if we have
      multiple series of data? In that case, the data will be a two-dimensional
      array (an array of series, where each series in an array
      of <i>xy</i>-coordinates), and a <a href="panel.html">panel</a> to
      replicate our line for each series:

m4_include(`invert-5.js.html')

      <p>Our line will be added to this panel, rather than the root
      <tt>vis</tt>, so that it gets replicated. Thus, since our mouseover dot is
      added to the line, it too is automatically moved to the child panel.
      However, notice that the <tt>data</tt> property for the mouseover dot was
      computed using the global variable <tt>data</tt>. In this case,
      we&rsquo;ll need to be more specific and reference the data for each
      series. But since the series is the datum for the child panel, this is
      trivial:

m4_include(`invert-6.js.html')

      <p>There will now be multiple labels in the lower-left corner, as well. So
      we&rsquo;ll need to offset the bottom position so they don&rsquo;t
      overlap, like so:

m4_include(`invert-7.js.html')

      <p>Lastly, we&rsquo;ll need to update the &ldquo;mouseover&rdquo; event
      handler slightly, since <tt>data</tt> is now a two-dimensional array. If
      we assume that the <i>x</i>-coordinates for our data are the same for all
      series, we can simply replace the reference to <tt>data</tt> with
      <tt>data[0]</tt> (the first series). If our data had different
      <i>x</i>-coordinates per series, note that we&rsquo;d need multiple
      <tt>i</tt> indexes as well, and we&rsquo;d need to do a separate binary
      search per series.

      <p>Putting it all together:

      <p><script type="text/javascript+protovis">(function(){

m4_include(`invert-9.js.txt')

      })();</script>
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
