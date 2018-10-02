import * as React from 'react';

import { Grid, Tile } from '../pathfinding/Grid';
import { ThetaStar } from '../pathfinding/ThetaStar';

import GridSetting from './GridSetting';
import TileSetting from './TileSetting';
import GridContainer from './GridContainer';
import ButtonContainer from './ButtonContainer';
import Metrics from './Metrics';

interface PathFinderState {
  grid: Grid;
  startTile: Tile | null;
  endTile: Tile | null;
  focusedTile: Tile | null;
  cost: number | null;
  distance: number | null;
  tilesInPath: Tile[];
  tilesInOpenList: Tile[];
  tilesInClosedList: Tile[];
  errorMessage: string | null;
}

class PathFinder extends React.Component<{}, PathFinderState> {
  private thetaStar: ThetaStar;

  constructor(props: {}) {
    super(props);

    const grid = new Grid(3, 3);
    this.state = {
      grid,
      startTile: grid.tileAt(0, 0),
      endTile: grid.tileAt(2, 2),
      focusedTile: null,
      tilesInPath: [],
      tilesInOpenList: [],
      tilesInClosedList: [],
      cost: null,
      distance: null,
      errorMessage: null
    };
  }

  private setGridSize = (xSize: number, ySize: number) => {
    const newGrid = new Grid(xSize, ySize);
    
    // Copy the old block's properties
    for (let x = 0; x < Math.min(this.state.grid.x, xSize); x++) {
      for (let y = 0; y < Math.min(this.state.grid.y, ySize); y++) {
        newGrid.tileAt(x, y).isBlocked = this.state.grid.tileAt(x, y).isBlocked;
        newGrid.tileAt(x, y).weight = this.state.grid.tileAt(x, y).weight;
      }
    }

    const getCorrespondingTileInGrid = (tile: Tile | null, grid: Grid): Tile | null => {
      if (!tile) return null;
      if (tile.x < grid.x && tile.y < grid.y) {
        return grid.tileAt(tile.x, tile.y);
      } else {
        return null;
      }
    };

    this.setState({
      grid: newGrid,
      startTile: getCorrespondingTileInGrid(this.state.startTile, newGrid),
      endTile: getCorrespondingTileInGrid(this.state.endTile, newGrid),
      focusedTile: getCorrespondingTileInGrid(this.state.focusedTile, newGrid),
      tilesInPath: [],
      tilesInOpenList: [],
      tilesInClosedList: [],
      cost: null,
      distance: null,
      errorMessage: null
    });
  }

  private updateTile = (tile: Tile, isBlocked: boolean, weight: number) => {
    this.state.grid.tileAt(tile.x, tile.y).isBlocked = isBlocked;
    this.state.grid.tileAt(tile.x, tile.y).weight = weight;
    this.forceUpdate();
  }

  private setStartTile = (tile: Tile, setAsStart: boolean) => {
    this.setState({startTile: setAsStart ? tile : null});
  }

  private setEndTile = (tile: Tile, setAsEnd: boolean) => {
    this.setState({endTile: setAsEnd ? tile : null});
  }

  private focusTile = (tile: Tile) => {
    this.setState({focusedTile: tile});
  }
  
  private handleStart = () => {
    if (!(this.state.startTile && this.state.endTile)) {
      this.setState({errorMessage: 'Either start or end cell is missing'});
      return;
    }
    if (this.state.startTile === this.state.endTile) {
      this.setState({errorMessage: 'Start cell and end cell must not be the same'});
      return;
    }
    this.thetaStar = new ThetaStar(this.state.grid);
    const result = this.thetaStar.navigate(this.state.startTile, this.state.endTile);
    if (result.tilesInPath.length === 0) { // No path found
      this.setState({
        cost: null,
        distance: null,
        tilesInPath: [],
        tilesInOpenList: [],
        tilesInClosedList: [],
        errorMessage: 'Could not find any path'
      });
    } else {
      this.setState({
        cost: result.cost,
        distance: result.distance,
        tilesInPath: result.tilesInPath,
        tilesInOpenList: result.tilesInOpenList,
        tilesInClosedList: result.tilesInClosedList,
        errorMessage: null
      })
    }
  }

  private handleClearPath = () => {
    this.setState({
      cost: null,
      distance: null,
      tilesInPath: [],
      tilesInOpenList: [],
      tilesInClosedList: [],
      errorMessage: null
    });
  }

  private handleResetTiles = () => {
    for (const row of this.state.grid.tiles) {
      for (const tile of row) {
        tile.isBlocked = false;
        tile.weight = 0;
      }
    }
    this.setState({errorMessage: null});
  }

  public render() {
    return (
      <>
        <GridSetting xSize={this.state.grid.x} ySize={this.state.grid.y} setGridSize={this.setGridSize} />
        <TileSetting
          tile={this.state.focusedTile}
          isStart={this.state.focusedTile === this.state.startTile}
          isEnd={this.state.focusedTile === this.state.endTile}
          updateTile={this.updateTile}
          setStartTile={this.setStartTile}
          setEndTile={this.setEndTile} />
        <GridContainer
          grid={this.state.grid}
          focusedTile={this.state.focusedTile}
          startTile={this.state.startTile}
          endTile={this.state.endTile}
          tilesInPath={this.state.tilesInPath}
          tilesInOpenList={this.state.tilesInOpenList}
          tilesInClosedList={this.state.tilesInClosedList}
          focusTile={this.focusTile} />
        <ButtonContainer
          handleStart={this.handleStart}
          handleClearPath={this.handleClearPath}
          handleResetTiles={this.handleResetTiles}
          errorMessage={this.state.errorMessage} />
        <Metrics
          cost={this.state.cost}
          distance={this.state.distance}
          openListLength={this.state.cost ? this.state.tilesInOpenList.length : null}
          closedListLength={this.state.cost ? this.state.tilesInClosedList.length : null} />
      </>
    );
  }
}

export default PathFinder;
