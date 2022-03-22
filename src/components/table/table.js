import React from "react";
import "./style.css";
import faceIcon from "../../images/faceIcon.svg";
import chevron from "../../images/chevron.svg";
import TracksDropdown from "../tracksDropdown/tracksDropsown";
import RelativeTime from "@yaireo/relative-time";
import Loader from "../loader/loader";
import Pagination from "../pagination/pagination";

const relativeTime = new RelativeTime();

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonials: [],
      testimonialsAux: [],
      tracks: {},
      tracksDropdownFlag: false,
      animationFlag: false,
      currentPage: 1,
      auxPage: 2,
      totalPages: 0,
      range: [],
      loading: true,
      url: "https://exercism.org/api/v2/hiring/testimonials?",
      orderUrl: "newest_first",
      numberOfPages: 20,
    };
  }

  componentDidMount() {
    // console.log(this.props.testimonials);
    this.setState({
      testimonials: this.props.testimonials.slice(0, 10),
      testimonialsAux: this.props.testimonials.slice(10),
      totalPages:
        this.props.pagination.total_pages * this.state.numberOfPages -
          this.props.pagination.total_count >
        10
          ? this.props.pagination.total_pages * 2 - 1
          : this.props.pagination.total_pages * 2,
      loading: false,
      // range: this.pageRange(1, this.props.pagination.total_pages * 2),
    });
  }

  async animation() {
    this.setState({ animationFlag: !this.state.animationFlag });

    await new Promise((r) => setTimeout(r, 200));

    this.setState({ tracksDropdownFlag: !this.state.tracksDropdownFlag });
  }

  async getDataByPage(filter) {
    console.log("enre");
    this.setState({ loading: true });
    let url = this.state.url,
      y = filter % 2,
      x = 0;

    console.log(y);
    console.log(y === 0 ? filter - 1 : filter + 1);

    if (y === 0) {
      x = filter / 2;
    } else {
      x = (filter + 1) / 2;
    }
    url = url.concat("page=" + x);

    url = url.concat("&order=" + this.state.orderUrl);

    await fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let tes =
            y === 0
              ? data.testimonials.results.slice(10)
              : data.testimonials.results.slice(0, 10),
          tesAux =
            y === 0
              ? data.testimonials.results.slice(0, 10)
              : data.testimonials.results.slice(10),
          pageAux = y === 0 ? filter - 1 : filter + 1;

        console.log(tes);
        console.log(tesAux);

        this.setState(
          {
            testimonials: tes,
            testimonialsAux: tesAux,
            auxPage: pageAux,
            loading: false,
          },
          () => {
            console.log(this.state.auxPage);
          }
        );
      });
    console.log(url);
  }

  getTestimonials(url) {}

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
                  totalTestimonials={this.props.pagination.total_count}
                />
              )}
            </div>
          </div>
        </div>
        <div className="rowContainer">
          {this.state.loading && <Loader />}
          {this.state.testimonials.map((x, index) => {
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
                <div>
                  <img
                    src={chevron}
                    alt="arrow icon"
                    className="chevronSmall"
                  />
                </div>
              </a>
            );
          })}
        </div>
        <Pagination totalPages={this.state.totalPages} />
        {/* <div className="pagination">
          <button
            className={`buttonPrevious ${
              this.state.currentPage === 1 ? "" : "enable"
            }`}
            onClick={() => {
              this.changePage(this.state.currentPage - 1);
            }}
            disabled={this.state.currentPage === 1 ? true : false}
          >
            <img src={arrowSide} alt="arrow icon" />
            <span>Previous</span>
          </button>
          <div className="paginationPills">
            {this.state.range.map((x, index) => {
              if (x === "dots") {
                return (
                  <button key={index} className="dots">
                    ...
                  </button>
                );
              }
              return (
                <button
                  key={index}
                  className={`pill ${
                    this.state.currentPage === x ? "selected" : ""
                  }`}
                  onClick={() => this.changePage(x)}
                >
                  {x}
                </button>
              );
            })}
          </div>
          <button
            className={`buttonNext ${
              this.state.currentPage === this.state.totalPages ? "" : "enable"
            }`}
            onClick={() => {
              this.changePage(this.state.currentPage + 1);
            }}
            disabled={
              this.state.currentPage === this.props.pagination.total_pages * 2
                ? true
                : false
            }
          >
            <span>Next</span>
            <img src={arrowSide} alt="arrow icon" />
          </button>
        </div> */}
      </div>
    );
  }
}
