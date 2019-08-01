import React from 'react';
import { timeSelect } from '../../helpers/utils';

const OptionBoxList = ({
  title,
  startTime,
  endTime,
  onChangeOption,
  startTimeName,
  endTimeName
}) => {
  return (
    <>
      <td>
        {title}
        <select
          name={startTimeName}
          className="browser-default"
          onChange={onChangeOption}
          value={startTime}
        >
          {timeSelect()}
        </select>
      </td>
      <td>
        <select
          name={endTimeName}
          className="browser-default"
          onChange={onChangeOption}
          value={endTime}
        >
          {timeSelect()}
        </select>
      </td>
    </>
  );
};

export default OptionBoxList;
