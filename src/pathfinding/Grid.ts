export enum Direction {
  West, East, North, South
  /*Northwest, Northeast, Southwest, Southeast*/
}

type Neighbors = Map<Direction, Tile>;

export class Tile {
  public x: number;
  public y: number;
  public isBlocked: boolean;
  public weight: number;
  public neighbors: Neighbors;
  
  constructor(x: number, y: number, isBlocked = false, weight = 0) {
    this.x = x;
    this.y = y;
    this.isBlocked = isBlocked;
    this.weight = weight;
    this.neighbors = new Map<Direction, Tile>();
  }
  
  // TODO: Refactor it later
  // Maybe neighbors can be just an array of tiles?
  get neighborList(): Tile[] {
    const neighborList: Tile[]  = [];
    Object.keys(Direction)
      .map((key: any) => Direction[key] as any)
      .filter((value: any) => typeof value === 'number')
      .forEach((key: number) => {
        this.neighbors.has(key) && neighborList.push(this.neighbors.get(key)!);
      });
    return neighborList;
  }
}

export class Grid {
  public x: number;
  public y: number;
  public tiles: Tile[][];
  
  constructor(x: number, y: number) {
    [this.x, this.y] = [x, y];
    this.tiles = [];
    
    // Generate the grid.
    for (let yIndex = 0; yIndex < this.y; yIndex++) {
      const row: Tile[] = [];
      for (let xIndex = 0; xIndex < this.x; xIndex++) {
        row.push(new Tile(xIndex, yIndex));
      }
      this.tiles.push(row);
    }
    
    // Map each tile to its neighbors.
    for (let yIndex = 0; yIndex < this.y; yIndex++) {
      for (let xIndex = 0; xIndex < this.x; xIndex++) {
        this.greetNeighbors(this.tiles[yIndex][xIndex]);
      }
    }
  }
  
  public tileAt(x: number, y: number): Tile {
    // TODO: Return null when the index is out of bound
    return this.tiles[y][x];
  }
  
  private greetNeighbors(tile: Tile) {
    /* Assigns each tile a mapping to its adjecent tiles, including diagonals.
    If the tile is on the edge of the grid, non-existent neighbors will be
    undefined. Diagonal neighbors are checked using the assumption that the grid
    is rectangular. */
    
    // West
    if (tile.x - 1 >= 0) {
      tile.neighbors.set(Direction.West, this.tileAt(tile.x - 1, tile.y));
    }
    // East
    if (tile.x + 1 < this.x) {
      tile.neighbors.set(Direction.East, this.tileAt(tile.x + 1, tile.y));
    }
    // North
    if (tile.y - 1 >= 0) {
      tile.neighbors.set(Direction.North, this.tileAt(tile.x, tile.y - 1));
    }
    // Northwest
    // if (tile.neighbors.has(Direction.West) && tile.neighbors.has(Direction.North)) {
    //   tile.neighbors.set(Direction.Northwest, this.tileAt(tile.x - 1, tile.y - 1));
    // }
    // Northeast
    // if (tile.neighbors.has(Direction.East) && tile.neighbors.has(Direction.North)) {
    //   tile.neighbors.set(Direction.Northeast, this.tileAt(tile.x + 1, tile.y - 1));
    // }
    // South
    if (tile.y + 1 < this.y) {
      tile.neighbors.set(Direction.South, this.tileAt(tile.x, tile.y + 1));
    }
    // Southwest
    // if (tile.neighbors.has(Direction.West) && tile.neighbors.has(Direction.South)) {
    //   tile.neighbors.set(Direction.Southwest, this.tileAt(tile.x - 1, tile.y + 1));
    // }
    // Southeast
    // if (tile.neighbors.has(Direction.East) && tile.neighbors.has(Direction.South)) {
    //   tile.neighbors.set(Direction.Southeast, this.tileAt(tile.x + 1, tile.y + 1));
    // }
  }
  
  public static squaredDistanceBetween(a: Tile, b: Tile) {
    /* Calculates the distance between two tiles. Does not take the square root
    in order to make the calculation more efficient. */
    // TODO: Take the square root to give advantage to diagonal moves
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }
  
}