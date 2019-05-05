import React from "react";
import Chart from "./componets/chart";
import { dataService } from "./servises/dataService";
import RangeSlider from "./componets/rangeSlider";
import BreakdownButtonsGroup from "./componets/breakdownButtonsGroup";
import Threshold from "./componets/threshold";

function App() {
  const sendMessage = () => {
    dataService.channgeTimeTic("TIME_SERIES_MONTHLY");
  };
  return (
    <React.Fragment>
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <span data-feather="home" />
                  Select time Breakdown
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <BreakdownButtonsGroup />

              <Threshold />
            </ul>
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <Chart />
          </div>
          <RangeSlider />
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
