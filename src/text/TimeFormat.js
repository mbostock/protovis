/**
 * Returns a time format of the given type, either "short" or "long".
 *
 * @class Represents a time format, converting between a <tt>number</tt>
 * representing a duration in milliseconds, and a <tt>string</tt>. Two types of
 * time formats are supported: "short" and "long". The <i>short</i> format type
 * returns a string such as "3.3 days" or "12.1 minutes", while the <i>long</i>
 * format returns "13:04:12" or similar.
 *
 * @extends pv.Format
 * @param {string} type the type; "short" or "long".
 */
pv.Format.time = function(type) {
  var pad = pv.Format.pad;

  /*
   * MILLISECONDS = 1
   * SECONDS = 1e3
   * MINUTES = 6e4
   * HOURS = 36e5
   * DAYS = 864e5
   * WEEKS = 6048e5
   * MONTHS = 2592e6
   * YEARS = 31536e6
   */

  /** @private */
  function format(t) {
    t = Number(t); // force conversion from Date
    switch (type) {
      case "short": {
        if (t >= 31536e6) {
          return (t / 31536e6).toFixed(1) + " years";
        } else if (t >= 6048e5) {
          return (t / 6048e5).toFixed(1) + " weeks";
        } else if (t >= 864e5) {
          return (t / 864e5).toFixed(1) + " days";
        } else if (t >= 36e5) {
          return (t / 36e5).toFixed(1) + " hours";
        } else if (t >= 6e4) {
          return (t / 6e4).toFixed(1) + " minutes";
        }
        return (t / 1e3).toFixed(1) + " seconds";
      }
      case "long": {
        var a = [],
            s = ((t % 6e4) / 1e3) >> 0,
            m = ((t % 36e5) / 6e4) >> 0;
        a.push(pad("0", 2, s));
        if (t >= 36e5) {
          var h = ((t % 864e5) / 36e5) >> 0;
          a.push(pad("0", 2, m));
          if (t >= 864e5) {
            a.push(pad("0", 2, h));
            a.push(Math.floor(t / 864e5).toFixed());
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

  /**
   * Formats the specified time, returning the string representation.
   *
   * @function
   * @name pv.Format.time.prototype.format
   * @param {number} t the duration in milliseconds. May also be a <tt>Date</tt>.
   * @returns {string} the formatted string.
   */
  format.format = format;

  /**
   * Parses the specified string, returning the time in milliseconds.
   *
   * @function
   * @name pv.Format.time.prototype.parse
   * @param {string} s a formatted string.
   * @returns {number} the parsed duration in milliseconds.
   */
  format.parse = function(s) {
    switch (type) {
      case "short": {
        var re = /([0-9,.]+)\s*([a-z]+)/g, a, t = 0;
        while (a = re.exec(s)) {
          var f = parseFloat(a[0].replace(",", "")), u = 0;
          switch (a[2].toLowerCase()) {
            case "year": case "years": u = 31536e6; break;
            case "week": case "weeks": u = 6048e5; break;
            case "day": case "days": u = 864e5; break;
            case "hour": case "hours": u = 36e5; break;
            case "minute": case "minutes": u = 6e4; break;
            case "second": case "seconds": u = 1e3; break;
          }
          t += f * u;
        }
        return t;
      }
      case "long": {
        var a = s.replace(",", "").split(":").reverse(), t = 0;
        if (a.length) t += parseFloat(a[0]) * 1e3;
        if (a.length > 1) t += parseFloat(a[1]) * 6e4;
        if (a.length > 2) t += parseFloat(a[2]) * 36e5;
        if (a.length > 3) t += parseFloat(a[3]) * 864e5;
        return t;
      }
    }
  }

  return format;
};
