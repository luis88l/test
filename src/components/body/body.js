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
      pagination:{}
    };
  }

  componentDidMount() {
    this.iniciacion();
  }

  async iniciacion() {
    await fetch(
      "https://exercism.org/api/v2/hiring/testimonials?page=1&&order=newest_first",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.table(data);

        this.getTracks(data.testimonials.track_counts);

        this.setState({
          totalTestimonials: data.testimonials.pagination.total_count,
          testimonials: data.testimonials.results,
          pagination: data.testimonials.pagination
        });
      });
  }

  async getTracks(array) {
    await fetch("https://exercism.org/api/v2/tracks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let arrayTraks = [];

        for (let a in array) {
          let r = data.tracks.find(({ slug }) => slug === a);
          arrayTraks.push({
            name: r.slug,
            title: r.title,
            icon: r.icon_url,
            value: array[a],
          });
        }

        let x = arrayTraks.slice(0);
        x.sort(function (a, b) {
          return b.value - a.value;
        });

        this.setState({
          tracks: x,
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
            <span>{this.state.pagination.total_count}</span>
          </div>
          <img src={iconoLineas} alt="icono" />
        </div>
        <Table
          tracks={this.state.tracks}
          testimonials={this.state.testimonials}
          pagination={this.state.pagination}
        />
      </>
    );
  }
}
