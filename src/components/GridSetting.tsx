import * as React from 'react';
import './styles/GridSetting.css';

const MIN_GRID_SIZE = 1;
const MAX_GRID_SIZE = 50;

interface GridSettingProps {
  xSize: number;
  ySize: number;
  setGridSize: (xSize: number, ySize: number) => void;
}

interface GridSettingState {
  inputXSize: string;
  inputYSize: string;
}

class GridSetting extends React.Component<GridSettingProps, GridSettingState> {
  constructor(props: GridSettingProps) {
    super(props);
    this.state = {
      inputXSize: this.props.xSize.toString(),
      inputYSize: this.props.ySize.toString()
    }
  }

  private handleXSizeChange = (newInputXSize: string) => {
    this.setState({inputXSize: newInputXSize});
  }
  
  private handleYSizeChange = (newInputYSize: string) => {
    this.setState({inputYSize: newInputYSize});
  }

  private handleConfirm = () => {
    const inputStringToSize = (inputString: string): number => {
      const int = parseInt(inputString, 10);
      if (isNaN(int)) return MIN_GRID_SIZE;
      return Math.max(Math.min(int, MAX_GRID_SIZE), MIN_GRID_SIZE);
    };
    const xSize = inputStringToSize(this.state.inputXSize);
    const ySize = inputStringToSize(this.state.inputYSize);
    this.props.setGridSize(
      xSize,
      ySize
    );
    this.setState({
      inputXSize: xSize.toString(),
      inputYSize: ySize.toString()
    });
  }

  public render() {
    return (
      <section className="grid-setting">
        <h2>Grid Settings</h2>
        <span>Grid size: </span>
        <label>
          x
          <input
            className="grid-size-input" type="number" min={MIN_GRID_SIZE} max={MAX_GRID_SIZE}  step="1"
            value={this.state.inputXSize}
            onChange={event => this.handleXSizeChange(event.target.value)} />
        </label>
        ×
        <label>
          y
          <input
            className="grid-size-input" type="number" min={MIN_GRID_SIZE} max={MAX_GRID_SIZE} step="1"
            value={this.state.inputYSize}
            onChange={event => this.handleYSizeChange(event.target.value)} />
        </label>
        <button onClick={this.handleConfirm}>Confirm</button>
        <p>Grid size must be from 1 to 50</p>
      </section>
    );
  }
}

export default GridSetting;
