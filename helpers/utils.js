export const dotdotdot = (text, maxLength = 96) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

//date 객체 규격서에 맞는 date 변경
export const getDate = date => {
  let prototypeDate = new Date(date);
  let dayDate =
    prototypeDate.getDate() < 10
      ? '0' + prototypeDate.getDate()
      : prototypeDate.getDate();

  let yearDate = prototypeDate.getFullYear();

  let monthDate =
    prototypeDate.getMonth() + 1 < 10
      ? '0' + (prototypeDate.getMonth() + 1)
      : prototypeDate.getMonth() + 1;

  let resDate = yearDate + monthDate + dayDate;
  return resDate;
};

//colon Time 규격서에 맞는 date로 변환
export const deleteColonFromDate = date => {
  let resDate = date.slice(0, 2) + date.slice(3, 5);
  return resDate;
};

export const weekAgoDate = date => {
  let localDate = new Date(date);
  let getDate = localDate.getDate();
  let resDate = localDate.setDate(getDate - 7);

  return resDate;
};

export const addColonToDate = date => {
  let resDate = date ? date.slice(0, 2) + ':' + date.slice(2, 4) : '00:00';

  return resDate;
};

export const toggleButton = (isRep, fuc) => {
  let onButton = <button onClick={fuc}> ON </button>;
  let offButton = <button onClick={fuc}> OFF </button>;
  let toggleBtn = isRep ? onButton : offButton;
  return toggleBtn;
};

export const timeSelect = () => {
  let time = [];
  for (let i = 0; i < 24; i++) {
    let time2 =
      i < 10 ? (
        <option key={i}> {'0' + i + ':00'} </option>
      ) : (
        <option key={i}> {i + ':00'} </option>
      );
    time.push(time2);
  }
  return time;
};
