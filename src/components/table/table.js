import React from "react";
import "./style.css";
import faceIcon from "../../images/faceIcon.svg";
import chevron from "../../images/chevron.svg";
import TracksDropdown from "../tracksDropdown/tracksDropsown";
import RelativeTime from '@yaireo/relative-time'

const relativeTime = new RelativeTime();

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

  componentDidMount() {
    console.table(this.props.testimonials);
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
        {this.props.testimonials.map((x, index) => {
          return (
            <a href="https://www.youtube.com" className="row" key={index}>
              <div>
                <img src={x.track.icon_url} className="logo" alt="logo" />
              </div>
              <div>
                <img
                  src={x.mentor.avatar_url}
                  className="userProfile"
                  alt="profile"
                />
              </div>
              <div>
                <span>{x.mentor.handle}</span>
                <span>
                  on {x.exercise.title} in {x.track.title}
                </span>
              </div>
              <div>{x.content}</div>
              <div>{relativeTime.from(new Date(x.created_at))}</div>
              <div><img src={chevron} alt="arrow icon" className="chevronSmall" /></div>
            </a>
          );
        })}
      </div>
    );
  }
}
