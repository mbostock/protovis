(function() {
  function center() {
    var svgs = document.getElementsByTagName("svg");
    for (var i = 0; i < svgs.length; i++) {
      var span = svgs[i].parentNode;
      span.style.position = "absolute";
      span.style.left = (window.innerWidth - span.offsetWidth) / 2;
      span.style.top = (window.innerHeight - span.offsetHeight) / 2;
    }
  }
  pv.listen(window, "load", center);
  pv.listen(window, "resize", center);
})();
