import { axiosInstance, handleError, handleSuccess } from './axiosConfig';
import { getDate, weekAgoDate } from '../helpers/utils';

export const getWorkHistory = async page => {
  let startDate = new Date();
  let endDate = new Date();
  let startDateWeekAgo = weekAgoDate(startDate);
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: page.option,
    keyword: page.searchValue,
    b2bSeq: 1,
    option: {
      offset: 10 * (page.active - 1),
      limit: 10,
      startTime: getDate(startDateWeekAgo),
      endTime: getDate(endDate)
    }
  };

  return await axiosInstance
    .post('/etc/getTransactionList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getHistoryByGroup = async group => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: group.option,
    keyword: group.searchValue,
    b2bSeq: 1,
    option: {
      offset: 10 * (group.active - 1),
      limit: 10,
      startTime: getDate(group.startDate),
      endTime: getDate(group.endDate)
    }
  };

  return await axiosInstance
    .post('/etc/getTransactionList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const searchHistory = async search => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: search.option,
    keyword: search.searchValue,
    b2bSeq: 1,
    option: {
      offset: 10 * (search.active - 1),
      limit: 10,
      startTime: getDate(search.startDate),
      endTime: getDate(search.endDate)
    }
  };

  return await axiosInstance
    .post('/etc/getTransactionList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getTeanscationListExcel = async () => {
  let data = {
    responseType: 'arraybuffer',
    b2bSeq: 1,
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' }
  };

  return await axiosInstance
    .post('/etc/getTransactionListExcel', data)
    .then(handleSuccess)
    .catch(handleError);
};
