/* A 200-element array of random numbers in [0, 1]. */
var data = pv.range(200).map(Math.random);

/**
 * Sorts the specified array using bottom-up mergesort, returning an array of
 * arrays representing the state of the specified array after sequential passes.
 * The first pass is performed at size = 2.
 */
function quicksort(array) {

  /* We need to do a BFS QuickSort here */
  var passes = [],
      queue = [{begin:0, end:array.length, level:1}],
      splits = [],
      level = 0;

  while (queue.length > 0) {
    var v = queue.shift();

    // Mark the pivots
    if (level < v.level) {
      var pass = array.map(function(n) {return {n:n, pivot:false}});
      splits.forEach(function(s) { pass[s].pivot = true; })
      passes.push(pass);
      level = v.level;
      splits = [];
    }

    if (v.end-1 > v.begin) {
      var pivot = v.begin;//+Math.floor(Math.random()*(v.end-v.begin));

      var split = partition(array, v.begin, v.end, pivot);
      splits.push(split);

      queue.push({begin:v.begin, end:split, level:v.level+1});
      queue.push({begin:split+1, end:v.end, level:v.level+1});
    }
  }

  /**
   * The partitioning function scans an array segment array from
   * element begin to element end, and moves all elements that are
   * less than the pivot value to the beginning of array.
   */
  function partition(array, begin, end, pivot) {
    var piv=array[pivot];
    swap(array, pivot, end-1);
    var store=begin;
    var ix;
    for (ix=begin; ix<end-1; ++ix) {
      if (array[ix]<=piv) {
        swap(array, store, ix);
        ++store;
      }
    }
    swap(array, end-1, store);

    return store;
  }

  /** Swaps the elements at indexes a and b */
  function swap(array, a, b) {
    var tmp=array[a];
    array[a]=array[b];
    array[b]=tmp;
  }

  return passes;
}
