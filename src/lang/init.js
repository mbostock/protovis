/*
 * Parses the Protovis specifications on load, allowing the use of JavaScript
 * 1.8 function expressions on browsers that only support JavaScript 1.6.
 *
 * @see pv.parse
 */
pv.listen(window, "load", function() {
   /*
    * Note: in Firefox any variables declared here are visible to the eval'd
    * script below. Even worse, any global variables declared by the script
    * could overwrite local variables here (such as the index, `i`)!  To protect
    * against this, all variables are explicitly scoped on a pv.$ object.
    */
    pv.$ = {i:0, x:document.getElementsByTagName("script")};
    for (; pv.$.i < pv.$.x.length; pv.$.i++) {
      pv.$.s = pv.$.x[pv.$.i];
      if (pv.$.s.type == "text/javascript+protovis") {
        try {
          window.eval(pv.parse(pv.$.s.text));
        } catch (e) {
          pv.error(e);
        }
      }
    }
    delete pv.$;
  });
