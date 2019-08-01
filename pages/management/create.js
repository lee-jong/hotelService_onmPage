import React, { Component } from 'react';
import { createManagement } from '../../actions/management';
import Router from 'next/router';
import { toggleButton } from '../../helpers/utils';
import {
  comparePasswordCheck,
  isUsableIdCheck,
  isValidIdCheck,
  isValidPasswordCheck
} from '../../helpers/validation';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      password1: '',
      password2: '',
      name: '',
      group: 'CODE_101',
      isRep: false,
      remarks: '',
      isUsableId: false, // 아이디 중복확인
      isValidPassword: '', // 패스워드 정규 표현식
      isEqualPassword: '', // 패스워드 동일 여부
      isValidId: '', // 아이디 정규 표현식
      idValidationError: '',
      pwValidationError: '',
      pwEqualityError: '',
      isUsableError: ''
    };
  }

  handleChageInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeRepresent = e => {
    this.setState({
      isRep: !this.state.isRep
    });
  };

  createManagementForm = async () => {
    const {
      userId,
      password1,
      group,
      isRep,
      remarks,
      isValidId,
      isValidPassword,
      isEqualPassword,
      isUsableId
    } = this.state;

    if (!isValidId || !isValidPassword || !isEqualPassword || !isUsableId)
      return;

    try {
      let management = {
        userId,
        password1,
        group,
        isRep,
        remarks,
        b2bSeq: 1
      };

      let res = await createManagement(management);

      if (res.code === 200) {
        alert('가입에 성공 하였습니다.');
        const href = `/management`;
        Router.push(href);
      }

      if (res.code !== 200) {
        alert('회원 가입에 실패 하였습니다.');
      }
    } catch (err) {
      alert('회원 가입에 실패 하였습니다.');
      console.error('Unexpected Error', err);
    }
  };

  handleValidation = async e => {
    let field = e.target.name;
    let value = this.state[field];
    let { password1, userId } = this.state;

    switch (field) {
      case 'userId':
        let isValidId = isValidIdCheck(value);
        this.setState({
          isValidId,
          idValidationError: isValidId
            ? ''
            : '5~15 자 영문, 숫자, 특수문자를 조합하여 사용해 주세요'
        });

        if (isValidId) {
          let isUsableId = await isUsableIdCheck(userId);
          this.setState({
            isUsableId,
            isUsableError: isUsableId ? '' : '중복된 아이디입니다.'
          });
        }
        break;

      case 'password1':
        let isValidPassword = isValidPasswordCheck(value);

        this.setState({
          isValidPassword,
          pwValidationError: isValidPassword
            ? ''
            : '6~16 자 영문, 숫자, 특수문자를 조합하여 사용해 주세요'
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

  toggleButton = isRep => {
    let onButton = <button onClick={this.handleChangeRepresent}> ON </button>;
    let offButton = <button onClick={this.handleChangeRepresent}> OFF </button>;
    let toggleBtn = isRep ? onButton : offButton;
    return toggleBtn;
  };

  render() {
    const {
      isRep,
      idValidationError,
      pwEqualityError,
      pwValidationError,
      isUsableError
    } = this.state;
    return (
      <div className="content-container">
        <div className="content-box">
          <div className="title">계정 생성</div>

          <div className="content">
            <div className="table input">
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                  <col width="20%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>아이디</th>
                    <td>
                      <input
                        name={'userId'}
                        type="text"
                        placeholder="test00"
                        onChange={this.handleChageInput}
                        onBlur={this.handleValidation}
                      />
                      <div style={{ color: 'red' }}>{idValidationError}</div>
                      <div style={{ color: 'red' }}>{isUsableError}</div>
                    </td>
                    <th>비밀번호</th>
                    <td>
                      <input
                        name={'password1'}
                        onChange={this.handleChageInput}
                        onBlur={this.handleValidation}
                        type="password"
                        placeholder="password"
                      />
                      <div style={{ color: 'red' }}>{pwValidationError}</div>
                    </td>
                  </tr>
                  <tr>
                    <th>이름</th>
                    <td>
                      <input
                        name={'name'}
                        onChange={this.handleChageInput}
                        type="text"
                        placeholder="홍길동"
                      />
                    </td>
                    <th>비밀번호 재입력</th>
                    <td>
                      <input
                        name={'password2'}
                        onChange={this.handleChageInput}
                        type="password"
                        placeholder="password"
                        onBlur={this.handleValidation}
                      />
                      <div style={{ color: 'red' }}>{pwEqualityError}</div>
                    </td>
                  </tr>
                  <tr>
                    <th>대표 ID 설정</th>
                    <td>{toggleButton(isRep, this.handleChangeRepresent)}</td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td colSpan="3">
                      <input
                        name="remarks"
                        type="text"
                        className="email"
                        placeholder="test@test.com"
                        onChange={this.handleChageInput}
                      />
                    </td>
                    <th>그룹</th>
                    <td>
                      <select
                        value={this.state.group}
                        onChange={this.handleChageInput}
                        className="browser-default"
                        name="group"
                      >
                        <option value="CODE_101">프론트</option>
                        <option value="CODE_102">예약문의</option>
                        <option value="CODE_103">룸서비스</option>
                        <option value="CODE_104">하우스키핑</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="button">
              <a onClick={this.createManagementForm} className="submit">
                등록
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
