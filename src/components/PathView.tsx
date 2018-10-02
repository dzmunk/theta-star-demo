import * as React from 'react';
import './styles/PathView.css';

import { Tile } from '../pathfinding/Grid';

import { arrayEqual } from '../utility';

const PATH_COLOR = 'white';

interface PathViewProps {
  startTile: Tile | null;
  tilesInPath: Tile[];
  gridWidth: number;
  gridHeight: number;
  tileSize: number;
  gapSize: number;
}

class PathView extends React.Component<PathViewProps> {
  private canvasRef = React.createRef<HTMLCanvasElement>();

  private drawPath(context: CanvasRenderingContext2D, startTile: Tile, tilesInPath: Tile[], tileSize: number, gapSize: number) {
    const tileToCanvasCoordinate = (tile: Tile): [number, number] => {
      return [
        (tileSize + gapSize) * tile.x + tileSize / 2,
        (tileSize + gapSize) * tile.y + tileSize / 2
      ];
    };

    context.fillStyle = PATH_COLOR;
    context.strokeStyle = PATH_COLOR;

    // Draw circles
    for (const tile of [startTile, ...tilesInPath]) {
      context.beginPath();
      const [x, y] = tileToCanvasCoordinate(tile); // TODO: In the future, we'll be able to use spread operator in the argument list
      context.arc(
        x, y, // Coordinate
        tileSize / 10, // Radius
        0, 2 * Math.PI // Angle
      );
      context.closePath();
      context.fill();
    }

    // Draw lines
    context.beginPath();
    context.moveTo(...tileToCanvasCoordinate(startTile));
    for (const tile of tilesInPath) {
      context.lineTo(...tileToCanvasCoordinate(tile));
    }
    context.lineWidth = tileSize / 20;
    context.stroke();
  }

  private clearCanvas(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  private redraw(startTile: Tile | null, tilesInPath: Tile[], tileSize: number, gapSize: number, isNewCanvas: boolean) {
    const canvas: HTMLCanvasElement | null = this.canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    isNewCanvas && context.scale(2, 2); // Adjust the scale only when the canvas is newly created (because multiple scale()s accumulate)

    this.clearCanvas(context);
    if (startTile && tilesInPath.length !== 0) {
      this.drawPath(context, startTile, tilesInPath, tileSize, gapSize);
    }
  }

  public componentDidMount() {
    this.redraw(this.props.startTile, this.props.tilesInPath, this.props.tileSize, this.props.gapSize, true);
  }

  public shouldComponentUpdate(nextProps: PathViewProps) {
    if (this.props.gridWidth === nextProps.gridWidth && this.props.gridHeight === nextProps.gridHeight) {
      if (this.props.startTile !== nextProps.startTile || !arrayEqual(this.props.tilesInPath, nextProps.tilesInPath)) { // Redraw only when the path is different
        this.redraw(nextProps.startTile, nextProps.tilesInPath, nextProps.tileSize, nextProps.gapSize, false);
      }
      return false;
    } else {
      return true; // A new canvas will be created and redraw() in componentDidUpdate will be executed
    }
  }

  public componentDidUpdate() {
    this.redraw(this.props.startTile, this.props.tilesInPath, this.props.tileSize, this.props.gapSize, true);
  }

  public render() {
    return (
      <canvas
        className="path-view" ref={this.canvasRef}
        width={this.props.gridWidth * 2} height={this.props.gridHeight * 2}
        style={{
          width: `${this.props.gridWidth}px`,
          height: `${this.props.gridHeight}px`
        }} />
    );
  }
}

export default PathView;
