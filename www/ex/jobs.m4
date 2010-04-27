<html>
  <head>
    <title>Protovis - Job Voyager</title>
    <link type="text/css" rel="stylesheet" href="../style.css?3.1a"/>
    <link type="text/css" rel="stylesheet" href="syntax.css"/>
    <script type="text/javascript" src="../protovis-r3.1.0.js"></script> 
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
        <a href="heatmap.html">&laquo; Previous</a> /
        <a href="minnesota.html">Next &raquo;</a>
      </div>
    </div>

    <div class="body">
      <h1>Job Voyager</h1>

      <iframe id="iframe" style="height:620px;" src="jobs-full.html"></iframe>
      <p><img src="popout.png" width="16" height="16"
      style="padding:0;vertical-align:top;"> <a style="font-size:13px;"
      href="jobs-full.html" target="_blank">View full screen.</a>

      <p>This visualization is a port of the
      Flare <a href="http://flare.prefuse.org/apps/job_voyager">Job Voyager</a>,
      which was in turn inspired by
      the <a href="http://www.babynamewizard.com/voyager">Name Voyager</a>:

      <blockquote style="font-size:13px;">
      This visualization shows stacked time series of reported occupations in
      the United States Labor Force from 1850-2000. The data has been
      normalized: for each census year, the percentage of the polled labor force
      in each occupation is shown. The data is originally from the United States
      Census Bureau and was provided by the University of Minnesota Population
      Center (<a href="http://ipums.org/">ipums.org</a>).
      </blockquote>

      <p>Men are shown in blue; women in red. This version allows you to
      enter <a href="http://en.wikipedia.org/wiki/Regular_expression">regular
      expressions</a> as search patterns. For example, you can view the
      transition
      from <a href="javascript:iframe.search('loco|road')">locomotives to
      automobiles</a>, or compare jobs ending
      in <a href="javascript:iframe.search('ist\\b')">"ist"</a>,
      <a href="javascript:iframe.search('er\\b')">"er"</a>,
      <a href="javascript:iframe.search('ess\\b')">"ess"</a> and
      <a href="javascript:iframe.search('or\\b')">"or"</a>!

      <blockquote style="font-size:13px;">
        Next: <a href="minnesota.html">Minnesota Employment</a>
      </blockquote>

      <h3>Source</h3>

include(`jobs-full.html.html')

      <h3>Data</h3>

      Due to size, the data file is omitted from this
      example. See <a href="jobs.js" target="_blank">jobs.js</a>.

    </div>

    <div class="foot">
      Copyright 2009 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
