import React, { Component } from "react";
class BreakdownSelectButton extends Component {
  state = {};
  render() {
    const { handaleClick, config } = this.props;
    return (
      <li className="nav-item">
        <a
          className="nav-link"
          href="#"
          onClick={() => handaleClick(this.props.config.id)}
        >
          {this.props.config.name}
        </a>
      </li>
    );
  }
}

export default BreakdownSelectButton;
