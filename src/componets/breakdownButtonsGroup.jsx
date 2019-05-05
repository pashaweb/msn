import React, { Component } from "react";
import BreakdownSelectButton from "./breakdownSelectButton";
import { configurations } from "../consts/consts";
import { dataService } from "../servises/dataService";

class BreakdownButtonsGroup extends Component {
  state = { buttons: configurations.chartOptions };
    componentDidMount() {
        dataService.channgeTimeTic(configurations.chartOptions[0].type);
    }
  render() {
    //const { handaleClick, buttons } = this.props;
    return (
      <React.Fragment>
        {this.state.buttons.map(item => (
          <BreakdownSelectButton
            key={item.id}
            config={item}
            handaleClick={this.handaleClick}
          />
        ))}
      </React.Fragment>
    );
  }
  handaleClick = buttonId => {
    console.log("buttonId", buttonId);
    const bt = this.state.buttons.find(b => b.id === buttonId);
    console.log(bt);
    dataService.channgeTimeTic(bt.type);
    //this.setState({ counters });
  };
}

export default BreakdownButtonsGroup;
