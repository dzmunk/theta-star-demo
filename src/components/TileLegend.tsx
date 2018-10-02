import * as React from 'react';
import './styles/TileLegend.css';

interface TileLegendProps {
  doesBlockedTileExist: boolean;
  isPathVisible: boolean;
}

class TileLegend extends React.Component<TileLegendProps> {
  public render() {
    if (this.props.doesBlockedTileExist || this.props.isPathVisible) {
      return (
        <section className="tile-legend-container">
          <div>
            <div className="tile-legend plain" />
            <p>Plain</p>
          </div>
          {this.props.doesBlockedTileExist && <div>
            <div className="tile-legend blocked" />
            <p>Blocked</p>
          </div>}
          {this.props.isPathVisible && <div>
            <div className="tile-legend in-open-list" />
            <p>In the open list</p>
          </div>}
          {this.props.isPathVisible && <div>
            <div className="tile-legend in-closed-list" />
            <p>In the closed list</p>
          </div>}
        </section>
      );
    } else {
      return null;
    }
  }
}

export default TileLegend;
