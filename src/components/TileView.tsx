import * as React from 'react';
import './styles/TileView.css';

import { Tile } from '../pathfinding/Grid';

interface TileViewProps {
  tile: Tile;
  isFocused: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInOpenList: boolean;
  isInClosedList: boolean;
  tileSize: number;
  focusTile: (tile: Tile) => void;
}

class TileView extends React.Component<TileViewProps> {
  private handleClick = () => {
    this.props.focusTile(this.props.tile);
  }

  public render() {
    const classNames = ['tile-view'];
    if (this.props.tile.isBlocked) classNames.push('blocked');
    if (this.props.isFocused) classNames.push('focused');
    if (!this.props.tile.isBlocked) {
      if (this.props.isInClosedList) {
        classNames.push('in-closed-list');
      } else if (this.props.isInOpenList) {
        classNames.push('in-open-list');
      }
    }
    const labelFontSize = this.props.tileSize / 5; // Can't do it with CSS "%"

    return (
      <div
        className={classNames.join(' ')}
        style={{
          width: `${this.props.tileSize}px`,
          height: `${this.props.tileSize}px`
        }}
        onClick={this.handleClick}>
        {this.props.isStart &&
          <p className="tile-label start" style={{fontSize: `${labelFontSize}px`}}>START</p>}
        {this.props.isEnd &&
          <p className="tile-label end" style={{fontSize: `${labelFontSize}px`}}>END</p>}
        {this.props.tile.weight !== 0 && !this.props.tile.isBlocked &&
          <p className="tile-label weight" style={{fontSize: `${labelFontSize}px`}}>{this.props.tile.weight}</p>}
      </div>
    );
  }
}

export default TileView;
