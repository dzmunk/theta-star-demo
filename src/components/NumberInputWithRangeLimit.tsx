import * as React from 'react';
import './styles/NumberInputWithRangeLimit.css';

interface NumberInputWithRangeLimitProps {
  min: number;
  max: number;
  step: number;
  defaultInput: string;
  style?: React.CSSProperties;
  fieldWidth: string;
  handleChange: (newInput: string) => void;
}

class NumberInputWithRangeLimit extends React.Component<NumberInputWithRangeLimitProps> {
  public render() {
    return (
      <div
        className="number-input-with-range-limit"
        style={{...this.props.style}}>
        <input
          type="number"
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.props.defaultInput}
          style={{
            width: this.props.fieldWidth
          }}
          onChange={event => this.props.handleChange(event.target.value)} />
        <p>{this.props.min} - {this.props.max}</p>
      </div>
    );
  }
}

export default NumberInputWithRangeLimit;
