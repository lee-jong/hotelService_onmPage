import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { detailManagement, deleteManagement } from '../../actions/management';
import Router from 'next/router';

class Detail extends Component {
  constructor(props) {
    super(props);

    // 리펙토링
    // state 필요없음
    this.state = {
      info: ''
    };
  }

  // 리펙토링
  // 여기서는 왜 componentDidMount 로 호출....?
  // 특별한 이유 없으면 getInitialProps로 통일
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
  // goToListPage
  moveManagementListPage = () => {
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
      console.log('responseDelete err', err);
    }
  };

  moveModifyPage = id => {
    const href = `/management/modify?id=${id}`;
    Router.push(href);
  };

  render() {
    const { router } = this.props;

    // id: management id
    const { id } = router.query;

    // 리펙토링
    // state 필요 없음, getInitialProps로 받아온 Props로 처리해도 됨
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
                      <input type="password" placeholder="*******" disabled />
                    </td>
                  </tr>
                  <tr>
                    <th>대표 ID설정</th>
                    <td>
                      <input
                        type="password"
                        placeholder={
                          info.representativeType ? '사용' : '미사용'
                        }
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td>
                      <input
                        type="password"
                        placeholder={info.remarks}
                        disabled
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* 리펙토링
              인자값 전달하지 않는 건 모두 callback 등록
            */}
            <button onClick={() => this.moveManagementListPage()}>목록 </button>
            <button onClick={() => this.requestDeleteManagement(id)}>
              삭제{' '}
            </button>
            <button onClick={() => this.moveModifyPage(id)}>수정 </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Detail);
