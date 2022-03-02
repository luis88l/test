import React from "react";
import "./style.css";
import faceIcon from "../../images/faceIcon.svg";

export default class TracksDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: {},
      showMore: false,
      animationFlag:false
    };
  }

  async animation() {
    this.setState({ animationFlag: !this.state.animationFlag });

    await new Promise((r) => setTimeout(r, 200));

    this.setState({ showMore: !this.state.showMore });
  }

  render() {
    return (
      <div className={`tracksContainer ${this.props.animation}`}>
        <ul>
          <li>
            <input type="radio" value={"all"} />
            <img src={faceIcon} alt="face icon" />
            <span>All</span>
            <span>{this.props.totalTestimonials}</span>
          </li>
          {this.props.tracks
            .filter((item, index) => index < 5)
            .map((x, index) => {
              return (
                <li key={index}>
                  <input type="radio" value={x.name} />
                  <img
                    src={x.icon}
                    alt={`${x.title} icon`}
                  />
                  <span>{x.title}</span>
                  <span>{x.value}</span>
                </li>
              );
            })}
          {this.state.showMore &&
            this.props.tracks
              .filter((item, index) => index > 4)
              .map((x, index) => {
                return (
                  <li key={index} className={`${this.state.animationFlag}`}>
                    <input type="radio" value={x.name} />
                    <img src={x.icon} alt={`${x.title} icon`} />
                    <span>{x.title}</span>
                    <span>{x.value}</span>
                  </li>
                );
              })}
        </ul>
        <span
          onClick={() => {
            this.animation();
          }}
        >
          {!this.state.showMore? "Show more" : "Show less"}
        </span>
      </div>
    );
  }
}
