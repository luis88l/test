import React from "react";
import "./style.css";
import arrowSide from "../../images/arrowSide.svg";

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: {},
      showMore: false,
      animationFlag: false,
      currentPage: 1,
      auxPage: 2,
      range: [],
    };
  }

  componentDidMount() {
    this.paginationIni(this.props.pagination);
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

  render() {
    return (
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
    );
  }
}
