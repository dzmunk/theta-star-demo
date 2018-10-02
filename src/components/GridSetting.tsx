import * as React from 'react';
import './styles/GridSetting.css';

import NumberInputWithRangeLimit from './NumberInputWithRangeLimit';

// These constants are exported to calculate the tile size in GridContainer.tsx
export const MIN_GRID_SIZE = 1;
export const MAX_GRID_SIZE = 50;

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
        <label className="setting">
          <p>Number of columns:</p>
          <NumberInputWithRangeLimit
            min={MIN_GRID_SIZE} max={MAX_GRID_SIZE} step={1}
            defaultInput={this.state.inputXSize}
            fieldWidth="3rem"
            handleChange={newInput => this.handleXSizeChange(newInput)} />
        </label>
        <label className="setting">
          <p>Number of rows:</p>
          <NumberInputWithRangeLimit
            min={MIN_GRID_SIZE} max={MAX_GRID_SIZE} step={1}
            defaultInput={this.state.inputYSize}
            fieldWidth="3rem"
            handleChange={newInput => this.handleYSizeChange(newInput)} />
        </label>
        <button onClick={this.handleConfirm}>Confirm</button>
      </section>
    );
  }
}

export default GridSetting;
