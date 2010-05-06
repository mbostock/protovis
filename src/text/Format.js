/**
 * Abstract; see an implementing class.
 *
 * @class Represents an abstract text formatter and parser. A <i>format</i> is a
 * function that converts an object of a given type, such as a <tt>Date</tt>, to
 * a human-readable string representation. The format may also have a
 * {@link #parse} method for converting a string representation back to the
 * given object type.
 *
 * <p>Because formats are themselves functions, they can be used directly as
 * mark properties. For example, if the data associated with a label are dates,
 * a date format can be used as label text:
 *
 * <pre>    .text(pv.Format.date("%m/%d/%y"))</pre>
 *
 * And as with scales, if the format is used in multiple places, it can be
 * convenient to declare it as a global variable and then reference it from the
 * appropriate property functions. For example, if the data has a <tt>date</tt>
 * attribute, and <tt>format</tt> references a given date format:
 *
 * <pre>    .text(function(d) format(d.date))</pre>
 *
 * Similarly, to parse a string into a date:
 *
 * <pre>var date = format.parse("4/30/2010");</pre>
 *
 * Not all format implementations support parsing. See the implementing class
 * for details.
 *
 * @see pv.Format.date
 * @see pv.Format.number
 * @see pv.Format.time
 */
pv.Format = {};

/**
 * Formats the specified object, returning the string representation.
 *
 * @function
 * @name pv.Format.prototype.format
 * @param {object} x the object to format.
 * @returns {string} the formatted string.
 */

/**
 * Parses the specified string, returning the object representation.
 *
 * @function
 * @name pv.Format.prototype.parse
 * @param {string} x the string to parse.
 * @returns {object} the parsed object.
 */

/**
 * @private Given a string that may be used as part of a regular expression,
 * this methods returns an appropriately quoted version of the specified string,
 * with any special characters escaped.
 *
 * @param {string} s a string to quote.
 * @returns {string} the quoted string.
 */
pv.Format.re = function(s) {
  return s.replace(/[\\\^\$\*\+\?\[\]\(\)\.\{\}]/g, "\\$&");
};

/**
 * @private Optionally pads the specified string <i>s</i> so that it is at least
 * <i>n</i> characters long, using the padding character <i>c</i>.
 *
 * @param {string} c the padding character.
 * @param {number} n the minimum string length.
 * @param {string} s the string to pad.
 * @returns {string} the padded string.
 */
pv.Format.pad = function(c, n, s) {
  var m = n - String(s).length;
  return (m < 1) ? s : new Array(m + 1).join(c) + s;
};
