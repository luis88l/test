import React from "react";
import "./style.css";
import faceIcon from "../../images/faceIcon.svg";

const nombres = {
  c: "C",
  cpp: "C++",
  csharp: "C#",
  fsharp: "F#",
  go: "Go",
  java: "Java",
  javascript: "Javascript",
  php: "PHP",
  python: "Python",
  ruby: "Ruby",
  rust: "Rust",
  scala: "Scala",
  typescript: "Typescript",
};

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
                  <input type="radio" value={x[0]} />
                  <img
                    src={require(`../../images/${x[0]}.svg`)}
                    alt={`${x[0]} icon`}
                  />
                  <span>{nombres[x[0]]}</span>
                  <span>{x[1]}</span>
                </li>
              );
            })}
          {this.state.showMore &&
            this.props.tracks
              .filter((item, index) => index > 4)
              .map((x, index) => {
                return (
                  <li key={index} className={`${this.state.animationFlag}`}>
                    <input type="radio" value={x[0]} />
                    <img
                      src={require(`../../images/${x[0]}.svg`)}
                      alt={`${x[0]} icon`}
                    />
                    <span>{nombres[x[0]]}</span>
                    <span>{x[1]}</span>
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
