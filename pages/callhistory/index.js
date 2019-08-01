import React, { Component } from 'react';

import Pagination from '../../helpers/Pagination';
import CallHistoryList from '../../components/list/CallHistoryList';
import {
  getHistory,
  getCallHistoryByGroup,
  getCallHistoryByPage,
  getCallHistoryBySearch,
  unfoldMemo,
  getCallHistoryListExcel
} from '../../actions/callHistory';
import { getDate } from '../../helpers/utils';

// 이걸로 쓰게 되면 css는 header에
// 그리고 object 반환 하므로 JSON 사용해서 string 으로 변환
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CallHistory extends Component {
  static async getInitialProps() {
    let historyRes = {};
    try {
      historyRes = await getHistory();
    } catch (err) {
      console.log('err', err);
    }
    return {
      historyRes
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      onMemo: false, // 메모창을 띄울지 bool
      active: 1, //선택 page

      items: this.props.historyRes.result || [], //list item 의 arr
      total: this.props.historyRes.total || 1, //list item 총 수량
      dataPerPage: 10, // 페이지당 보여줄 수
      memo: '', // memo text 저장 state
      option: '',
      searchValue: '',
      searchType: 'room',
      startDate: new Date(),
      endDate: new Date()
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
      console.log('err', err);
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
  // 여기서 api 호출 후 메모에 데이터 넣으면 됨
  displayMemo = async idx => {
    try {
      let res = await unfoldMemo(idx);
      this.setState({ onMemo: !this.state.onMemo, memo: res.memo });
    } catch (err) {
      console.log('err', err);
    }
  };

  handleChangePage = async pageNo => {
    const { option, searchValue } = this.state;
    let data = {
      option: option,
      searchValue: searchValue,
      active: pageNo,
      b2bSeq: 1
    };
    try {
      const res = await getCallHistoryByPage(data);
      this.setState({
        items: res.result,
        total: res.total,
        active: pageNo
      });
    } catch (err) {
      console.log('handlePageChage err', err);
    }
  };

  historyBySearchType = async e => {
    this.setState({
      searchType: e.target.value
    });
  };

  historyByGroup = async e => {
    try {
      const { searchValue, active } = this.state;
      let groupValue = e.target.value;
      let groupData = {
        searchValue: searchValue,
        active: active,
        option: groupValue,
        b2bSeq: 1
      };
      const res = await getCallHistoryByGroup(groupData);

      this.setState({
        items: res.result,
        total: res.total,
        option: groupData.group
      });
    } catch (err) {
      console.log(' historyByGroup err', err);
      this.setState({
        items: [],
        total: 1
      });
    }
  };

  historyBySearch = async e => {
    const { option, searchType, startDate, endDate, active } = this.state;
    console.log('startDate', typeof startDate);
    console.log('endDate', endDate);

    let searchValue = e.target.previousSibling.value;
    let data = {
      active: active,
      option: option,
      searchValue: searchValue,
      searchType: searchType,
      b2bSeq: 1,
      startDate: startDate,
      endDate: endDate
    };

    try {
      const res = await getCallHistoryBySearch(data);
      this.setState({
        items: res.result,
        total: res.total,
        searchValue: searchValue
      });
      console.log('res:::', res);
    } catch (err) {
      console.log('historyBySearch err', err);
    }
  };

  render() {
    const { onMemo, active, total, items, memo, dataPerPage } = this.state;
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
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={this.state.startDate}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeStart}
                />
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={this.state.endDate}
                  selectsEnd
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeEnd}
                  minDate={this.state.startDate}
                />
                <select
                  className="browser-default"
                  value={this.state.searchType}
                  onChange={this.historyBySearchType}
                >
                  <option value="room"> 객실 </option>
                  <option value="user">상담사 </option>
                </select>

                <input type="text" />
                <a
                  onClick={this.historyBySearch}
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
            <button onClick={() => this.downloadTransectionListExcel()}>
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
