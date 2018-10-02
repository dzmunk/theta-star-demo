import * as React from 'react';
import './styles/Metrics.css';

interface MetricsProps {
  cost: number | null;
  distance: number | null
  openListLength: number | null;
  closedListLength: number | null;
}

class Metrics extends React.Component<MetricsProps> {
  public render() {
    return (
      <section className="metrics">
        <h2>Metrics</h2>
        <table className="metrics-table">
          <tbody>
            <tr>
              <td>Cumulative cost (G of the last cell)</td>
              <td>{this.props.cost === null ? '-' : this.props.cost.toFixed(4)}</td>
            </tr>
            <tr>
              <td>Total distance</td>
              <td>{this.props.distance === null ? '-' : this.props.distance.toFixed(4)}</td>
            </tr>
            <tr>
              <td>Number of cells left in the open list (queue)</td>
              <td>{this.props.openListLength === null ? '-' : this.props.openListLength}</td>
            </tr>
            <tr>
              <td>Number of cells in the closed list</td>
              <td>{this.props.closedListLength === null ? '-' : this.props.closedListLength}</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default Metrics;
