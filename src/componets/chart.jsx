import React, { Component } from "react";
import c3 from "c3";
import { dataService } from "../servises/dataService";

class Chart extends Component {
  componentDidMount() {
    this.subscription = dataService.getData().subscribe(data => {
      if (data) {
        this.chart = c3.generate(data);
      }
    });
  }

  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  render() {
    return <div id="chart">test</div>;
  }
}

export default Chart;
