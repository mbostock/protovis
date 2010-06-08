/*
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the author nor the names of contributors may be used to
 *   endorse or promote products derived from this software without specific
 *   prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

pv.Ease = (function() {

  function reverse(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }

  function reflect(f) {
    return function(t) {
      return .5 * (t < .5 ? f(2 * t) : (2 - f(2 - 2 * t)));
    };
  }

  function poly(e) {
    return function(t) {
      return t < 0 ? 0 : t > 1 ? 1 : Math.pow(t, e);
    }
  }

  function sin(t) {
    return 1 - Math.cos(t * Math.PI / 2);
  }

  function exp(t) {
    return t ? Math.pow(2, 10 * (t - 1)) - 0.001 : 0;
  }

  function circle(t) {
    return -(Math.sqrt(1 - t * t) - 1);
  }

  function elastic(a, p) {
    var s;
    if (!p) p = 0.45;
    if (!a || a < 1) { a = 1; s = p / 4; }
    else s = p / (2 * Math.PI) * Math.asin(1 / a);
    return function(t) {
      return t <= 0 || t >= 1 ? t
          : -(a * Math.pow(2, 10 * (--t)) * Math.sin((t - s) * (2 * Math.PI) / p));
    };
  }

  function back(s) {
    if (!s) s = 1.70158;
    return function(t) {
      return t * t * ((s + 1) * t - s);
    };
  }

  function bounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t
        : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75
        : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375
        : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
  }

  var quad = poly(2),
      cubic = poly(3),
      elasticDefault = elastic(),
      backDefault = back();

  var eases = {
    "linear": pv.identity,
    "quad-in": quad,
    "quad-out": reverse(quad),
    "quad-in-out": reflect(quad),
    "quad-out-in": reflect(reverse(quad)),
    "cubic-in": cubic,
    "cubic-out": reverse(cubic),
    "cubic-in-out": reflect(cubic),
    "cubic-out-in": reflect(reverse(cubic)),
    "sin-in": sin,
    "sin-out": reverse(sin),
    "sin-in-out": reflect(sin),
    "sin-out-in": reflect(reverse(sin)),
    "exp-in": exp,
    "exp-out": reverse(exp),
    "exp-in-out": reflect(exp),
    "exp-out-in": reflect(reverse(exp)),
    "circle-in": circle,
    "circle-out": reverse(circle),
    "circle-in-out": reflect(circle),
    "circle-out-in": reflect(reverse(circle)),
    "elastic-in": elasticDefault,
    "elastic-out": reverse(elasticDefault),
    "elastic-in-out": reflect(elasticDefault),
    "elastic-out-in": reflect(reverse(elasticDefault)),
    "back-in": backDefault,
    "back-out": reverse(backDefault),
    "back-in-out": reflect(backDefault),
    "back-out-in": reflect(reverse(backDefault)),
    "bounce-in": bounce,
    "bounce-out": reverse(bounce),
    "bounce-in-out": reflect(bounce),
    "bounce-out-in": reflect(reverse(bounce))
  };

  pv.ease = function(f) {
    return eases[f];
  };

  return {
    reverse: reverse,
    reflect: reflect,
    linear: function() { return pv.identity; },
    sin: function() { return sin; },
    exp: function() { return exp; },
    circle: function() { return circle; },
    elastic: elastic,
    back: back,
    bounce: bounce,
    poly: poly
  };
})();
