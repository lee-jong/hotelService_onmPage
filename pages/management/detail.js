import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { detailManagement, deleteManagement } from '../../actions/management';
import Router from 'next/router';

class Detail extends Component {
  static async getInitialProps({ query }) {
    let detailInfo = {};

    try {
      detailInfo = await detailManagement(query.id);
    } catch (err) {
      console.error('Unexpected Error', err);
    }

    return {
      detailInfo
    };
  }
  constructor(props) {
    super(props);
  }

  goToListPage = () => {
    const href = `/management`;
    Router.push(href);
  };

  requestDeleteManagement = async id => {
    try {
      const res = await deleteManagement(id);
      if (res.code === 200) {
        alert('삭제 되었습니다.');
        const href = `/management`;
        Router.push(href);
      }

      if (res.code !== 200) {
        alert('삭제가 안 되었습니다.');
      }
    } catch (err) {
      console.error('Unexpected Error', err);
    }
  };

  goToModifyPage = id => {
    const href = `/management/modify?id=${id}`;
    Router.push(href);
  };

  render() {
    const { router } = this.props;

    const { id } = router.query;
    const {
      userId,
      userPassword,
      representativeType,
      groupName,
      remarks
    } = this.props.detailInfo.result;

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
                      <input type="text" placeholder={groupName} disabled />
                    </td>
                  </tr>
                  <tr>
                    <th>ID</th>
                    <td>
                      <input type="password" placeholder={userId} disabled />
                    </td>
                  </tr>
                  <tr>
                    <th className="browser-default">비밀번호</th>
                    <td>
                      <input
                        type="password"
                        placeholder={userPassword}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>대표 ID설정</th>
                    <td>
                      <input
                        type="password"
                        placeholder={
                          representativeType !== 'N' ? '사용' : '미사용'
                        }
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td>
                      <input type="password" placeholder={remarks} disabled />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button onClick={this.goToListPage}>목록 </button>
            <button onClick={() => this.requestDeleteManagement(id)}>
              삭제
            </button>
            <button onClick={() => this.goToModifyPage(id)}>수정 </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Detail);
