import React, { Fragment } from 'react';

const renderCallHistoryList = (items, displayMemo) => {
  let renderCallHistory = items.map((item, Index) => (
    <tr key={Index}>
      <td>{item.idx}</td>
      <td>{item.receptionTime}</td>
      <td>{item.roomNumber}</td>
      <td>{item.processGroup}</td>
      <td>{item.requestGroup}</td>
      <td>{item.receiver}</td>
      <td>{item.callTime}</td>
      <td>
        {item.memo ? (
          <a
            onClick={() => displayMemo(item.idx)}
            className="waves-effect waves-light delete"
          >
            메모장
          </a>
        ) : (
          ''
        )}
      </td>
    </tr>
  ));
  return renderCallHistory;
};

const CallHistoryList = ({ items, displayMemo }) => {
  return (
    <Fragment>
      <tbody>{renderCallHistoryList(items, displayMemo)}</tbody>
    </Fragment>
  );
};

export default CallHistoryList;
