pv.Format.time = function(type) {

  /** @private */
  function format(t) {
    t = Number(t); // force conversion from Date
    switch (type) {
      case "short": {
        if (t >= YEARS) {
          return (t / YEARS).toFixed(1) + " years";
        } else if (t >= WEEKS) {
          return (t / WEEKS).toFixed(1) + " weeks";
        } else if (t >= DAYS) {
          return (t / DAYS).toFixed(1) + " days";
        } else if (t >= HOURS) {
          return (t / HOURS).toFixed(1) + " hours";
        } else if (t >= MINUTES) {
          return (t / MINUTES).toFixed(1) + " minutes";
        }
        return (t / SECONDS).toFixed(1) + " seconds";
      }
      case "long": {
        var a = [],
            s = ((t % MINUTES) / SECONDS) >> 0,
            m = ((t % HOURS) / MINUTES) >> 0;
        a.push(padz2(s));
        if (t >= HOURS) {
          var h = ((t % DAYS) / HOURS) >> 0;
          a.push(padz2(m));
          if (t >= DAYS) {
            a.push(padz2(h));
            a.push(Math.floor(t / DAYS).toFixed());
          } else {
            a.push(h.toFixed());
          }
        } else {
          a.push(m.toFixed());
        }
        return a.reverse().join(":");
      }
    }
  }

  format.parse = function(s) {
    switch (type) {
      case "short": {
        var re = /([0-9,.]+)\s*([a-z]+)/g, a, t = 0;
        while (a = re.exec(s)) {
          var f = parseFloat(a[0].replace(",", "")), u = 0;
          switch (a[2].toLowerCase()) {
            case "year": case "years": u = YEARS; break;
            case "week": case "weeks": u = WEEKS; break;
            case "day": case "days": u = DAYS; break;
            case "hour": case "hours": u = HOURS; break;
            case "minute": case "minutes": u = MINUTES; break;
            case "second": case "seconds": u = SECONDS; break;
          }
          t += f * u;
        }
        return t;
      }
      case "long": {
        var a = s.replace(",", "").split(":").reverse(), t = 0;
        if (a.length) t += parseFloat(a[0]) * SECONDS;
        if (a.length > 1) t += parseFloat(a[1]) * MINUTES;
        if (a.length > 2) t += parseFloat(a[2]) * HOURS;
        if (a.length > 3) t += parseFloat(a[3]) * DAYS;
        return t;
      }
    }
  }

  return format;
};
