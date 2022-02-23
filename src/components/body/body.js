import React from "react";
import "./style.css";
import smileyFace from "../../images/smileyFace.svg";
import iconoLineas from "../../images/vector.svg";
import Table from "../table/table";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTestimonials: 0,
      testimonials: [],
      tracks: {},
    };
  }

  componentDidMount() {
    this.iniciacion();
  }

  async iniciacion() {
    await fetch("https://exercism.org/api/v2/hiring/testimonials", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.table(data);
        let entries = Object.entries(data.testimonials.track_counts);

        let sorted = entries.sort((a, b) => b[1] - a[1]);
        this.setState({
          totalTestimonials: data.testimonials.pagination.total_count,
          tracks: sorted,
          testimonials: data.testimonials.results,
        });
      });
  }

  render() {
    return (
      <>
        <div className="baner">
          <img src={smileyFace} alt="smile icon" />
          <div>
            <h2>Testimonials I’ve left</h2>
            <span>{this.state.totalTestimonials}</span>
          </div>
          <img src={iconoLineas} alt="icono" />
        </div>
        <Table
          totalTestimonials={this.state.totalTestimonials}
          tracks={this.state.tracks}
          testimonials={this.state.testimonials}
        />
      </>
    );
  }
}
