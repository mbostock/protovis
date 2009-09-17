/**
 * @class The built-in Date class.
 * @name Date
 */

Date.__parse__ = Date.parse;

/**
 * Parses a date from a string, optionally using the specified formatting. If
 * only a single argument is specified (i.e., <tt>format</tt> is not specified),
 * this method invokes the native implementation to guarantee
 * backwards-compatibility.
 *
 * <p>The format string is in the same format expected by the <tt>strptime</tt>
 * function in C. TODO expand support to include all (or at least most) of the
 * substitution variables.
 *
 * @see <a
 * href="http://www.opengroup.org/onlinepubs/007908799/xsh/strptime.html">strptime</a>
 * documentation.
 * @param {string} s the string to parse as a date.
 * @param {string} [format] an optional format string.
 * @returns {Date} the parsed date.
 */
Date.parse = function(s, format) {
  if (arguments.length == 1) {
    return Date.__parse__(s);
  }

  var year = 1970, month = 0, date = 1, hour = 0, minute = 0, second = 0;
  var fields = [function() {}];
  format = format.replace(/[\\\^\$\*\+\?\[\]\(\)\.\{\}]/g, "\\$&");
  format = format.replace(/%[a-zA-Z0-9]/g, function(s) {
      switch (s) {
        case '%S': {
          fields.push(function(x) { second = x; });
          return "([0-9]+)";
        }
        case '%M': {
          fields.push(function(x) { minute = x; });
          return "([0-9]+)";
        }
        case '%H': {
          fields.push(function(x) { hour = x; });
          return "([0-9]+)";
        }
        case '%d': {
          fields.push(function(x) { date = x; });
          return "([0-9]+)";
        }
        case '%m': {
          fields.push(function(x) { month = x - 1; });
          return "([0-9]+)";
        }
        case '%b': {
          fields.push(function(x) { month = {
                Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7,
                Sep: 8, Oct: 9, Nov: 10, Dec: 11
              }[x]; });
          return "([A-Za-z]+)";
        }
        case '%B': {
          fields.push(function(x) { month = {
                January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
                July: 6, August: 7, September: 8, October: 9, November: 10,
                December: 11
              }[x]; });
          return "([A-Za-z]+)";
        }
        case '%Y': {
          fields.push(function(x) { year = x; });
          return "([0-9]+)";
        }
        case '%%': {
          fields.push(function() {});
          return "%";
        }
        case '%y': {
          fields.push(function(x) {
              x = Number(x);
              year = x + (((0 <= x) && (x < 69)) ? 2000
                  : (((x >= 69) && (x < 100) ? 1900 : 0)));
            });
          return "([0-9]+)";
        }
      }
      return s;
    });

  var match = s.match(format);
  if (match) match.forEach(function(m, i) { fields[i](m); });
  return new Date(year, month, date, hour, minute, second);
};

if (Date.prototype.toLocaleFormat) {
  Date.prototype.format = Date.prototype.toLocaleFormat;
} else {

/**
 * Converts a date to a string using the specified formatting. If the
 * <tt>Date</tt> object already supports the <tt>toLocaleFormat</tt> method, as
 * in Firefox, this is simply an alias to the built-in method.
 *
 * <p>The format string is in the same format expected by the <tt>strftime</tt>
 * function in C. TODO expand support to include all (or at least most) of the
 * substitution variables.
 *
 * @see <a
 * href="http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Date/toLocaleFormat">Date.toLocaleFormat</a>
 * documentation.
 * @see <a
 * href="http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html">strftime</a>
 * documentation.
 * @param {string} format a format string.
 * @returns {string} the formatted date.
 */
Date.prototype.format = function(format) {
  function pad(n) { return (n < 10) ? "0" + n : n; }
  var d = this;
  return format.replace(/%[a-zA-Z0-9]/g, function(s) {
      switch (s) {
        case '%a': return [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
          ][d.getDay()];
        case '%A': return [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
            "Saturday",
          ][d.getDay()];
        case '%b': return [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec",
          ][d.getMonth()];
        case '%B': return [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December",
          ][d.getMonth()];
        case '%S': return pad(d.getSeconds());
        case '%M': return pad(d.getMinutes());
        case '%H': return pad(d.getHours());
        case '%I': {
          var h = d.getHours() % 12;
          return h ? pad(h) : 12;
        }
        case '%d': return pad(d.getDate());
        case '%m': return pad(d.getMonth() + 1);
        case '%Y': return d.getFullYear();
        case '%%': return "%";
        case '%y': return pad(d.getFullYear() % 100);
      }
      return s;
    });
  };
}
