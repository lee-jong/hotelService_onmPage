import React, { Component } from 'react';
import Router from 'next/router';
import Pagination from '../../helpers/Pagination';
import ManagementList from '../../components/list/ManagementList';
import {
  getManagementsByPage,
  getManagementsByGroup,
  searchManagements
} from '../../actions/management';

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
      console.log('err', err.message);
    }

    return {
      management
    };
  }

  constructor(props) {
    super(props);

    // 리펙토링 1. 구조분해
    /**
     * const { result, total } = props.management;
     * 아래 this.props.mangement 바꾸기.
     */

    this.state = {
      active: 1,
      items: this.props.management.result || [],
      total: this.props.management.result ? this.props.management.total : 0,
      // 리펙토링 2. dataPerPage 스테이트로 관리 할 필요 없음.
      // 상수로 상단에 빼놓기 const DATA_PER_PAGE = 10
      dataPerPage: 10,
      option: '',
      searchValue: ''
    };
  }
  // 리펙토링
  // 대문자로 메소드 시작?
  // goToCreatePate로 변경
  MoveAddManagementPage = () => {
    const href = `/management/create`;
    Router.push(href);
  };

  // 리펙토링
  // 대문자로 메소드 시작?
  // goToDetailPage로 변경
  MoveDetailManagementPage = id => {
    const href = `/management/detail?id=${id}`;
    Router.push(href);
  };

  handleChangePage = async pageNo => {
    const { searchValue, option } = this.state;
    let pageData = {
      searchValue: searchValue,
      option: option,
      active: pageNo,
      b2bSeq: 1
    };
    try {
      const res = await getManagementsByPage(pageData);
      this.setState({
        items: res.result,
        total: res.total,
        active: pageNo,
        option: option
      });
    } catch (err) {
      console.log('handleChangePage err', err);
    }
  };

  handleManagementByGroup = async e => {
    const { searchValue, active } = this.state;
    try {
      let searchData = {
        searchValue: searchValue,
        option: e.target.value,
        active: active,
        b2bSeq: 1
      };

      let res = await getManagementsByGroup(searchData);
      this.setState({
        items: res.result,
        total: res.total,
        option: searchData.option
      });
    } catch (err) {
      console.log('managementsByGroup err', err);
    }
  };

  handleManagementBySearch = async e => {
    const { option, active } = this.state;
    // 리펙트링 3. 왜 previousSibling로 접근하고 있나... 퍼블리싱이 어떻게 나올지 알고?
    // 1. input box에 ref 걸고 처리하기
    // 2. Input 값은 모두 onChange 에서 처리하기
    // 1번 또는 2번 방법으로 처리

    let searchValue = e.target.previousSibling.value;

    // 리펙토링 4.
    // active: active  ==> active, 로 변경
    // 전 페이지 통일
    let searchData = {
      searchValue: searchValue,
      active: active,
      option: option,
      b2bSeq: 1
    };

    try {
      let res = await searchManagements(searchData);
      this.setState({
        items: res.result,
        total: res.total,
        searchValue: searchValue,
        option: option
      });
    } catch (err) {
      console.log('managementsBySearch err', err);
    }
  };

  render() {
    const { items, total, dataPerPage } = this.state;
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
              <input type="text" />
              <a
                onClick={this.handleManagementBySearch}
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
                  MoveDetailManagementPage={this.MoveDetailManagementPage}
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
            <button onClick={() => this.MoveAddManagementPage()}>
              계정 생성
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Management;
