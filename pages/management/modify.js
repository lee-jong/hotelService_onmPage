import React, { Component } from 'react';
import { modifyManagement, detailManagement } from '../../actions/management';
import { withRouter } from 'next/router';
import Router from 'next/router';
import { toggleButton } from '../../helpers/utils';
import {
  comparePasswordCheck,
  isValidPasswordCheck
} from '../../helpers/validation';

class Modify extends Component {
  static async getInitialProps({ query }) {
    let detailInfo = {};
    let detailInfoUseType = '';

    try {
      detailInfo = await detailManagement(query.id);

      detailInfoUseType =
        detailInfo.result.representativeType === 'N' ? false : true;
    } catch (err) {
      console.error('Unexpected Error', err);
    }
    return {
      detailInfo,
      detailInfoUseType
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      password1: '',
      password2: '',
      isValidPassword: '',
      isEqualPassword: '',
      pwValidationError: '',
      pwEqualityError: '',
      useType: this.props.detailInfoUseType,
      remarks: ''
    };
  }

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeUseType = e => {
    this.setState({ useType: !this.state.useType });
  };

  onChangeSuccess = async () => {
    const {
      password1,
      password2,
      useType,
      remarks,
      isValidPassword,
      pwValidationError,
      isEqualPassword,
      pwEqualityError
    } = this.state;

    if (password1 && (!isValidPassword || pwValidationError)) return;
    if (password2 && (!isEqualPassword || pwEqualityError)) return;

    try {
      const { id } = this.props.router.query;
      let data = {
        cUserId: id,
        cPassword: password1,
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
      console.error('Unexpected Error', err);
    }
  };

  onChangeToList = () => {
    const { id } = this.props.router.query;
    const href = `/management/detail?id=${id}`;
    Router.push(href);
  };

  handleValidation = e => {
    let field = e.target.name;
    let value = this.state[field];
    let { password1 } = this.state;

    if (!password1)
      return this.setState({
        pwValidationError: '',
        pwEqualityError: ''
      });

    switch (field) {
      case 'password1':
        let isValidPassword = isValidPasswordCheck(value);
        this.setState({
          isValidPassword,
          pwValidationError: isValidPassword
            ? ''
            : '6~16 자 영문 , 숫자, 특수문자를 조합하여 사용하여 주세요'
        });
        break;

      case 'password2':
        let isEqualPassword = comparePasswordCheck(password1, value);
        this.setState({
          isEqualPassword,
          pwEqualityError: isEqualPassword
            ? ''
            : '비밀번호가 일치하지 않습니다.'
        });
        break;
    }
  };

  render() {
    const { useType, pwValidationError, pwEqualityError } = this.state;
    const { groupName, remark, userId } = this.props.detailInfo.result;

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
                        name="password1"
                        onChange={this.handleChangeInput}
                        type="password"
                        placeholder="*******"
                        onBlur={this.handleValidation}
                      />
                      <div style={{ color: 'red' }}>{pwValidationError} </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="browser-default">비밀번호 재입력</th>
                    <td>
                      <input
                        name="password2"
                        onChange={this.handleChangeInput}
                        type="password"
                        placeholder="*******"
                        onBlur={this.handleValidation}
                      />
                      <div style={{ color: 'red' }}>{pwEqualityError}</div>
                    </td>
                  </tr>
                  <tr>
                    <th>대표 ID설정</th>
                    <td>{toggleButton(useType, this.onChangeUseType)}</td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td>
                      <input
                        name="remark"
                        type="text"
                        onChange={this.handleChangeInput}
                        placeholder={remark}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button onClick={this.onChangeToList}>취소 </button>
            <button onClick={this.onChangeSuccess}>저장 </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Modify);
