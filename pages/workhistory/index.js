import React, { Component } from 'react';
import Pagination from '../../helpers/Pagination';
import WorkHistory from '../../components/list/WorkHistoryList';
import DatePickerList from '../../components/list/DatePickerList';
import {
  getWorkHistory,
  getHistoryByGroup,
  searchHistory,
  getTeanscationListExcel
} from '../../actions/workHistory';
import { weekAgoDate } from '../../helpers/utils';
import SearchHistory from '../../helpers/SearchHistory';
import Cookies from 'js-cookie';

class workHistory extends Component {
  static async getInitialProps() {
    let pageData = {
      active: 1,
      option: 'all',
      keyword: ''
    };

    let workHistory = {};

    try {
      workHistory = await getWorkHistory(pageData);
    } catch (err) {
      console.error('Unexpected Error', err);
    }

    return {
      workHistory
    };
  }
  constructor(props) {
    super(props);

    this.Date = new Date();
    this.state = {
      active: 1,
      items: this.props.workHistory.result || [],
      total: this.props.workHistory.total || 1,
      dataPerPage: 10,
      option: 'all',
      searchValue: '',
      startDate: weekAgoDate(this.Date),
      endDate: new Date(),
      searchValue: '',
      onSearchHistory: false
    };
  }

  handleChangeStart = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDate: date
    });
  };

  handleChangePage = async pageNo => {
    const { searchValue, option, startDate, endDate } = this.state;
    let pageData = {
      searchValue: searchValue,
      option: option,
      active: pageNo,
      startDate: startDate,
      endDate: endDate
    };
    try {
      const res = await getWorkHistory(pageData);
      this.setState({
        items: res.result,
        total: res.total,
        active: pageNo
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

  handleHistoryByGroup = async e => {
    const { searchValue, active, startDate, endDate } = this.state;
    let optionValue = e.target.value;
    try {
      let searchData = {
        searchValue: searchValue,
        option: optionValue,
        active: active,
        startDate: startDate,
        endDate: endDate
      };
      let res = await getHistoryByGroup(searchData);
      this.setState({
        items: res.result,
        total: res.total,
        option: optionValue
      });
    } catch (err) {
      console.error('Unexpected Error', err);
      this.setState({
        items: [],
        total: 1,
        option: optionValue
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

  handleHistoryBySearch = async e => {
    const { option, active, startDate, endDate, searchValue } = this.state;

    let storedhistory = Cookies.get('searchHistory')
      ? Cookies.getJSON('searchHistory')
      : [];
    let addStoredhistory = storedhistory.concat(searchValue);
    let deduplication = addStoredhistory.filter(
      (item, pos, self) => self.indexOf(item) == pos
    );
    Cookies.set('searchHistory', deduplication);

    let searchData = {
      searchValue,
      active,
      option,
      startDate,
      endDate
    };

    try {
      let res = await searchHistory(searchData);
      this.setState({
        items: res.result,
        total: res.total,
        searchValue: searchValue
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

  downloadTransectionListExcel = async () => {
    try {
      let res = await getTeanscationListExcel();

      let blob = new Blob(['\ufeff' + res], {
        type: 'text/csv;charset=utf-8'
      });
      let blobURL = window.URL.createObjectURL(blob);
      let tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', 'workHistory.csv');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    } catch (err) {
      console.error('Unexpected Error', err);
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
      total,
      dataPerPage,
      items,
      active,
      option,
      startDate,
      endDate,
      searchValue,
      onSearchHistory
    } = this.state;
    return (
      <div className="content-container">
        <div className="content-box">
          <div className="title">상담사 관리</div>

          <div className="content">
            <div className="search input">
              <DatePickerList
                startDate={startDate}
                endDate={endDate}
                handleChangeStart={this.handleChangeStart}
                handleChangeEnd={this.handleChangeEnd}
              />

              <select
                className="browser-default"
                value={option}
                onChange={this.handleHistoryByGroup}
              >
                <option value="all"> 전체</option>
                <option value="b2b"> 관리자 </option>
                <option value="consultant"> 상담사 </option>
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
                className="waves-effect waves-light"
                onMouseDown={this.handleHistoryBySearch}
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
                  <col width="10%" />
                  <col width="30%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>계정</th>
                    <th>계정타입</th>
                    <th>이벤트</th>
                    <th>발행시간</th>
                  </tr>
                </thead>
                <WorkHistory items={items} />
              </table>
            </div>

            <Pagination
              total={total}
              dataPerPage={dataPerPage}
              activeProps={active}
              handleChangePage={this.handleChangePage}
            />
            <button onClick={this.downloadTransectionListExcel}>
              excel download
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default workHistory;
