pv.Scales.dateTime = function(min, max) {
  return new pv.Scales.DateTimeScale(min, max);
}

/**
 * DateTimeScale DateTimeScale scales time data.
 */
pv.Scales.DateTimeScale = function(min, max) {
  pv.Scales.Scale.call(this);

  this._min = min;
  this._max = max;
};

pv.Scales.DateTimeScale.prototype = pv.extend(pv.Scales.Scale);

// Accessor method for min
pv.Scales.DateTimeScale.prototype.min = function(x) {
  if (x == undefined) {
    return this._min;
  } else {
    this._min = x;
    return this;
  }
};

// Accessor method for max
pv.Scales.DateTimeScale.prototype.max = function(x) {
  if (x == undefined) {
    return this._max;
  } else {
    this._max = x;
    return this;
  }
};

// Normalizes DateTimeScale value
pv.Scales.DateTimeScale.prototype.normalize = function(x) {
  var eps = pv.Scales.epsilon;
  var range = this._max - this._min;

  return (range < eps && range > -eps) ? 0 : (x - this._min) / range;
};

// Un-normalizes the value
pv.Scales.DateTimeScale.prototype.unnormalize = function(n) {
  return n * (this._max - this._min) + this._min;
};

// Checks if the mapped interval contains x
pv.Scales.DateTimeScale.prototype.contains = function(x) {
  var t = x.valueOf();
  return (t >= this._min.valueOf() && t <= this._max.valueOf());
};

// Sets min/max values to "nice" values
pv.Scales.DateTimeScale.prototype.nice = function() {
  var span  = this.span(this._min, this._max);
  this._min = this.round(this._min, span, false);
  this._max = this.round(this._max, span, true);
};

// Returns a list of rule values
pv.Scales.DateTimeScale.prototype.ruleValues = function() {
  var min  = this._min.valueOf(), max = this._max.valueOf();
  var span = this.span(this._min, this._max);
  var step = this.step(this._min, this._max, span);
  var list = [];

  var d = this._min;
  if (span < pv.Scales.DateTimeScale.Span.MONTHS) {
    while (d.valueOf() <= max) {
      list.push(d);
      d = new Date(d.valueOf()+step);
    }
  } else if (span == pv.Scales.DateTimeScale.Span.MONTHS) {
    // TODO: Handle quarters
    step = 1;
    while (d.valueOf() <= max) {
      list.push(d);
      d = new Date(d);
      d.setMonth(d.getMonth() + step);
    }
  } else { // Span.YEARS
    step = 1;
    while (d.valueOf() <= max) {
      list.push(d);
      d = new Date(d);
      d.setFullYear(d.getFullYear() + step);
    }
  }

  return list;
};

// Time Span Constants
pv.Scales.DateTimeScale.Span = {};
pv.Scales.DateTimeScale.Span.YEARS        =  0;
pv.Scales.DateTimeScale.Span.MONTHS       = -1;
pv.Scales.DateTimeScale.Span.DAYS         = -2;
pv.Scales.DateTimeScale.Span.HOURS        = -3;
pv.Scales.DateTimeScale.Span.MINUTES      = -4;
pv.Scales.DateTimeScale.Span.SECONDS      = -5;
pv.Scales.DateTimeScale.Span.MILLISECONDS = -6;
pv.Scales.DateTimeScale.Span.WEEKS        = -10;
pv.Scales.DateTimeScale.Span.QUARTERS     = -11;

// Rounds the date
pv.Scales.DateTimeScale.prototype.round = function(t, span, roundUp) {
  var Span = pv.Scales.DateTimeScale.Span;
  var d = t, bias = roundUp ? 1 : 0;

  if (span > Span.YEARS) {
    d = new Date(t.getFullYear() + bias, 0);
  } else if (span == Span.MONTHS) {
    d = new Date(t.getFullYear(), t.getMonth() + bias);
  } else if (span == Span.DAYS) {
    d = new Date(t.getFullYear(), t.getMonth(), t.getDate() + bias);
  } else if (span == Span.HOURS) {
    d = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours() + bias);
  } else if (span == Span.MINUTES) {
    d = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes() + bias);
  } else if (span == Span.SECONDS) {
    d = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds() + bias);
  } else if (span == Span.MILLISECONDS) {
    d = new Date(d.time + (roundUp ? 1 : -1));
  } else if (span == Span.WEEKS) {
    bias = roundUp ? 7 - d.day : -d.day;
    d = new Date(t.getFullYear(), t.getMonth(), t.getDate() + bias);
  }
  return d;
};

// Returns the span of the given min/max values
pv.Scales.DateTimeScale.prototype.span = function(min, max) {
  var MS_MIN = 60*1000, MS_HOUR = 60*MS_MIN, MS_DAY = 24*MS_HOUR, MS_WEEK = 7*MS_DAY;
  var Span = pv.Scales.DateTimeScale.Span;
  var span = max.valueOf() - min.valueOf();
  var days = span / MS_DAY;

  // TODO: handle Weeks/Quarters
  if (days >= 365*2) return (1 + max.getFullYear()-min.getFullYear());
  else if (days >= 60) return Span.MONTHS;
  else if (span/MS_WEEK > 1) return Span.WEEKS;
  else if (span/MS_DAY > 1) return Span.DAYS;
  else if (span/MS_HOUR > 1) return Span.HOURS;
  else if (span/MS_MIN > 1) return Span.MINUTES;
  else if (span/1000.0 > 1) return Span.SECONDS;
  else return Span.MILLISECONDS;
}

// Returns the step for the scale
pv.Scales.DateTimeScale.prototype.step = function(min, max, span) {
  var Span = pv.Scales.DateTimeScale.Span;

  if (span > Span.YEARS) {
    var exp = Math.round(Math.log(Math.max(1,span-1)/Math.log(10))) - 1;
    return Math.pow(10, exp);
  } else if (span == Span.MONTHS) {
    return 0;
  } else if (span == Span.WEEKS) {
    return 7*24*60*60*1000;
  } else if (span == Span.DAYS) {
    return 24*60*60*1000;
  } else if (span == Span.HOURS) {
    return 60*60*1000;
  } else if (span == Span.MINUTES) {
    return 60*1000;
  } else if (span == Span.SECONDS) {
    return 1000;
  } else {
    return 1;
  }
};
