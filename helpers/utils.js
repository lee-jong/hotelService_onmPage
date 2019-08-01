export const dotdotdot = (text, maxLength = 96) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

//규격서에 맞는 date 변경
export const getDate = date => {
  let prototypeDate = new Date(date);
  let dayDate = prototypeDate.getDate();
  let yearDate = prototypeDate.getFullYear();
  let monthDate =
    prototypeDate.getMonth() + 1 < 10
      ? '0' + (prototypeDate.getMonth() + 1)
      : prototypeDate.getMonth() + 1;

  let returnDate = yearDate + monthDate + dayDate;
  return returnDate;
};
