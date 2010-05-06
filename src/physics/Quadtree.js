/**
 * Constructs a new quadtree for the specified array of particles.
 *
 * @class Represents a quadtree: a two-dimensional recursive spatial
 * subdivision. This particular implementation uses square partitions, dividing
 * each square into four equally-sized squares. Each particle exists in a unique
 * node; if multiple particles are in the same position, some particles may be
 * stored on internal nodes rather than leaf nodes.
 *
 * <p>This quadtree can be used to accelerate various spatial operations, such
 * as the Barnes-Hut approximation for computing n-body forces, or collision
 * detection.
 *
 * @see pv.Force.charge
 * @see pv.Constraint.collision
 * @param {pv.Particle} particles the linked list of particles.
 */
pv.Quadtree = function(particles) {
  var p;

  /* Compute bounds. */
  var x1 = Number.POSITIVE_INFINITY, y1 = x1,
      x2 = Number.NEGATIVE_INFINITY, y2 = x2;
  for (p = particles; p; p = p.next) {
    if (p.x < x1) x1 = p.x;
    if (p.y < y1) y1 = p.y;
    if (p.x > x2) x2 = p.x;
    if (p.y > y2) y2 = p.y;
  }

  /* Squarify the bounds. */
  var dx = x2 - x1, dy = y2 - y1;
  if (dx > dy) y2 = y1 + dx;
  else x2 = x1 + dy;
  this.xMin = x1;
  this.yMin = y1;
  this.xMax = x2;
  this.yMax = y2;

  /**
   * @ignore Recursively inserts the specified particle <i>p</i> at the node
   * <i>n</i> or one of its descendants. The bounds are defined by [<i>x1</i>,
   * <i>x2</i>] and [<i>y1</i>, <i>y2</i>].
   */
  function insert(n, p, x1, y1, x2, y2) {
    if (isNaN(p.x) || isNaN(p.y)) return; // ignore invalid particles
    if (n.leaf) {
      if (n.p) {
        /*
         * If the particle at this leaf node is at the same position as the new
         * particle we are adding, we leave the particle associated with the
         * internal node while adding the new particle to a child node. This
         * avoids infinite recursion.
         */
        if ((Math.abs(n.p.x - p.x) + Math.abs(n.p.y - p.y)) < .01) {
          insertChild(n, p, x1, y1, x2, y2);
        } else {
          var v = n.p;
          n.p = null;
          insertChild(n, v, x1, y1, x2, y2);
          insertChild(n, p, x1, y1, x2, y2);
        }
      } else {
        n.p = p;
      }
    } else {
      insertChild(n, p, x1, y1, x2, y2);
    }
  }

  /**
   * @ignore Recursively inserts the specified particle <i>p</i> into a
   * descendant of node <i>n</i>. The bounds are defined by [<i>x1</i>,
   * <i>x2</i>] and [<i>y1</i>, <i>y2</i>].
   */
  function insertChild(n, p, x1, y1, x2, y2) {
    /* Compute the split point, and the quadrant in which to insert p. */
    var sx = (x1 + x2) * .5,
        sy = (y1 + y2) * .5,
        right = p.x >= sx,
        bottom = p.y >= sy;

    /* Recursively insert into the child node. */
    n.leaf = false;
    switch ((bottom << 1) + right) {
      case 0: n = n.c1 || (n.c1 = new pv.Quadtree.Node()); break;
      case 1: n = n.c2 || (n.c2 = new pv.Quadtree.Node()); break;
      case 2: n = n.c3 || (n.c3 = new pv.Quadtree.Node()); break;
      case 3: n = n.c4 || (n.c4 = new pv.Quadtree.Node()); break;
    }

    /* Update the bounds as we recurse. */
    if (right) x1 = sx; else x2 = sx;
    if (bottom) y1 = sy; else y2 = sy;
    insert(n, p, x1, y1, x2, y2);
  }

  /* Insert all particles. */
  this.root = new pv.Quadtree.Node();
  for (p = particles; p; p = p.next) insert(this.root, p, x1, y1, x2, y2);
};

/**
 * The root node of the quadtree.
 *
 * @type pv.Quadtree.Node
 * @name pv.Quadtree.prototype.root
 */

/**
 * The minimum x-coordinate value of all contained particles.
 *
 * @type number
 * @name pv.Quadtree.prototype.xMin
 */

/**
 * The maximum x-coordinate value of all contained particles.
 *
 * @type number
 * @name pv.Quadtree.prototype.xMax
 */

/**
 * The minimum y-coordinate value of all contained particles.
 *
 * @type number
 * @name pv.Quadtree.prototype.yMin
 */

/**
 * The maximum y-coordinate value of all contained particles.
 *
 * @type number
 * @name pv.Quadtree.prototype.yMax
 */

/**
 * Constructs a new node.
 *
 * @class A node in a quadtree.
 *
 * @see pv.Quadtree
 */
pv.Quadtree.Node = function() {
  /*
   * Prepopulating all attributes significantly increases performance! Also,
   * letting the language interpreter manage garbage collection was moderately
   * faster than creating a cache pool.
   */
  this.leaf = true;
  this.c1 = null;
  this.c2 = null;
  this.c3 = null;
  this.c4 = null;
  this.p = null;
};

/**
 * True if this node is a leaf node; i.e., it has no children. Note that both
 * leaf nodes and non-leaf (internal) nodes may have associated particles. If
 * this is a non-leaf node, then at least one of {@link #c1}, {@link #c2},
 * {@link #c3} or {@link #c4} is guaranteed to be non-null.
 *
 * @type boolean
 * @name pv.Quadtree.Node.prototype.leaf
 */

/**
 * The particle associated with this node, if any.
 *
 * @type pv.Particle
 * @name pv.Quadtree.Node.prototype.p
 */

/**
 * The child node for the second quadrant, if any.
 *
 * @type pv.Quadtree.Node
 * @name pv.Quadtree.Node.prototype.c2
 */

/**
 * The child node for the third quadrant, if any.
 *
 * @type pv.Quadtree.Node
 * @name pv.Quadtree.Node.prototype.c3
 */

/**
 * The child node for the fourth quadrant, if any.
 *
 * @type pv.Quadtree.Node
 * @name pv.Quadtree.Node.prototype.c4
 */
