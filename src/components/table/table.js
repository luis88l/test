import React from "react";
import "./style.css";
import faceIcon from "../../images/faceIcon.svg";
import chevron from "../../images/chevron.svg";
import arrowSide from "../../images/arrowSide.svg";
import TracksDropdown from "../tracksDropdown/tracksDropsown";
import RelativeTime from "@yaireo/relative-time";

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
    };
  }

  componentDidMount() {
    console.log(this.props.pagination);
    this.paginationIni(this.props.pagination);
    this.setState({
      testimonials: this.props.testimonials.slice(0, 10),
      testimonialsAux: this.props.testimonials.slice(10),
      totalPages: this.props.pagination.total_pages * 2,
      // range: this.pageRange(1, this.props.pagination.total_pages * 2),
    });
  }

  async animation() {
    this.setState({ animationFlag: !this.state.animationFlag });

    await new Promise((r) => setTimeout(r, 200));

    this.setState({ tracksDropdownFlag: !this.state.tracksDropdownFlag });
  }

  pageRange(start, end) {
    console.log(start, end);
    let length = end - start + 1;

    console.log(length);
    console.log(Array.from({ length }, (_, idx) => idx + start));

    return Array.from({ length }, (_, idx) => idx + start);
  }

  paginationIni(pages) {
    console.log(pages);
    if (pages.total_pages < 7) {
      this.setState({
        range: this.pageRange(1, pages.total_pages),
      });
    } else if (pages.total_pages) {
      let auxArray = [];
      auxArray = auxArray.concat(this.pageRange(1, 3));
      auxArray.push("dots");
      auxArray = auxArray.concat(
        this.pageRange(pages.total_pages * 2 - 2, pages.total_pages * 2)
      );

      console.log(auxArray);

      this.setState({
        range: auxArray,
      });
    }
  }

  changePage(nextPage) {
    console.log(this.props.pagination.total_pages * 2 - nextPage);
    if (
      this.props.pagination.total_pages * 2 - nextPage < 7 &&
      this.props.pagination.total_pages * 2 - nextPage >= 23
    ) {
      this.setState({
        currentPage: nextPage,
        range: this.pageRange(nextPage, this.props.pagination.total_pages * 2),
      });
    } else if (
      this.props.pagination.total_pages * 2 - nextPage < 6 
    ) {
      let auxArray = [];
      auxArray.push(nextPage - 1);
      auxArray = auxArray.concat(
        this.pageRange(nextPage, this.props.pagination.total_pages * 2)
      );
      this.setState({
        currentPage: nextPage,
        range: auxArray,
      });
    } else {
      let auxArray = [];
      auxArray.push(nextPage - 1);
      auxArray = auxArray.concat(this.pageRange(nextPage, nextPage + 1));
      auxArray.push("dots");
      auxArray = auxArray.concat(
        this.pageRange(
          this.props.pagination.total_pages * 2 - 2,
          this.props.pagination.total_pages * 2
        )
      );

      console.log(auxArray);

      this.setState({
        currentPage: nextPage,
        range: auxArray,
      });
    }
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
                  totalTestimonials={this.props.pagination.total_count}
                />
              )}
            </div>
          </div>
        </div>
        <div>
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
        <div className="pagination">
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
        </div>
      </div>
    );
  }
}
