import * as React from 'react';
import './styles/ButtonContainer.css';

interface ButtonContainerProps {
  errorMessage: string | null;
  handleStart: () => void;
  handleClearPath: () => void;
  handleResetTiles: () => void;
}

class ButtonContainer extends React.Component<ButtonContainerProps> {
  public render() {
    return (
      <section className="button-container">
        <div className="buttons">
          <button onClick={this.props.handleStart}>Start</button>
          <button onClick={this.props.handleClearPath}>Clear Path</button>
          <button onClick={this.props.handleResetTiles}>Reset Tiles</button>
        </div>
        {this.props.errorMessage && <p className="error-message">{this.props.errorMessage}</p>}
      </section>
    );
  }
}

export default ButtonContainer;
