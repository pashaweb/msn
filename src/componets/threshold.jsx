import React, { Component } from "react";
import { configurations } from "../consts/consts";
import { dataService } from "../servises/dataService";

class Threshold extends Component {
  state = {
    financialGoal: configurations.threshold
  };
  handleChange(evt) {
    const financialGoal = evt.target.validity.valid
      ? evt.target.value
      : this.state.financialGoal;
    console.log(financialGoal);
    dataService.setThreshold(financialGoal);
    this.setState({ financialGoal });
  }

  render() {
    return (
      <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">
            Threshold
          </span>
        </div>
        <input
          className="form-control"
          type="text"
          pattern="[0-9]*"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          onInput={this.handleChange.bind(this)}
          value={this.state.financialGoal}
        />
      </div>
    );
  }
}

export default Threshold;
