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

    return (
      <div
        className={classNames.join(' ')}
        onClick={this.handleClick}>
        {this.props.isStart && <p className="tile-label start">START</p>}
        {this.props.isEnd && <p className="tile-label end">END</p>}
        {this.props.tile.weight !== 0 && !this.props.tile.isBlocked && <p className="tile-label weight">{this.props.tile.weight}</p>}
      </div>
    );
  }
}

export default TileView;
