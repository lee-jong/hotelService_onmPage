import React, { Fragment } from 'react';

const renderManagementList = (items, goToDetailPage) => {
  let renderManagement = items.map((item, Index) => (
    <tr key={Index} onClick={() => goToDetailPage(item.userId)}>
      <td>{item.userId}</td>
      <td>{item.groupName}</td>
      <td>{item.userId}</td>
      <td>{item.createTime}</td>
      <td>{item.representativeType}</td>
    </tr>
  ));

  return renderManagement;
};

const ManagementList = ({ items, goToDetailPage }) => {
  return (
    <Fragment>
      <tbody>{renderManagementList(items, goToDetailPage)}</tbody>
    </Fragment>
  );
};

export default ManagementList;
