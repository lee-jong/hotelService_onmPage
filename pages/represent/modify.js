import React, { Component } from 'react';
import { getRepresent, modifyRepresent } from '../../actions/represent';
import Router from 'next/router';
import {
  toggleButton,
  addColonToDate,
  deleteColonFromDate
} from '../../helpers/utils';
import OptionBoxList from '../../components/list/OptionBoxList';

class representModify extends Component {
  static async getInitialProps() {
    try {
      const represent = await getRepresent();
      return {
        represent
      };
    } catch (err) {
      console.error('Unexpected Error', err);
    }
  }

  // RS = CODE_101 = 프론트
  // RV = CODE_101 = 예약문의
  // RS = CODE_102 = 룸 서비스
  // HK = CODE_103 = 하우스 키핑

  constructor(props) {
    super(props);

    this.state = {
      FRUseType: this.props.represent.result[0].useType,
      RVUseType: this.props.represent.result[1].useType,
      RSUseType: this.props.represent.result[2].useType,
      HKUseType: this.props.represent.result[3].useType,
      FRUseStartTime: addColonToDate(
        this.props.represent.result[0].useStartTime
      ),
      RVUseStartTime: addColonToDate(
        this.props.represent.result[1].useStartTime
      ),
      RSUseStartTime: addColonToDate(
        this.props.represent.result[2].useStartTime
      ),
      HKUseStartTime: addColonToDate(
        this.props.represent.result[3].useStartTime
      ),
      FRUseEndTime: addColonToDate(this.props.represent.result[0].useEndTime),
      RVUseEndTime: addColonToDate(this.props.represent.result[1].useEndTime),
      RSUseEndTime: addColonToDate(this.props.represent.result[2].useEndTime),
      HKUseEndTime: addColonToDate(this.props.represent.result[3].useEndTime)
    };
  }

  handleChangeOption = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  FRHandleOnOffRepresent = e => {
    this.setState({ FRUseType: !this.state.FRUseType });
  };
  RVHandleOnOffRepresent = e => {
    this.setState({ RVUseType: !this.state.RVUseType });
  };
  RSHandleOnOffRepresent = e => {
    this.setState({ RSUseType: !this.state.RSUseType });
  };
  HKHandleOnOffRepresent = e => {
    this.setState({ HKUseType: !this.state.HKUseType });
  };

  offModifyRepresent = async () => {
    const {
      FRUseType,
      FRUseStartTime,
      FRUseEndTime,
      RVUseType,
      RVUseStartTime,
      RVUseEndTime,
      RSUseType,
      RSUseStartTime,
      RSUseEndTime,
      HKUseType,
      HKUseStartTime,
      HKUseEndTime
    } = this.state;

    let representatives = [
      {
        groupCode: 'CODE_101',
        useType: FRUseType ? true : false,
        useStartTime: deleteColonFromDate(FRUseStartTime),
        useEndTime: deleteColonFromDate(FRUseEndTime)
      },
      {
        groupCode: 'CODE_102',
        useType: RVUseType ? true : false,
        useStartTime: deleteColonFromDate(RVUseStartTime),
        useEndTime: deleteColonFromDate(RVUseEndTime)
      },
      {
        groupCode: 'CODE_103',
        useType: RSUseType ? true : false,
        useStartTime: deleteColonFromDate(RSUseStartTime),
        useEndTime: deleteColonFromDate(RSUseEndTime)
      },
      {
        groupCode: 'CODE_104',
        useType: HKUseType ? true : false,
        useStartTime: deleteColonFromDate(HKUseStartTime),
        useEndTime: deleteColonFromDate(HKUseEndTime)
      }
    ];

    try {
      let res = await modifyRepresent(representatives);

      if (res.code === 200) {
        alert('성공');
        const href = `/represent`;
        Router.push(href);
      } else {
        alert('실패');
      }
    } catch (err) {
      alert('실패하셨습니다');
      console.error('Unexpected Error', err);
    }
  };

  render() {
    const {
      FRUseStartTime,
      RVUseStartTime,
      RSUseStartTime,
      HKUseStartTime,
      FRUseEndTime,
      RVUseEndTime,
      RSUseEndTime,
      HKUseEndTime,
      FRUseType,
      RVUseType,
      RSUseType,
      HKUseType
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
                      {toggleButton(FRUseType, this.FRHandleOnOffRepresent)}
                    </td>
                    <td>
                      CODE 102
                      {toggleButton(RVUseType, this.RVHandleOnOffRepresent)}
                    </td>
                    <td>
                      CODE 103
                      {toggleButton(RSUseType, this.RSHandleOnOffRepresent)}
                    </td>
                    <td>
                      CODE 104
                      {toggleButton(HKUseType, this.HKHandleOnOffRepresent)}
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan="4">대표 ID 연결 시간</th>
                    <OptionBoxList
                      title={'프론트'}
                      startTime={FRUseStartTime}
                      startTimeName="FRUseStartTime"
                      endTime={FRUseEndTime}
                      endTimename="FRUseEndTime"
                      onChangeOption={this.handleChangeOption}
                    />
                  </tr>
                  <tr>
                    <OptionBoxList
                      groupCode={'CODE_102'}
                      startTime={RVUseStartTime}
                      startTimeName="RVUseStartTime"
                      endTime={RVUseEndTime}
                      endTimeName="RVUseEndTime"
                      onChangeOption={this.handleChangeOption}
                    />
                  </tr>
                  <tr>
                    <OptionBoxList
                      groupCode={'CODE_103'}
                      startTime={RSUseStartTime}
                      startTimeName="RSUseStartTime"
                      endTime={RSUseEndTime}
                      endTimeName="RSUseEndTime"
                      onChangeOption={this.handleChangeOption}
                    />
                  </tr>
                  <tr>
                    <OptionBoxList
                      title={'하우스키핑'}
                      startTime={HKUseStartTime}
                      startTimeName="HKUseStartTime"
                      endTime={HKUseEndTime}
                      endTimeName="HKUseEndTime"
                      onChangeOption={this.handleChangeOption}
                    />
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="button">
              <button onClick={this.offModifyRepresent}>설정</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default representModify;
