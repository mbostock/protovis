window.addEventListener("load", function() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].type == "text/javascript+protovis") {
        try {
          pv.$dom = scripts[i];
          eval(pv.parse(scripts[i].textContent));
        } catch (ignored) {}
        delete pv.$dom;
      }
    }
  }, false);
