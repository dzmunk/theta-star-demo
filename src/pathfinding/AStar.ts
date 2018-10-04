import { Grid, Tile } from './Grid';
import PriorityQueue from './PriorityQueue';

// TODO: Upgrade A* to Theta* for more natural paths.
// TODO: Upgrade Theta* to Incremental Phi* for optimization.

interface Result {
  tilesInPath: Tile[];
  tilesInOpenList: Tile[];
  tilesInClosedList: Tile[];
  cost: number;
  distance: number;
}

export class PathTile {
  public tile: Tile;
  public parent: PathTile | null;
  public cumulativeWeight: number; // G (G of parent + weight of parent -> this tile)
  public distance: number; // H (distance from this tile to the end)
  public cost: number; // F (G + H)
  
  constructor(tile: Tile, parent: PathTile | null, end: Tile) {
    this.tile = tile;
    this.parent = parent;
    this.cumulativeWeight = this.calculateCumulativeWeight(this.parent);
    this.distance = Grid.squaredDistanceBetween(this.tile, end);
    this.cost = this.cumulativeWeight + this.distance;
  }
  
  public updatePathToThis(newParent: PathTile) {
    this.parent = newParent;
    this.cumulativeWeight = this.calculateCumulativeWeight(this.parent);
    this.cost = this.cumulativeWeight + this.distance;
  }
  
  public calculateCumulativeWeight(parent: PathTile | null): number {
    /* Parent can be injected so that we can simulate cumulative weights
    to compare the efficiency of multiple paths */
    if (!parent) return 0;
    return (
      parent.cumulativeWeight
        + Grid.squaredDistanceBetween(parent.tile, this.tile)
        + this.tile.weight // TODO: Or take the difference of weights?
    );
  }
  
  public calculateAnyAngleCumulativeWeight(parent: PathTile | null, lineTiles: Tile[]): number {
    /* lineTiles are tiles between the parent and this. It does not include the parent
    but does include this tile. */
    if (!parent) return 0;
    let cumulativeWeight = parent.cumulativeWeight + Grid.squaredDistanceBetween(parent.tile, this.tile);
    for (const tile of lineTiles) {
      cumulativeWeight += tile.weight; // TODO: Do something
    }
    return cumulativeWeight;
  }
  
}

export class AStar { // returns an array of Tiles for the character to navigate.
  public grid: Grid;

  constructor(grid: Grid) {
    this.grid = grid;
  }
  
  public navigate(start: Tile, end: Tile): Result {
    /*
      To keep Tile.weight immutable, this method uses PathTile, a wrapper for Tile.
      PathTile stores information that is specific to this path, such as
      parent and cost, in addition to the tile object it's wrapping.
      The first path tile will have null as its parent.
    */
    const queue = new PriorityQueue<PathTile>(); // Open list
    const searched: PathTile[] = []; // Closed list
    
    queue.enqueue(new PathTile(start, null, end));
    
    let current: PathTile;
    
    while (!queue.isEmpty()) {
      current = queue.dequeue()!;
      searched.push(current);
      
      if (current.tile === end) {
        const path = this.constructPath(current);
        let distance = Grid.squaredDistanceBetween(start, path[0]);
        for (let i = 0; i < path.length - 1; i++) {
          distance += Grid.squaredDistanceBetween(path[i], path[i + 1]);
        }
        return {
          tilesInPath: path,
          tilesInOpenList: queue.heap.content.map((pathTile: PathTile) => pathTile.tile),
          tilesInClosedList: searched.map((pathTile: PathTile) => pathTile.tile),
          cost: current.cumulativeWeight,
          distance
        };
      }
      
      for (const neighbor of current.tile.neighborList) {
        if (neighbor.isBlocked || searched.map((pathTile: PathTile) => pathTile.tile).includes(neighbor)) {
          continue;
        }

        // Skip this neighbor if this is a diagonal movement and both tiles surrounding the path are blocked
        const isDiagonal = current.tile.x !== neighbor.x && current.tile.y !== neighbor.y;
        if (isDiagonal && this.grid.tileAt(current.tile.x, neighbor.y)!.isBlocked && this.grid.tileAt(neighbor.x, current.tile.y)!.isBlocked) {
          continue;
        }
        
        const indexInQueue = queue.find((pathTile: PathTile) => pathTile.tile === neighbor);
        if (indexInQueue > 0) { /* If the queue contains the neighbor */
          const updated = this.updatePathTile(current, queue.elementAt(indexInQueue)!);
          updated && queue.notifyUpdate(indexInQueue);
        } else {
          // TODO: やばいきたない
          queue.enqueue(new PathTile(neighbor, current, end));
          const indexInQueueue = queue.find((pathTile: PathTile) => pathTile.tile === neighbor);
          const updated = this.updatePathTile(current, queue.elementAt(indexInQueueue)!);
          updated && queue.notifyUpdate(indexInQueueue);
        }
      }
    }
    return {
      tilesInPath: [],
      tilesInOpenList: [],
      tilesInClosedList: [],
      cost: 0,
      distance: 0
    };
  }
  
  protected updatePathTile(current: PathTile, queuedNeighbor: PathTile): boolean {
    /* Updates the path tile's properties if the current path is more efficient than
    the queued one. Returns true if the path tile is updated and false otherwise. */
    if (queuedNeighbor.calculateCumulativeWeight(current) < queuedNeighbor.cumulativeWeight) {
      queuedNeighbor.updatePathToThis(current);
      return true;
    }
    return false;
  }
  
  private constructPath(end: PathTile): Tile[] {
    const path: Tile[] = [];
    let current: PathTile = end;
    while (current.parent) {
      path.push(current.tile);
      current = current.parent;
    }
    return path.reverse();
  }
  
}