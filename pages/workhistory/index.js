import React, { Component } from 'react';
import Pagination from '../../helpers/Pagination';
import WorkHistory from '../../components/list/WorkHistoryList';
import {
  getWorkHistory,
  getHistoryByGroup,
  searchHistory,
  getTeanscationListExcel
} from '../../actions/workHistory';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
      console.log('err', err.message);
    }

    return {
      workHistory
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      active: 1,
      items: this.props.workHistory.result || [],
      total: this.props.workHistory.result.length || 1,
      dataPerPage: 10, // 페이지당 보여줄 수
      option: '',
      searchValue: '',
      startDate: new Date(),
      endDate: new Date()
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
    const { searchValue, option } = this.state;
    let pageData = {
      searchValue: searchValue,
      option: option,
      active: pageNo
    };
    try {
      const res = await getWorkHistory(pageData);
      this.setState({
        items: res.result,
        total: res.result.length,
        active: pageNo
      });
    } catch (err) {
      console.log('handleChangePage err', err);
    }
  };

  handleHistoryByGroup = async e => {
    const { searchValue, active } = this.state;
    try {
      let searchData = {
        searchValue: searchValue,
        option: e.target.value,
        active: active
      };
      let res = await getHistoryByGroup(searchData);
      this.setState({
        items: res.result,
        total: res.result.length,
        option: searchData.option
      });
    } catch (err) {
      console.log('managementsByGroup err', err);
    }
  };

  handleHistoryBySearch = async e => {
    const { option, active, startDate, endDate } = this.state;
    let searchValue = e.target.previousSibling.value;
    let searchData = {
      searchValue: searchValue,
      active: active,
      option: option,
      startDate: startDate,
      endDate: endDate
    };

    try {
      let res = await searchHistory(searchData);
      this.setState({
        items: res.result,
        total: res.result.length,
        searchValue: searchValue
      });
    } catch (err) {
      console.log('managementsBySearch err', err);
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
      console.log('err', err);
    }
  };

  render() {
    const { total, dataPerPage, items, active, option } = this.state;
    return (
      <div className="content-container">
        <div className="content-box">
          <div className="title">상담사 관리</div>

          <div className="content">
            <div className="search input">
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
                value={option}
                onChange={this.handleHistoryByGroup}
              >
                <option value="all"> 전체</option>
                <option value="b2b"> 관리자 </option>
                <option value="consultant"> 상담사 </option>
              </select>
              <input type="text" />
              <a
                className="waves-effect waves-light"
                onClick={this.handleHistoryBySearch}
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
            <button onClick={() => this.downloadTransectionListExcel()}>
              {' '}
              excel download
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default workHistory;
