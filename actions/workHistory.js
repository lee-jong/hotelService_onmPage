import { axiosInstance, handleError, handleSuccess } from './actionModule';
import { getDate } from '../helpers/utils';

export const getWorkHistory = async page => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    listType: page.option,
    keyword: page.searchValue,
    b2bSeq: 1,
    option: {
      offset: 10 * (page.active - 1),
      limit: 10
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
      limit: 10
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
      endTime: getDate(search.endTime)
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
