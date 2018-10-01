import * as React from 'react';
import './styles/GridContainer.css';

import { Tile, Grid } from '../pathfinding/Grid';

import GridView from './GridView';
import PathView from './PathView';

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
    const tileSize = 100;
    const gapSize = 2;
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
