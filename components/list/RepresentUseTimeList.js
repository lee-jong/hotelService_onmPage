import React from 'react';

const RepresentUseTimeList = ({ timeList }) => {
  console.log('!!!!', timeList);
  return (
    <>
      {timeList.map((time, Index) => {
        let startTimeHh = time.useStartTime.slice(0, 2);
        let startTimeMm = time.useStartTime.slice(2, 4);
        let endTimeHh = time.useEndTime.slice(0, 2);
        let endTimeMm = time.useEndTime.slice(2, 4);

        return (
          <tr key={Index}>
            <td>
              <div>
                {time.groupCode == 'CODE_101'
                  ? '프론트'
                  : '' || time.groupCode == 'CODE_102'
                  ? '예약문의'
                  : '' || time.groupCode == 'CODE_103'
                  ? '룸서비스'
                  : '' || time.groupCode == 'CODE_104'
                  ? '하우스키핑'
                  : ''}
                &nbsp;&nbsp;
                {startTimeHh +
                  ':' +
                  startTimeMm +
                  '~' +
                  endTimeHh +
                  ':' +
                  endTimeMm}
                &nbsp;&nbsp;
                {time.useType ? '사용' : '미사용'}
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default RepresentUseTimeList;
