import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerList = ({
  startDate,
  endDate,
  handleChangeStart,
  handleChangeEnd
}) => {
  return (
    <>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={handleChangeStart}
      />
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        onChange={handleChangeEnd}
        minDate={startDate}
      />
    </>
  );
};

export default DatePickerList;
