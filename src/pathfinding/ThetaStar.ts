import { Grid, Tile } from './Grid';
import { PathTile, AStar } from './AStar';

enum Axis {
  X, Y
}

interface Vector {
	[Axis.X]: number;
  [Axis.Y]: number;
}

export class ThetaStar extends AStar {
  public grid: Grid;
  
  constructor(grid: Grid) {
    super(grid);
  }
  
  // Override
  protected updatePathTile(current: PathTile, neighbor: Tile, queuedNeighbor: PathTile): boolean {
    /* Updates the path tile's properties if the current path is more efficient than
    the queued one. Returns true if the path tile is updated and false otherwise. */
    
    /* Path 2 (longer) */
    if (current.parent) {
      const lineTiles = this.lineOfSight(current.parent.tile, neighbor);
      if (lineTiles) { // There is a line-of-sight
        if (queuedNeighbor.calculateAnyAngleCumulativeWeight(current.parent, lineTiles) < queuedNeighbor.cumulativeWeight) {
          queuedNeighbor.updatePathToThis(current.parent);
          return true;
        }
      }
    }
    
    /* Path 1 (shorter; Considered only if Path 2 doesn't work) */
    if (queuedNeighbor.calculateCumulativeWeight(current) < queuedNeighbor.cumulativeWeight) {
      queuedNeighbor.updatePathToThis(current);
      return true;
    }
    return false;
  }
  
  public lineOfSight(from: Tile, to: Tile): Tile[] | null {
    /*
      Returns a list of tiles that are between the `from` tile and the `to` tile
      (excluding the `from` tile) or null if there is a blocking tile between the ends.
      This method uses Bresenham's line algorithm instead of the algorithm presented
      in the paper on Theta* since characters should be placed in the center of a tile,
      not on a vertex.
    
      This method checks for the supercover line to determine the the existence of
      line-of-sight, but returns a list of tiles picked by the ordinary Bresenham's
      algorithm for computation of cumulative weights.
    */
    
    const tiles: Tile[] = []; // Tiles used to calculate the cumulative weight
    
    if (from.x === to.x && from.y === to.y) {
      return tiles;
    }
    
    const current: Vector = {
      [Axis.X]: from.x,
      [Axis.Y]: from.y
    };
    const destination: Vector = {
      [Axis.X]: to.x,
      [Axis.Y]: to.y
    };
    const delta: Vector = {
    	[Axis.X]: Math.abs(to.x - from.x),
      [Axis.Y]: Math.abs(to.y - from.y)
    };
    const direction: Vector = { /* 1 if positive, -1 otherwise */
    	[Axis.X]: (to.x - from.x > 0) ? 1 : -1,
      [Axis.Y]: (to.y - from.y > 0) ? 1 : -1
    };
    
    const primaryAxis = delta[Axis.X] > delta[Axis.Y] ? Axis.X : Axis.Y; // The axis along which the current point mainly moves
    const secondaryAxis = delta[Axis.X] > delta[Axis.Y] ? Axis.Y : Axis.X;
    
    const deltaErrorHalf = Math.abs(delta[secondaryAxis] / delta[primaryAxis]) / 2; // delta[primaryAxis] cannot be 0
    let error = -deltaErrorHalf; // Distance between the center of the tile and the ideal line
    
    while (current[primaryAxis] !== destination[primaryAxis] + direction[primaryAxis]) {
      if (this.grid.tileAt(current[Axis.X], current[Axis.Y]).isBlocked) {
        return null;
      }
      
      error += deltaErrorHalf; // Error at the center of the tile
      if (error < 0.5) {
        tiles.push(this.grid.tileAt(current[Axis.X], current[Axis.Y]));
      } else {
        tiles.push(this.grid.tileAt(
          primaryAxis === Axis.X ? current[Axis.X] : (current[Axis.X] + direction[Axis.X]),
          primaryAxis === Axis.X ? (current[Axis.Y] + direction[Axis.Y]) : current[Axis.Y]
        ));
      }
      
      error += deltaErrorHalf; // Error at the end of the tile
      if (error >= 0.5) {
        current[secondaryAxis] += direction[secondaryAxis];
        if (error > 0.5) {
          if (this.grid.tileAt(current[Axis.X], current[Axis.Y]).isBlocked) {
            return null;
          }
        }
        error--;
      }
      current[primaryAxis] += direction[primaryAxis];
    }
    
    return tiles.slice(1); // Exclude the starting tile
  }
  
}