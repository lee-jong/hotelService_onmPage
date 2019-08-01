import React, { Fragment } from 'react';
const WorkHistoryList = ({ items }) => {
  return (
    <Fragment>
      <tbody>
        {items.map((item, Index) => (
          <tr key={Index}>
            <td>{Index + 1}</td>
            <td>{item.userId}</td>
            <td>{item.userType}</td>
            <td>{item.event}</td>
            <td>{item.createDate}</td>
          </tr>
        ))}
      </tbody>
    </Fragment>
  );
};

export default WorkHistoryList;
