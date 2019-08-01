import React, { Component } from 'react';
import Router from 'next/router';
import Pagination from '../../helpers/Pagination';
import ManagementList from '../../components/list/ManagementList';
import {
  getManagementsByPage,
  getManagementsByGroup,
  searchManagements
} from '../../actions/management';
import SearchHistory from '../../helpers/SearchHistory';
import Cookies from 'js-cookie';

class Management extends Component {
  static async getInitialProps() {
    let pageData = {
      active: 1,
      option: 'all',
      keyword: '',
      b2bSeq: 1
    };

    let management = {};

    try {
      management = await getManagementsByPage(pageData);
    } catch (err) {
      console.error('Unexpected Error', err);
    }

    return {
      management
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      active: 1,
      items: this.props.management.result || [],
      total: this.props.management.result ? this.props.management.total : 0,
      dataPerPage: 10,
      option: 'all',
      searchValue: '',
      onSearchHistory: false
    };
  }

  goToCreatePage = () => {
    const href = `/management/create`;
    Router.push(href);
  };

  goToDetailPage = id => {
    const href = `/management/detail?id=${id}`;
    Router.push(href);
  };

  handleChangePage = async pageNo => {
    const { searchValue, option } = this.state;
    let pageData = {
      searchValue,
      option,
      active: pageNo,
      b2bSeq: 1
    };
    try {
      const res = await getManagementsByPage(pageData);
      this.setState({
        items: res.result,
        total: res.total,
        active: pageNo,
        option
      });
    } catch (err) {
      console.error('Unexpected Error', err);
      this.setState({
        items: [],
        total: 1,
        active: 1
      });
    }
  };

  handleManagementByGroup = async e => {
    const { searchValue } = this.state;
    let optionValue = e.target.value;
    try {
      let searchData = {
        searchValue,
        option: optionValue,
        active: 1,
        b2bSeq: 1
      };

      let res = await getManagementsByGroup(searchData);
      this.setState({
        items: res.result,
        total: res.total,
        option: optionValue,
        active: 1
      });
    } catch (err) {
      console.error('Unexpected Error', err);
      this.setState({
        items: [],
        total: 1,
        option: optionValue,
        active: 1
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });

    if (e.target.value.length >= 1)
      return this.setState({ onSearchHistory: true });
    if (e.target.value.length <= 0)
      return this.setState({ onSearchHistory: false });
  };

  handleManagementBySearch = async e => {
    const { option, searchValue } = this.state;

    //검색 history 관련
    let storedhistory = Cookies.get('searchHistory')
      ? Cookies.getJSON('searchHistory')
      : [];
    let addStoredhistory = storedhistory.concat(searchValue);

    let deduplication = addStoredhistory.filter(
      (item, pos, self) => self.indexOf(item) == pos
    );
    Cookies.set('searchHistory', deduplication);
    //

    let searchData = {
      searchValue,
      active: 1,
      option,
      b2bSeq: 1
    };

    try {
      let res = await searchManagements(searchData);
      this.setState({
        items: res.result,
        total: res.total,
        option: option
      });
    } catch (err) {
      console.error('Unexpected Error', err);
      this.setState({
        items: [],
        total: 1,
        active: 1
      });
    }
  };

  handleBlur = () => {
    this.setState({ onSearchHistory: false });
  };

  transitionToHistory = value => {
    this.setState({ searchValue: value });
  };

  render() {
    const {
      items,
      total,
      dataPerPage,
      searchValue,
      onSearchHistory
    } = this.state;
    return (
      <div className="content-container">
        <div className="content-box">
          <div className="title">상담사 관리</div>

          <div className="content">
            <div className="search input">
              <select
                className="browser-default"
                value={this.state.option}
                onChange={this.handleManagementByGroup}
              >
                <option value="all"> 전체</option>
                <option value="CODE_101">프론트</option>
                <option value="CODE_102">예약문의</option>
                <option value="CODE_103">룸서비스</option>
                <option value="CODE_104">하우스키핑</option>
              </select>
              <input
                type="text"
                name="searchValue"
                value={searchValue}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoComplete="off"
              />
              <SearchHistory
                searchValue={searchValue}
                onSearchHistory={onSearchHistory}
                searchChange={this.transitionToHistory}
              />
              <a
                onMouseDown={this.handleManagementBySearch}
                className="waves-effect waves-light"
              >
                검색
              </a>
            </div>
            <div className="table list">
              <table>
                <colgroup>
                  <col width="5%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="20%" />
                  <col width="20%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>그룹</th>
                    <th>ID</th>
                    <th>계정 생성일</th>
                    <th>대표 ID 설정</th>
                  </tr>
                </thead>
                <ManagementList
                  goToDetailPage={this.goToDetailPage}
                  items={items}
                />
              </table>
            </div>
            <Pagination
              total={total}
              dataPerPage={dataPerPage}
              handleChangePage={this.handleChangePage}
              nextNum={1}
              superNextNum={5}
              prevNum={1}
              superPrevNum={5}
            />
            <button onClick={this.goToCreatePage}>계정 생성</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Management;
