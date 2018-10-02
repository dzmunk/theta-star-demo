import * as React from 'react';
import './styles/GridContainer.css';

import { MIN_GRID_SIZE, MAX_GRID_SIZE } from './GridSetting';

import { Tile, Grid } from '../pathfinding/Grid';

import GridView from './GridView';
import PathView from './PathView';

const MIN_TILE_SIZE = 60; // Corresponds to MAX_GRID_SIZE
const MAX_TILE_SIZE = 100; // Corresponds to MIN_GRID_SIZE

interface GridContainerProps {
  grid: Grid;
  focusedTile: Tile | null;
  startTile: Tile | null;
  endTile: Tile | null;
  tilesInPath: Tile[];
  tilesInOpenList: Tile[];
  tilesInClosedList: Tile[];
  focusTile: (tile: Tile) => void;
}

class GridContainer extends React.Component<GridContainerProps> {
  private calculateGridDimensions(grid: Grid) {
    const biggerGridSize = Math.max(grid.x, grid.y);
    const tileSize = (MIN_TILE_SIZE - MAX_TILE_SIZE) / (MAX_GRID_SIZE - MIN_GRID_SIZE)
      * (biggerGridSize - 1) + MAX_TILE_SIZE; // Equation given two points: (MIN_GRID_SIZE, MAX_TILE_SIZE), (MAX_GRID_SIZE, MIN_TILE_SIZE)
    const gapSize = Math.max(tileSize / 50, 1);
    return {
      gridWidth: tileSize * grid.x + gapSize * (grid.x - 1),
      gridHeight: tileSize * grid.y + gapSize * (grid.y - 1),
      tileSize,
      gapSize
    }
  }

  public render() {
    const gridDimensions = this.calculateGridDimensions(this.props.grid);
    return (
      <section className="grid-container">
        <div
          className="grid-path-coordinator"
          style={{
            width: `${gridDimensions.gridWidth}px`,
            height: `${gridDimensions.gridHeight}px`
          }}>
          <GridView
            grid={this.props.grid}
            focusedTile={this.props.focusedTile}
            startTile={this.props.startTile}
            endTile={this.props.endTile}
            tilesInOpenList={this.props.tilesInOpenList}
            tilesInClosedList={this.props.tilesInClosedList}
            tileSize={gridDimensions.tileSize}
            gapSize={gridDimensions.gapSize}
            focusTile={this.props.focusTile} />
          <PathView
            startTile={this.props.startTile}
            tilesInPath={this.props.tilesInPath}
            gridWidth={gridDimensions.gridWidth}
            gridHeight={gridDimensions.gridHeight}
            tileSize={gridDimensions.tileSize}
            gapSize={gridDimensions.gapSize} />
        </div>
      </section>
    );
  }
}

export default GridContainer;
