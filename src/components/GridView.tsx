import * as React from 'react';
import './styles/GridView.css';

import { Tile, Grid } from '../pathfinding/Grid';
import TileView from './TileView';

interface GridViewProps {
  grid: Grid;
  focusedTile: Tile | null;
  startTile: Tile | null;
  endTile: Tile | null;
  tilesInOpenList: Tile[];
  tilesInClosedList: Tile[];
  tileSize: number;
  gapSize: number;
  focusTile: (tile: Tile) => void;
}

class GridView extends React.Component<GridViewProps> {
  public render() {
    return (
      <div
        className="grid-view"
        style={{
          gridTemplateColumns: `repeat(${this.props.grid.x}, ${this.props.tileSize}px)`,
          gridTemplateRows: `repeat(${this.props.grid.y}, ${this.props.tileSize}px)`,
          gridGap: `${this.props.gapSize}px`
        }}>
        {this.props.grid.tiles.map((row: Tile[]) => {
          return row.map((tile: Tile) => {
            return (
              <TileView
                key={`${tile.x}-${tile.y}`}
                tile={tile}
                isFocused={tile === this.props.focusedTile}
                isStart={tile === this.props.startTile}
                isEnd={tile === this.props.endTile}
                isInOpenList={this.props.tilesInOpenList.includes(tile)}
                isInClosedList={this.props.tilesInClosedList.includes(tile)}
                focusTile={this.props.focusTile} />
            );
          })
        })}
      </div>
    );
  }
}

export default GridView;
