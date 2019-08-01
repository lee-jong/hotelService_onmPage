import React, { Fragment } from 'react';

// 리펙토링
// return 하는 부분에서 map 함수 쓰지말고
// renderMannagement 함수로 빼서 처리

const ManagementList = ({ items, MoveDetailManagementPage }) => {
  return (
    <Fragment>
      <tbody>
        {items.map(item => (
          <tr
            // 리펙토링
            // 키는 될 수 있으면 map에서 제공해주는 index로 처리할 것
            key={item.userId}
            onClick={() => MoveDetailManagementPage(item.userId)}
          >
            <td>{item.userId}</td>
            <td>{item.groupName}</td>
            <td>{item.userId}</td>
            <td>{item.createTime}</td>
            <td>{item.representativeType}</td>
          </tr>
        ))}
      </tbody>
    </Fragment>
  );
};

export default ManagementList;
