import React, { Component } from 'react';
import { getRepresent, modifyRepresent } from '../../actions/represent';
import Router from 'next/router';

class representModify extends Component {
  static async getInitialProps() {
    try {
      const represent = await getRepresent();
      return {
        represent
      };
    } catch (err) {
      console.log('err', err);
    }
  }
  constructor(props) {
    super(props);

    this.state = {
      oneUseTypeChange: '',
      twoUseTypeChange: '',
      threeUseTypeChange: '',
      fourUseTypeChange: '',
      oneUseStartTime: this.props.represent.result[0].useStartTime
        ? this.props.represent.result[0].useStartTime.slice(0, 2) +
          ':' +
          this.props.represent.result[0].useStartTime.slice(2, 4)
        : '00:00', // 시작 시간
      twoUseStartTime: this.props.represent.result[1].useStartTime
        ? this.props.represent.result[1].useStartTime.slice(0, 2) +
          ':' +
          this.props.represent.result[1].useStartTime.slice(2, 4)
        : '00:00',
      threeUseStartTime: this.props.represent.result[2].useStartTime
        ? this.props.represent.result[2].useStartTime.slice(0, 2) +
          ':' +
          this.props.represent.result[2].useStartTime.slice(2, 4)
        : '00:00',
      fourUseStartTime: this.props.represent.result[3].useStartTime
        ? this.props.represent.result[3].useStartTime.slice(0, 2) +
          ':' +
          this.props.represent.result[3].useStartTime.slice(2, 4)
        : '00:00',
      oneUseEndTime: this.props.represent.result[0].useEndTime
        ? this.props.represent.result[0].useEndTime.slice(0, 2) +
          ':' +
          this.props.represent.result[0].useEndTime.slice(2, 4)
        : '00', // 끝난 시간
      twoUseEndTime: this.props.represent.result[1].useEndTime
        ? this.props.represent.result[1].useEndTime.slice(0, 2) +
          ':' +
          this.props.represent.result[1].useEndTime.slice(2, 4)
        : '00',
      threeUseEndTime: this.props.represent.result[2].useEndTime
        ? this.props.represent.result[2].useEndTime.slice(0, 2) +
          ':' +
          this.props.represent.result[2].useEndTime.slice(2, 4)
        : '00',
      fourUseEndTime: this.props.represent.result[3].useEndTime
        ? this.props.represent.result[3].useEndTime.slice(0, 2) +
          ':' +
          this.props.represent.result[3].useEndTime.slice(2, 4)
        : '00'
    };
  }

  oneUseStartChangeTime = e => {
    let oneUseTime = e.target.value;
    this.setState({ oneUseStartTime: oneUseTime });
  };

  oneUseEndChangeTime = e => {
    let oneEndTime = e.target.value;
    this.setState({ oneUseEndTime: oneEndTime });
  };

  twoUseStartChangeTime = e => {
    let twoUseTime = e.target.value;
    this.setState({ twoUseStartTime: twoUseTime });
  };

  twoUseEndChangeTime = e => {
    let twoEndTime = e.target.value;
    this.setState({ twoUseEndTime: twoEndTime });
  };

  threeUseStartChangeTime = e => {
    let threeUseTime = e.target.value;
    this.setState({ threeUseStartTime: threeUseTime });
  };

  threeUseEndChangeTime = e => {
    let threeEndTime = e.target.value;
    this.setState({ threeUseEndTime: threeEndTime });
  };

  fourUseStartChangeTime = e => {
    let fourUseTime = e.target.value;
    this.setState({ fourUseStartTime: fourUseTime });
  };

  fourUseEndChangeTime = e => {
    let fourEndTime = e.target.value;
    this.setState({ fourUseEndTime: fourEndTime });
  };

  oneHandleOnOffRepresent = e => {
    this.setState({ oneUseTypeChange: e.target.value });
  };
  twoHandleOnOffRepresent = e => {
    this.setState({ twoUseTypeChange: e.target.value });
  };
  threeHandleOnOffRepresent = e => {
    this.setState({ threeUseTypeChange: e.target.value });
  };
  fourHandleOnOffRepresent = e => {
    this.setState({ fourUseTypeChange: e.target.value });
  };

  offModifyRepresent = async () => {
    const {
      oneUseTypeChange,
      oneUseStartTime,
      oneUseEndTime,
      twoUseTypeChange,
      twoUseStartTime,
      twoUseEndTime,
      threeUseTypeChange,
      threeUseStartTime,
      threeUseEndTime,
      fourUseTypeChange,
      fourUseStartTime,
      fourUseEndTime
    } = this.state;

    let representatives = [
      {
        groupCode: 'CODE_101',
        useType: oneUseTypeChange ? true : false,
        useStartTime: oneUseStartTime.slice(0, 2) + oneUseStartTime.slice(3, 5),
        useEndTime: oneUseEndTime.slice(0, 2) + oneUseEndTime.slice(3, 5)
      },
      {
        groupCode: 'CODE_102',
        useType: twoUseTypeChange ? true : false,
        useStartTime: twoUseStartTime.slice(0, 2) + twoUseStartTime.slice(3, 5),
        useEndTime: twoUseEndTime.slice(0, 2) + twoUseEndTime.slice(3, 5)
      },
      {
        groupCode: 'CODE_103',
        useType: threeUseTypeChange ? true : false,
        useStartTime:
          threeUseStartTime.slice(0, 2) + threeUseStartTime.slice(3, 5),
        useEndTime: threeUseEndTime.slice(0, 2) + threeUseEndTime.slice(3, 5)
      },
      {
        groupCode: 'CODE_104',
        useType: fourUseTypeChange ? true : false,
        useStartTime:
          fourUseStartTime.slice(0, 2) + fourUseStartTime.slice(3, 5),
        useEndTime: fourUseEndTime.slice(0, 2) + fourUseEndTime.slice(3, 5)
      }
    ];

    try {
      let res = await modifyRepresent(representatives);

      // TODO 여기서 api 정상 처리후 분기 태워주기 성공할 시 전 페이지 실패시 그대로 현재 API 미완
      if (res.code === 200) {
        alert('성공');
        const href = `/represent`;
        Router.push(href);
      } else {
        alert('실패');
      }
    } catch (err) {
      alert('실패하셨습니다');
      console.log('err', err);
    }
  };

  timeSelect = () => {
    let time = [];
    for (let i = 0; i < 24; i++) {
      let time2 =
        i < 10 ? (
          <option key={i}> {'0' + i + ':00'} </option>
        ) : (
          <option> {i + ':00'} </option>
        );
      time.push(time2);
    }
    return time;
  };

  render() {
    const {
      oneUseStartTime,
      twoUseStartTime,
      threeUseStartTime,
      fourUseStartTime,
      oneUseEndTime,
      twoUseEndTime,
      threeUseEndTime,
      fourUseEndTime
    } = this.state;
    return (
      <div className="content-container">
        <div className="content-box">
          <div className="title"> 대표 ID 관리</div>
          <div className="content">
            <div className="table input">
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="80%" />
                </colgroup>
                <tbody rowSpan="2">
                  <tr>
                    <th rowSpan="4">대표 ID 사용 여부</th>
                    <td>
                      CODE 101
                      <input
                        onChange={this.oneHandleOnOffRepresent}
                        type="text"
                      />
                    </td>
                    <td>
                      CODE 102
                      <input
                        onChange={this.twoHandleOnOffRepresent}
                        type="text"
                      />
                    </td>
                    <td>
                      CODE 103
                      <input
                        onChange={this.threeHandleOnOffRepresent}
                        type="text"
                      />
                    </td>
                    <td>
                      CODE 104
                      <input
                        onChange={this.fourHandleOnOffRepresent}
                        type="text"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan="4">대표 ID 연결 시간</th>
                    <td>
                      CODE101
                      <select
                        className="browser-default"
                        onChange={this.oneUseStartChangeTime}
                        value={oneUseStartTime}
                      >
                        {this.timeSelect()}
                      </select>
                    </td>
                    <td>
                      <select
                        className="browser-default"
                        onChange={this.oneUseEndChangeTime}
                        value={oneUseEndTime}
                      >
                        {this.timeSelect()}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      CODE102
                      <select
                        className="browser-default"
                        onChange={this.twoUseStartChangeTime}
                        value={twoUseStartTime}
                      >
                        {this.timeSelect()}
                      </select>
                    </td>
                    <td>
                      <select
                        className="browser-default"
                        onChange={this.twoUseEndChangeTime}
                        value={twoUseEndTime}
                      >
                        {this.timeSelect()}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      CODE103
                      <select
                        className="browser-default"
                        onChange={this.threeUseStartChangeTime}
                        value={threeUseStartTime}
                      >
                        {this.timeSelect()}
                      </select>
                    </td>
                    <td>
                      <select
                        className="browser-default"
                        onChange={this.threeUseEndChangeTime}
                        value={threeUseEndTime}
                      >
                        {this.timeSelect()}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      CODE104
                      <select
                        className="browser-default"
                        onChange={this.fourUseStartChangeTime}
                        value={fourUseStartTime}
                      >
                        {this.timeSelect()}
                      </select>
                    </td>
                    <td>
                      <select
                        className="browser-default"
                        onChange={this.fourUseEndChangeTime}
                        value={fourUseEndTime}
                      >
                        {this.timeSelect()}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="button">
              <button onClick={() => this.offModifyRepresent()}>설정</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default representModify;
