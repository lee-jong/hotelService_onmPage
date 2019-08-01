import { axiosInstance, handleError, handleSuccess } from './actionModule';
import { getDate } from '../helpers/utils';

export const getHistory = async () => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    groupName: 'call',
    listType: 'all',
    keyword: '',
    b2bSeq: 1,
    option: {
      offset: 10 * 0,
      limit: 10,
      sort: 'desc'
    }
  };
  return await axiosInstance
    .post('/call/getCallHistoryList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getCallHistoryByGroup = async group => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    groupName: group.option,
    searchType: 'room',
    keyword: group.searchValue,
    b2bSeq: 1,
    option: {
      offset: 10 * (group.active - 1),
      limit: 10,
      sort: 'desc'
    }
  };
  return await axiosInstance
    .post('/call/getCallHistoryList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getCallHistoryByPage = async page => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    groupName: page.option,
    searchType: 'room',
    listType: 'all',
    keyword: page.searchValue,
    b2bSeq: page.b2bSeq,
    option: {
      offset: 10 * (page.active - 1),
      limit: 10,
      sort: 'desc'
    }
  };
  return await axiosInstance
    .post('/call/getCallHistoryList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getCallHistoryBySearch = async search => {
  console.log('search:::', search);
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    groupName: search.option,
    searchType: search.searchType,
    listType: 'all',
    keyword: search.searchValue,
    b2bSeq: search.b2bSeq,
    option: {
      offset: 10 * (search.active - 1),
      limit: 10,
      sort: 'desc',
      startTime: getDate(search.startDate),
      endTime: getDate(search.endDate)
    }
  };
  return await axiosInstance
    .post('/call/getCallHistoryList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const unfoldMemo = async idx => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    historyIdx: idx
  };
  return await axiosInstance
    .post('/call/getMemoInfo', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const getCallHistoryListExcel = async () => {
  let data = {
    responseType: 'arraybuffer',
    b2bSeq: 1,
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' }
  };

  return await axiosInstance
    .post('/call/getCallHistoryListExcel', data)
    .then(handleSuccess)
    .catch(handleError);
};
