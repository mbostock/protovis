/* A 200-element array of random numbers in [0, 1]. */
var data = pv.range(200).map(Math.random);

/**
 * Sorts the specified array using bottom-up mergesort, returning an array of
 * arrays representing the state of the specified array after sequential passes.
 * The first pass is performed at size = 2.
 */
function mergesort(array) {
  var passes = [array.slice()], size = 2;
  for (; size < array.length; size <<= 1) {
    for (var i = 0; i < array.length;) {
      merge(array, i, i + (size >> 1), i += size);
    }
    passes.push(array.slice());
  }
  merge(array, 0, size >> 1, array.length);
  passes.push(array.slice());

  /** Merges two adjacent sorted arrays in-place. */
  function merge(array, start, middle, end) {
    for (; start < middle; start++) {
      if (array[start] > array[middle]) {
        var v = array[start];
        array[start] = array[middle];
        insert(array, middle, end, v);
      }
    }
  }

  /** Inserts the value v into the subarray specified by start and end. */
  function insert(array, start, end, v) {
    while (start + 1 < end && array[start + 1] < v) {
      var tmp = array[start];
      array[start] = array[start + 1];
      array[start + 1] = tmp;
      start++;
    }
    array[start] = v;
  }

  return passes;
}
