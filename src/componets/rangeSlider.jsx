import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { configurations } from "../consts/consts";
import { dataService } from "../servises/dataService";
export function Handle({
  // your handle component
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: "absolute",
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: "#2C4870",
        color: "#333"
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: "Roboto", fontSize: 11, marginTop: -35 }}>
        {value}
      </div>
    </div>
  );
}
const Track = ({ source, target, getTrackProps }) => {
  // your own track component
  return (
    <div
      style={{
        position: "absolute",
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: "#546C91",
        borderRadius: 5,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
    />
  );
};

const sliderStyle = {
  // Give the slider some width
  position: "relative",
  width: "100%",
  height: 80
};

const railStyle = {
  position: "absolute",
  width: "100%",
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: "#8B9CB6"
};

const onSliderChange = val => {
  console.log(val);
  dataService.setTimeRange(val);
};

class RangeSlider extends Component {
  state = configurations.timeRange;
  componentDidMount() {}

  render() {
    return (
      <div>
        <Slider
          rootStyle={sliderStyle}
          domain={[1998, 2019]}
          step={1}
          mode={2}
          values={[configurations.timeRange.min, configurations.timeRange.max]}
          onChange={onSliderChange}
        >
          <Rail>
            {({ getRailProps }) => (
              <div style={railStyle} {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    );
  }
}

export default RangeSlider;
