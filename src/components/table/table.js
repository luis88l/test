import React from "react";
import "./style.css";
import faceIcon from "../../images/faceIcon.svg";
import chevron from "../../images/chevron.svg";
import arrowSide from "../../images/arrowSide.svg";
import TracksDropdown from "../tracksDropdown/tracksDropsown";
import RelativeTime from "@yaireo/relative-time";
import Loader from "../loader/loader";

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
      orderUrl: "newest_first"
    };
  }

  componentDidMount() {
    console.log(this.state.loading);
    // console.log(this.props.testimonials);
    this.paginationIni(this.props.pagination);
    this.setState({
      testimonials: this.props.testimonials.slice(0, 10),
      testimonialsAux: this.props.testimonials.slice(10),
      totalPages: this.props.pagination.total_pages * 2,
      loading: false,
      // range: this.pageRange(1, this.props.pagination.total_pages * 2),
    });
  }

  async animation() {
    this.setState({ animationFlag: !this.state.animationFlag });

    await new Promise((r) => setTimeout(r, 200));

    this.setState({ tracksDropdownFlag: !this.state.tracksDropdownFlag });
  }

  pageRange(start, end) {
    // console.log(start, end);
    let length = end - start + 1;

    // console.log(length);
    // console.log(Array.from({ length }, (_, idx) => idx + start));

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

      // console.log(auxArray);

      this.setState({
        range: auxArray,
      });
    }
  }

  changePage(nextPage) {
    if (nextPage !== this.state.currentPage) {
      this.tablePopulation(nextPage);
      // console.log(this.props.pagination.total_pages * 2 - nextPage);
      if (
        this.props.pagination.total_pages * 2 - nextPage < 7 &&
        this.props.pagination.total_pages * 2 - nextPage >= 23
      ) {
        this.setState({
          currentPage: nextPage,
          range: this.pageRange(
            nextPage,
            this.props.pagination.total_pages * 2
          ),
        });
      } else if (this.props.pagination.total_pages * 2 - nextPage < 6) {
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

        if (nextPage !== 1) {
          auxArray.push(nextPage - 1);
          auxArray = auxArray.concat(this.pageRange(nextPage, nextPage + 1));
        } else {
          auxArray = auxArray.concat(this.pageRange(nextPage, nextPage + 2));
        }

        auxArray.push("dots");
        auxArray = auxArray.concat(
          this.pageRange(
            this.props.pagination.total_pages * 2 - 2,
            this.props.pagination.total_pages * 2
          )
        );

        // console.log(auxArray);

        this.setState({
          currentPage: nextPage,
          range: auxArray,
        });
      }
    }
  }

  tablePopulation(page) {
    console.log(page);
    if (page === this.state.auxPage) {
      this.setState({
        testimonials: this.state.testimonialsAux,
        testimonialsAux: this.state.testimonials,
        auxPage: this.state.currentPage,
      });
    } else {
      this.getDataByPage(page);
    }
  }

  async getDataByPage(filter) {
    console.log("enre")
    this.setState({loading:true})
    let url = this.state.url,
      y = filter % 2,
      x = 0

      console.log(y)
      console.log( y === 0 ? filter - 1 : filter + 1)

    if (y === 0) {
      x = filter / 2;
    } else {
      x = (filter + 1) / 2;
    }
    url = url.concat("page=" + x);

    url = url.concat("&order="+this.state.orderUrl)

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
              pageAux = y === 0 ? filter - 1 : filter + 1

        console.log(tes);
        console.log(tesAux);

        this.setState({
          testimonials: tes,
          testimonialsAux: tesAux,
          auxPage: pageAux,
          loading:false
        },()=>{console.log(this.state.auxPage)});
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
