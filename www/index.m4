<html>
  <head>
    <title>Protovis</title>
    <link type="text/css" rel="stylesheet" href="style.css?3.2"/>
    <link type="text/css" rel="stylesheet" href="ex/syntax.css?3.2"/>
    <script type="text/javascript" src="protovis-r3.2.js"></script>
  </head>
  <body>

    <div class="title">
      <div class="subtitle">
        A graphical toolkit for visualization
      </div>
      Protovis
    </div>

    <div class="head">
      <div class="section selected">
        Overview
      </div>
      <div class="section">
        <a href="ex/">Examples</a>
      </div>
      <div class="section">
        <a href="docs/">Documentation</a>
      </div>
      <div class="section">
        <a href="http://protovis-js.googlecode.com/files/protovis-3.2.zip">Download</a>
      </div>
    </div>

    <div class="body">
      <div style="float:left;width:260px;">
        <h3>Gallery</h3>
        <a href="ex/force.html" class="item">
          <img src="ex/force-sm.png?3.2" width="200" height="180">
          Force-Directed Layout
        </a>
        <a href="ex/stream.html" class="item">
          <img src="ex/stream-sm.png?3.2" width="200" height="180">
          Streamgraphs
        </a>
        <a href="ex/cars.html" class="item">
          <img src="ex/cars-sm.png?3.2" width="200" height="180">
          Parallel Coordinates
        </a>
        <br clear="all">
        <a style="font-size:13px;" href="ex/">More examples &raquo;</a>

        <h3>Download</h3>
        <a style="font-size:13px;"
        href="http://protovis-js.googlecode.com/files/protovis-3.2.zip">protovis-3.2.zip (774 KB)</a>
      </div>

      <div style="float:left;width:640px;">
        <h1>
          <div class="subtitle">A graphical approach to visualization</div>
          Protovis
        </h1>

        Protovis composes custom views of data with simple marks such
        as <a href="http://code.google.com/p/protovis-js/wiki/PvBar">bars</a>
        and <a href="http://code.google.com/p/protovis-js/wiki/PvDot">dots</a>.
        Unlike low-level graphics libraries that quickly become tedious for
        visualization, Protovis defines marks through dynamic properties that
        encode data, allowing
        <a href="http://code.google.com/p/protovis-js/wiki/MarkInheritance">inheritance</a>,
        <a href="http://code.google.com/p/protovis-js/wiki/PvScale">scales</a>
        and <a href="http://code.google.com/p/protovis-js/wiki/PvLayout">layouts</a>
        to simplify construction.

        <p>Protovis is free and open-source, provided under
        the <a href="http://www.opensource.org/licenses/bsd-license.php">BSD
        License</a>. It uses JavaScript
        and <a href="http://www.w3.org/Graphics/SVG/">SVG</a> for web-native
        visualizations; no plugin required (though you will need a modern web
        browser)! Although programming experience is helpful, Protovis is
        mostly declarative and designed to be learned <a href="ex/">by
        example</a>.

        <p>This project is led by <a
        href="http://graphics.stanford.edu/~mbostock/">Mike Bostock</a> and <a
        href="http://hci.stanford.edu/jheer/">Jeff Heer</a> of the <a
        href="http://vis.stanford.edu/">Stanford Visualization Group</a>, with
        significant help from <a
        href="http://vadim.ogievetsky.com/">Vadim Ogievetsky</a>. We welcome
        your <a href="http://gitorious.org/protovis/">contributions</a> and <a
        href="http://groups.google.com/group/protovis">suggestions</a>.

        <blockquote class="button">
          <a href="http://protovis-js.googlecode.com/files/protovis-3.2.zip">
            <div>protovis-3.2.zip (774 KB)</div>
            Download Protovis 3.2 &raquo;
          </a>
        </blockquote>

        <br>
        <h2>Updates</h2>

        <style type="text/css">
          .update { text-indent: -20px; margin-left: 20px; }
          .highlight { width: 300px; }
        </style>

        <p class="update"><i>May 28, 2010</i> - ZOMG! Release 3.2 is finally
        available! Enjoy the powerful new layouts and the variety of new
        examples in the gallery. We've also moved from SVN to <a
        href="http://gitorious.org/protovis">Gitorious</a> to make it easier for
        you to participate in development!

        <p class="update"><i>October 1, 2009</i> - Release 3.1 is available,
        including minor bug fixes. We've also spruced up the home page and
        examples gallery in anticipation
        of <a href="http://vis.computer.org/VisWeek2009/">VisWeek 2009</a>.

        <p class="update"><i>September 19, 2009</i> - Release 3.0 is available,
        including major performance improvments, bug fixes, and handy utilities
        such as scales and layouts. We've also moved all the documentation to
        <a href="http://code.google.com/p/protovis-js/w/list">the wiki</a> so
        that we can more easily keep it up-to-date. New tutorials, examples, and
        documentation are available, and more is on the way.

        <p class="update"><i>July 16, 2009</i> - Release 2.6 is available,
        including ~2,800 lines of API documentation and numerous bug fixes.

        <p class="update"><i>April 9, 2009</i> - First release on Google Code.</p>

        <br>
        <h2>Getting Started</h2>

        How does Protovis work? Consider this bar chart, which visually encodes
        an array of numbers with height:

        <p><table><tr><td>
m4_include(`bar-chart.js.html')
        </td><td width="150">
          <img src="ex/bar-chart.png?3.0" width="150" height="150">
        </td></tr></table>

        <p>This blue bar is rendered once per number, mapping the data to height
        using a little function (<tt>d * 80</tt>). Thus, a <i>mark</i>
        represents a <i>set</i> of graphical elements that share data and visual
        encodings. Although marks are simple by themselves, you can combine them
        in interesting ways to
        make <a href="ex/flowers.html">rich</a>, <a href="ex/jobs.html">interactive</a>
        visualizations.

        <p>To simplify construction, Protovis supports panels and inheritance. A
        <i><a href="api/Panel.html">panel</a></i> is a container for replicating
        marks.
        <i><a href="http://code.google.com/p/protovis-js/wiki/MarkInheritance">Inheritance</a></i>
        lets you derive new marks from existing ones, sharing some or all of the
        properties. For example, here we derive labels for a rule and bar:

        <p><table><tr><td>
m4_include(`bar-chart2.js.html')
        </td><td width="150">
          <img src="ex/bar-chart2.png?3.0" width="150" height="150">
        </td></tr></table></blockquote>

        <p>The rule's label inherits the <tt>data</tt> and <tt>bottom</tt>
        property, causing it to appear on the rule and render the value (datum)
        as text. The bar's label uses the bottom
        <a href="http://code.google.com/p/protovis-js/wiki/PvAnchor">anchor</a>
        to tweak positioning, so that the label is centered at the bottom of the
        bar.

        <p>Want to learn more? Peruse our <a href="ex/">examples</a>
        and <a href="docs/">documentation</a>.
      </div>
      <br clear="all">
    </div>

    <div class="foot">
      Copyright 2010 <a href="http://vis.stanford.edu">Stanford Visualization Group</a>
    </div>

    <script type="text/javascript" src="http://www.google-analytics.com/ga.js"></script>
    <script type="text/javascript">_gat._getTracker("UA-10741907-2")._trackPageview();</script>
  </body>
</html>
