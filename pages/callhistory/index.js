import React, { Component } from 'react';

import Pagination from '../../helpers/Pagination';
import CallHistoryList from '../../components/list/CallHistoryList';
import DatePickerList from '../../components/list/DatePickerList';
import {
  getHistory,
  getCallHistoryByGroup,
  getCallHistoryByPage,
  getCallHistoryBySearch,
  unfoldMemo,
  getCallHistoryListExcel
} from '../../actions/callHistory';
import { weekAgoDate } from '../../helpers/utils';
import SearchHistory from '../../helpers/SearchHistory';
import Cookies from 'js-cookie';

class CallHistory extends Component {
  static async getInitialProps() {
    let historyRes = {};
    try {
      historyRes = await getHistory();
    } catch (err) {
      console.error('Unexpected Error', err);
    }
    return {
      historyRes
    };
  }

  constructor(props) {
    super(props);

    this.Date = new Date();
    this.state = {
      onMemo: false, // 메모창을 띄울지 bool
      active: 1, //선택 page
      items: this.props.historyRes.result || [], //list item 의 arr
      total: this.props.historyRes.total || 1, //list item 총 수량
      dataPerPage: 10, // 페이지당 보여줄 수
      memo: '', // memo text 저장 state
      option: 'all',
      searchValue: '',
      searchType: 'room',
      startDate: weekAgoDate(this.Date),
      endDate: new Date(),
      onSearchHistory: false
    };
  }

  downloadTransectionListExcel = async () => {
    try {
      let res = await getCallHistoryListExcel();

      let blob = new Blob(['\ufeff' + res], {
        type: 'text/csv;charset=utf-8'
      });
      let blobURL = window.URL.createObjectURL(blob);
      let tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', 'TeanscationListExcel.csv');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    } catch (err) {
      console.error('Unexpected Error', err);
      this.setState({
        items: [],
        total: 1
      });
    }
  };

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

  closeMemo = () => {
    this.setState({ onMemo: !this.state.onMemo });
  };

  displayMemo = async idx => {
    try {
      let res = await unfoldMemo(idx);
      this.setState({ onMemo: !this.state.onMemo, memo: res.memo });
    } catch (err) {
      console.error('Unexpected Error', err);
    }
  };

  handleChangePage = async pageNo => {
    const { option, searchValue, startDate, endDate } = this.state;
    let data = {
      option,
      searchValue,
      active: pageNo,
      b2bSeq: 1,
      startDate,
      endDate
    };
    try {
      const res = await getCallHistoryByPage(data);
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

  historyBySearchType = async e => {
    this.setState({
      searchType: e.target.value
    });
  };

  historyByGroup = async e => {
    let groupValue = e.target.value;
    try {
      const { searchValue, startDate, endDate } = this.state;

      let groupData = {
        searchValue: searchValue,
        active: 1,
        option: groupValue,
        b2bSeq: 1,
        startDate: startDate,
        endDate: endDate
      };
      const res = await getCallHistoryByGroup(groupData);
      this.setState({
        items: res.result,
        total: res.total,
        option: groupValue,
        active: 1
      });
    } catch (err) {
      console.error('Unexpected Error', err);
      this.setState({
        items: [],
        total: 1,
        option: groupValue,
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
  historyBySearch = async e => {
    const { option, searchType, startDate, endDate, searchValue } = this.state;

    let storedhistory = Cookies.get('searchHistory')
      ? Cookies.getJSON('searchHistory')
      : [];
    let addStoredhistory = storedhistory.concat(searchValue);
    let deduplication = addStoredhistory.filter(
      (item, pos, self) => self.indexOf(item) == pos
    );
    Cookies.set('searchHistory', deduplication);

    let data = {
      active: 1,
      option,
      searchValue,
      searchType,
      b2bSeq: 1,
      startDate,
      endDate
    };
    try {
      const res = await getCallHistoryBySearch(data);
      this.setState({
        items: res.result,
        total: res.total,
        searchValue,
        active: 1
      });
    } catch (err) {
      console.error('Unexpected Error', err);
      this.setState({
        items: [],
        total: 1,
        actvie: 1
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
      onMemo,
      active,
      total,
      items,
      memo,
      dataPerPage,
      startDate,
      endDate,
      searchValue,
      onSearchHistory
    } = this.state;
    return (
      <div className="content-container">
        <div className="content-box">
          <div className="title">통화 내역 </div>

          <div className="content">
            <div className="search input">
              <div>
                <select
                  className="browser-default"
                  value={this.state.option}
                  onChange={this.historyByGroup}
                >
                  <option value="all"> 전체</option>
                  <option value="CODE_101">프론트</option>
                  <option value="CODE_102">예약문의</option>
                  <option value="CODE_103">룸서비스</option>
                  <option value="CODE_104">하우스키핑</option>
                </select>
              </div>
              <div>
                <DatePickerList
                  startDate={startDate}
                  endDate={endDate}
                  handleChangeStart={this.handleChangeStart}
                  handleChangeEnd={this.handleChangeEnd}
                />
                <select
                  className="browser-default"
                  value={this.state.searchType}
                  onChange={this.historyBySearchType}
                >
                  <option value="room"> 객실 </option>
                  <option value="user">상담사 </option>
                </select>

                <input
                  type="text"
                  value={searchValue}
                  name="searchValue"
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
                  onMouseDown={this.historyBySearch}
                  className="waves-effect waves-light"
                >
                  검색
                </a>
              </div>
            </div>
            <div className="table list">
              <table>
                <colgroup>
                  <col width="5%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="20%" />
                  <col width="10%" />
                  <col width="15%" />
                  <col width="10%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>착/발신 시간</th>
                    <th>객실</th>
                    <th>요청부서</th>
                    <th>처리부서</th>
                    <th>상담사ID</th>
                    <th>총 통화 시간</th>
                    <th>메모</th>
                  </tr>
                </thead>
                <CallHistoryList
                  items={items}
                  active={active}
                  displayMemo={this.displayMemo}
                />
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
        {onMemo ? (
          <div className="popupBox">
            <div className="popupBoxInner">
              <h1 className="popupTitle">{memo}</h1>
              <button onClick={this.closeMemo}> 닫기</button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default CallHistory;
