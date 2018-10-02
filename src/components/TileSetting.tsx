import * as React from 'react';
import './styles/TileSetting.css';

import { Tile } from '../pathfinding/Grid';
import NumberInputWithRangeLimit from './NumberInputWithRangeLimit';

const MIN_TILE_WEIGHT = 0;
const MAX_TILE_WEIGHT = 1000;

interface TileSettingProps {
  tile: Tile | null;
  isStart: boolean;
  isEnd: boolean;
  updateTile: (oldTile: Tile, isBlocked: boolean, weight: number) => void;
  setStartTile: (tile: Tile, setAsStart: boolean) => void;
  setEndTile: (tile: Tile, setAsEnd: boolean) => void;
}

interface TileSettingState {
  inputWeight: string; // Differs from props.tile.weight when no input is present (inputWeight is '' while the internal weight is 0)
  ignoreNextWeightUpdate: boolean; // Don't reflect the update on props.tile.weight to inputWeight after the user editing the input field
}

class TileSetting extends React.Component<TileSettingProps, TileSettingState> {
  constructor(props: TileSettingProps) {
    super(props);
    this.state = {
      inputWeight: this.props.tile ? this.props.tile.weight.toString() : '',
      ignoreNextWeightUpdate: false
    }
  }

  public static getDerivedStateFromProps(props: TileSettingProps, state: TileSettingState) {
    if (state.ignoreNextWeightUpdate) {
      return {
        ignoreNextWeightUpdate: false
      }
    } else {
      return {
        inputWeight: props.tile ? props.tile.weight : '',
        ignoreNextWeightUpdate: false
      };
    }
  }

  private handleSetStart = (setAsStart: boolean) => {
    if (!this.props.tile) return;
    this.props.setStartTile(this.props.tile, setAsStart);
  }

  private handleSetEnd = (setAsEnd: boolean) => {
    if (!this.props.tile) return;
    this.props.setEndTile(this.props.tile, setAsEnd);
  }

  private handleSetIsBlocked = (setAsBlocked: boolean) => {
    if (!this.props.tile) return;
    this.props.updateTile(this.props.tile, setAsBlocked, this.props.tile.weight);
  }

  private handleWeightChange = (newInputWeight: string) => {
    if (!this.props.tile) return;
    const float = parseFloat(newInputWeight);
    let newWeight = 0;
    if (!isNaN(float)) {
      newWeight = Math.max(Math.min(float, MAX_TILE_WEIGHT), MIN_TILE_WEIGHT);
    }
    this.props.updateTile(this.props.tile, this.props.tile.isBlocked, newWeight);
    this.setState({
      inputWeight: newInputWeight === '' ? '' : newWeight.toString(),
      ignoreNextWeightUpdate: true
    });
  }

  public render() {
    if (this.props.tile) {
      return (
        <section className="tile-setting">
          <h2>Cell Settings ({this.props.tile.x}, {this.props.tile.y})</h2>
          <label className="setting">
            <input
              type="checkbox" checked={this.props.isStart}
              onChange={event => this.handleSetStart(event.target.checked)} />
            <p>Set as start</p>
          </label>
          <label className="setting">
            <input
              type="checkbox" checked={this.props.isEnd}
              onChange={event => this.handleSetEnd(event.target.checked)} />
            <p>Set as end</p>
          </label>
          <label className="setting">
            <input
              type="checkbox" checked={this.props.tile.isBlocked}
              onChange={event => this.handleSetIsBlocked(event.target.checked)} />
            <p>Block this cell</p>
          </label>
          <label className="setting">
            <p>Weight:</p>
            <NumberInputWithRangeLimit
              min={MIN_TILE_WEIGHT} max={MAX_TILE_WEIGHT} step={1}
              defaultInput={this.state.inputWeight}
              fieldWidth="4rem"
              handleChange={newInput => this.handleWeightChange(newInput)} />
          </label>
        </section>
      );
    } else {
      return (
        <section className="tile-setting">
          <h2>Cell Settings</h2>
          <p>Click on a cell to configure</p>
        </section>
      )
    }
  }
}

export default TileSetting;
