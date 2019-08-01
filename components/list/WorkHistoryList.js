import React, { Fragment } from 'react';

const renderWorkHistoryList = items => {
  let renderWorkHistory = items.map((item, Index) => (
    <tr key={Index}>
      <td>{Index + 1}</td>
      <td>{item.userId}</td>
      <td>{item.userType}</td>
      <td>{item.event}</td>
      <td>{item.createDate}</td>
    </tr>
  ));

  return renderWorkHistory;
};

const WorkHistoryList = ({ items }) => {
  return (
    <Fragment>
      <tbody>{renderWorkHistoryList(items)}</tbody>
    </Fragment>
  );
};

export default WorkHistoryList;
