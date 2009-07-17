/*
 * Parses the Protovis specifications on load, allowing the use of JavaScript
 * 1.8 function expressions on browsers that only support JavaScript 1.6.
 *
 * @see pv#parse
 */
window.addEventListener("load", function() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].type == "text/javascript+protovis") {
        try {
          pv.Panel.$dom = scripts[i];
          window.eval(pv.parse(scripts[i].textContent));
        } catch (ignored) {}
        delete pv.Panel.$dom;
      }
    }
  }, false);
