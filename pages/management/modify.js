import React, { Component } from 'react';
import { modifyManagement, detailManagement } from '../../actions/management';
import { withRouter } from 'next/router';
import Router from 'next/router';

class Modify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: '',
      password: '',
      useType: '',
      remarks: ''
    };
  }
  async componentDidMount() {
    const { router } = this.props;

    try {
      const detailInfo = await detailManagement(router.query.id);
      this.setState({ info: detailInfo.result });
    } catch (err) {
      console.log('err', err);
    }
  }

  // 리펙토링
  // Input 한 번에 처리할 것
  onChangePassword = e => {
    let pw = e.target.value;
    this.setState({ password: pw });
  };
  onChangeUseType = e => {
    let type = e.target.value ? true : false;
    this.setState({ useType: type });
  };
  onChangeRemarks = e => {
    let remark = e.target.value;
    this.setState({ remarks: remark });
  };

  // 리펙토링
  // onSumit 으로 변경
  onChangeSuccess = async () => {
    try {
      const { id } = this.props.router.query;
      const { password, useType, remarks } = this.state;
      let data = {
        cUserId: id,
        cPassword: password,
        cUseType: useType,
        cRemarks: remarks
      };
      let res = await modifyManagement(data);
      if (res.code === 200) {
        alert('수정이 완료 되었습니다.');
        const href = `/management/detail?id=${id}`;
        Router.push(href);
      } else {
        alert('수정이 완료 되지 않았습니다.');
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  // 리펙토링
  // goToDetailPage로 변경
  onChangeToList = () => {
    const { id } = this.props.router.query;
    const href = `/management/detail?id=${id}`;
    Router.push(href);
  };

  render() {
    const { info } = this.state;
    return (
      <div className="content-container">
        <div className="content-box">
          <div className="title">상담사 상세보기</div>

          <div className="content">
            <div className="table input">
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>그룹</th>
                    <td>
                      <input
                        type="text"
                        placeholder={info.groupName}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>ID</th>
                    <td>
                      <input
                        type="password"
                        placeholder={info.userId}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="browser-default">비밀번호</th>
                    <td>
                      <input
                        onChange={this.onChangePassword}
                        type="password"
                        placeholder="*******"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>대표 ID설정</th>
                    <td>
                      <input
                        type="password"
                        onChange={this.onChangeUseType}
                        placeholder={
                          info.representativeType ? '사용중' : '미사용중'
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td>
                      <input
                        type="text"
                        onChange={this.onChangeRemarks}
                        placeholder={info.remarks}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* 리펙토링 
            
              callback 등록...
            */}
            <button onClick={() => this.onChangeToList()}>취소 </button>
            <button onClick={() => this.onChangeSuccess()}>저장 </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Modify);
