import React from "react";
import "./style.css";
import faceIcon from "../../images/faceIcon.svg";
import chevron from "../../images/chevron.svg";
import TracksDropdown from "../tracksDropdown/tracksDropsown";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonials: [],
      tracks: {},
      tracksDropdownFlag: false,
      animationFlag: false,
    };
  }

  async animation() {
    this.setState({ animationFlag: !this.state.animationFlag });

    await new Promise((r) => setTimeout(r, 200));

    this.setState({ tracksDropdownFlag: !this.state.tracksDropdownFlag });
  }

  render() {
    return (
      <div className="tableContainer">
        <div className="tableHeader">
          <div className="tableHeaderContainer">
            <div>
              <span
                onClick={() => {
                  this.animation();
                }}
              >
                <img src={faceIcon} alt="face icon" />
                <img src={chevron} alt="arrow icon" className="chevronSmall" />
              </span>
              {this.state.tracksDropdownFlag && (
                <TracksDropdown
                  tracks={this.props.tracks}
                  animation={this.state.animationFlag}
                  totalTestimonials={this.props.totalTestimonials}
                />
              )}
            </div>
          </div>
        </div>
        <div>asdasdasdasd</div>
      </div>
    );
  }
}
