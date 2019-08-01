import React, { Component } from 'react';
import { getRepresent } from '../../actions/represent';
import Router from 'next/router';
import RepresentuseTimeList from '../../components/list/RepresentUseTimeList';

class Represent extends Component {
  static async getInitialProps() {
    let res = {};
    try {
      res = await getRepresent();
    } catch (err) {
      console.log('err', err);
    }
    return {
      res
    };
  }
  constructor(props) {
    super(props);
  }

  onModifyRepresent = async () => {
    const href = `/represent/modify`;
    Router.push(href);
  };

  render() {
    const { result } = this.props.res;
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
                <tbody>
                  <RepresentuseTimeList timeList={result} />
                </tbody>
              </table>
            </div>
            <div className="button">
              <button onClick={() => this.onModifyRepresent()}>수정</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Represent;
