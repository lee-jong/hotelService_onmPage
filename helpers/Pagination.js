import React, { Component } from 'react';
import PropTypes from 'prop-types';

// total                list cloum 총 수 (필수)
// dataPerPage          보여줄 cloum 수 (필수)
// handleChangePage     선택한 pageNo을 받기 위한 함수 (필수)
// nextNum              다음 페이지 시 이동 할 수 (defalt : 1)
// prevNum              이전 페이지 시 이동 할 수 (defalt : 5)
// superNextNum         슈퍼 다음 페이지 시 이동 할 수 (defalt : 1)
// superPrevNum         슈퍼 이전 페이지 시 이동 할 수 (defalt : 5)
// nextTag              원하는 Tag가 있을 시 교체 (defalt : myTag)
// prevTag                     "
// superNextTag                "
// superPrevTag                "
// paging Tag className = page  > Tag className = pagination

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNo: [],
      active: 1
    };

    this.totalPage = ''; //총 페이지의 수
    this.s_page = ''; //현재 블록의 시작 페이지
    this.e_page = ''; // 현재 블록의 끝 페이지
    this.pageSize = 5; // 한 화면에 나타낼 페이지 num 의 수
  }

  componentDidMount() {
    this.paging();
  }

  componentWillReceiveProps(nextProps) {
    this.paging(nextProps);
  }

  // total : 총 수
  // active : 현재 페이지
  // pageSize : 한 화면에 나타낼 페이지 수
  // dataPerPage : 화 화면에 나타낼 아이템 수
  // this.totalPage = Math.ceil(total / dataPerPage)

  paging = nextProps => {
    const { total, dataPerPage } = this.props;

    let active = nextProps ? nextProps.activeProps : 1;
    this.totalPage = nextProps
      ? Math.ceil(nextProps.total / dataPerPage)
      : Math.ceil(total / dataPerPage);

    let pageBlock = Math.ceil(active / this.pageSize); // 지금 현재 속한 블록

    this.s_page = (pageBlock - 1) * this.pageSize + 1; //현재 블록의 시작 페이지
    this.e_page = pageBlock * this.pageSize;

    let itemArr = [];
    if (this.totalPage <= 4) {
      for (let i = 1; i <= this.totalPage; i++) {
        itemArr.push(i);
      }
    } else if (
      active === 1 ||
      active === 2 ||
      active === 3 ||
      active === this.totalPage ||
      active === this.totalPage - 1 ||
      active === this.totalPage - 2
    ) {
      for (let i = this.s_page; i <= this.e_page; i++) {
        itemArr.push(i);
      }
    } else {
      for (let i = active - 2; i < active + 3; i++) {
        itemArr.push(i);
      }
    }
    this.setState({ pageNo: itemArr });
  };

  nextPage = pageNo => {
    const { handleChangePage, total, dataPerPage } = this.props;
    const { active } = this.state;
    let totalPage = Math.ceil(total / dataPerPage);
    if (active + pageNo > totalPage)
      return this.setState({ active: totalPage }, () =>
        handleChangePage(this.state.active)
      );

    this.setState(
      {
        active: active + pageNo
      },
      () => handleChangePage(this.state.active)
    );
  };

  prevPage = pageNo => {
    const { handleChangePage } = this.props;
    const { active } = this.state;
    if (active - pageNo < 1)
      return this.setState({ active: 1 }, () =>
        handleChangePage(this.state.active)
      );
    this.setState(
      {
        active: active - pageNo
      },
      () => handleChangePage(this.state.active)
    );
  };

  handlePage = pageNo => {
    const { handleChangePage } = this.props;
    this.setState(
      {
        active: pageNo
      },
      () => {
        handleChangePage(this.state.active);
      }
    );
  };

  render() {
    const { pageNo, active } = this.state;

    const {
      nextNum,
      superNextNum,
      prevNum,
      superPrevNum,
      nextTag,
      superNextTag,
      prevTag,
      superPrevTag
    } = this.props;
    return (
      <div className="page">
        <ul className="pagination">
          <li className={active === 1 ? 'disabled' : ''}>
            <a onClick={() => this.prevPage(superPrevNum)}>{superPrevTag}</a>
          </li>
          <li className={active === 1 ? 'disabled' : ''}>
            <a onClick={() => this.prevPage(prevNum)}>{prevTag}</a>
          </li>

          {pageNo.map(no => (
            <li
              key={no}
              onClick={() => this.handlePage(no)}
              className={active === no ? 'active' : ''}
            >
              <a>{no}</a>
            </li>
          ))}

          <li className={active === this.totalPage ? 'disabled' : ''}>
            <a onClick={() => this.nextPage(nextNum)}>{nextTag}</a>
          </li>
          <li className={active === this.totalPage ? 'disabled' : ''}>
            <a onClick={() => this.nextPage(superNextNum)}>{superNextTag}</a>
          </li>
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  dataPerPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  nextNum: PropTypes.number,
  superNextNum: PropTypes.number,
  prevNum: PropTypes.number,
  superPrevNum: PropTypes.number,
  nextTag: PropTypes.element,
  superNextTag: PropTypes.element,
  prevTag: PropTypes.element,
  superPrevTag: PropTypes.element
};

Pagination.defaultProps = {
  dataPerPage: 10,
  nextNum: 1,
  superNextNum: 5,
  prevNum: 1,
  superPrevNum: 5,
  nextTag: <i className="material-icons">chevron_right</i>,
  superNextTag: <i className="material-icons">chevron_right</i>,
  prevTag: <i className="material-icons">chevron_left</i>,
  superPrevTag: <i className="material-icons">chevron_left</i>
};

export default Pagination;
