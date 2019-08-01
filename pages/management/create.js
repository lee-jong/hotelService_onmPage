import React, { Component } from 'react';
import { createManagement, checkDuplicatedId } from '../../actions/management';
import Router from 'next/router';

class Create extends Component {
  constructor(props) {
    super(props);

    // 리펙토링
    // idCheck, representCheck, useRepresent 사용하지 않는 변수, 삭제

    this.state = {
      idCheck: false,
      representCheck: false,
      useRepresent: false,
      userId: '',
      password: '',
      name: '',
      group: 'CODE_101',
      isRep: '',
      remarks: ''
    };
  }

  // 리펙토링
  // 아래와 같이 통일 시킬 수 있음.
  // 대신에, input에 name 설정해줘야함.  handleInputChage, handleChagePassword 모두 삭제
  /**
   * 
   *   handleInputChage = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
   * 
   * 
   */

  // 리펙토링 - 패스워드 (validation)
  // GUI가 나오면, 패스워드 입력하는 창이 2개 있을 거임
  // 첫 번째 input 창과, 두 번째 input 창이 값이 다른경우 체크 ==> state에 하나 있어야함, isEqualPassword
  // 패스워드 정규표현식 처리 ==> 이것 또한 state에 있어야함, isValidPassword
  // 패스워드 정규표현식으로 처리하는 부분은 helper에 뺴놓기 (helper에 validation이라는 파일 만들기)
  // 등록 했을 때, 필요한 값 입력 다 했는지 체크



  handleChageGroup = e => {
    this.setState({
      group: e.target.value ? e.target.value : 'fr'
    });
  };

  handleChangeRepresent = e => {
    let representBool = e.target.value ? true : false;
    this.setState({
      isRep: representBool
    });
  };

  
  // 여기 data 값 수정 공통 처리
  createManagementForm = async () => {
    const { userId, password, name, group, isRep, remarks } = this.state;

    // 리펙토링
    // 여기서 validation 하지 말고, 결과만 가지가 체크 할 것
    if (userId === '') return alert('중복 확인을 부탁드립니다.');
    if (password.length < 4) return alert('비밀번호는 4자리 이상');
    try {
      // 리펙토링
      // userId: userId  ==> userId,
      let management = {
        userId,
        password,
        group,
        isRep,
        remarks,
        b2bSeq: 1
      };

      let res = await createManagement(management);

      if (res.code === 200) {
        // 리펙토링
        // 지금 alert 쓰면, 작업들을 다 막아서 push가 안될꺼임
        // 나중에 팝업이나, 토스트 성공, 실패를 보여줄텐데, 그 때는 거기서 확인을 누르거나 그냥 넘어 갈 수도 있음
        // 알고 있을 것
        alert('가입에 성공 하였습니다.');
        const href = `/management`;
        Router.push(href);
      }

      if (res.code !== 200) {
        alert('회원 가입에 실패 하였습니다.');
      }
    } catch (err) {
      alert('회원 가입에 실패 하였습니다.');
      console.log('createManagementForm', err);
    }
  };

  handleDuplicatedId = async e => {
    const {userId} = this.state
    try {
      let res = await checkDuplicatedId(userId);
      if (res.code === 200) {
        alert('사용 가능한 아이디 입니다.');
        this.setState({ userId: userId });
      }

      if (res.code === 209) return alert('중복된 아이디 입니다.');
    } catch (err) {
      console.log('checkResponse err', err);
    }
  };

  render() {
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
                      <input onChange ={} className ={'userId'} type="text" placeholder="test00" />
                      {/* 리펙토링
                      
                        handleChangeId 아님...
                        checkDuplicatedId 로 만들고
                        거기에서 서버로 요청.
                        요청 성공 했을 때 상태값 바꾸기
                        state에 isIdChecked 로 만들기
                      */}
                      <button onClick={this.handleDuplicatedId}>
                        중복확인
                      </button>
                    </td>
                    <th>비밀번호</th>
                    <td>
                      <input
                        onChange={this.handleChagePassword}
                        type="password"
                        placeholder="password"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>이름</th>
                    <td>
                      <input
                        onChange={this.handleChangeName}
                        type="text"
                        placeholder="홍길동"
                      />
                    </td>
                    <th>그룹</th>
                    <td>
                      <select
                        value={this.state.group}
                        onChange={this.handleChageGroup}
                        className="browser-default"
                      >
                        <option value="CODE_101">프론트</option>
                        <option value="CODE_102">예약문의</option>
                        <option value="CODE_103">룸서비스</option>
                        <option value="CODE_104">하우스키핑</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>대표 ID 설정</th>
                    <td>
                      <input
                        onChange={this.handleChangeRepresent}
                        type="text"
                        placeholder="true or false"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td colSpan="3">
                      <input
                        type="text"
                        className="email"
                        placeholder="test@test.com"
                        onChange={this.handleChangeRemarks}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="button">
              {/* 리펙토링 
                콜백 함수로 등록해 놓기
                왜 위에는 콜백 함수로 등록해 놓고, 여기선 호출하고 있지?
              */}
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
