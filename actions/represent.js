import { axiosInstance, handleError, handleSuccess } from './axiosConfig';

export const getRepresent = async () => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    b2bSeq: 1
  };
  return await axiosInstance
    .post('/etc/getRepresentativeInfo', data)
    .then(handleSuccess)
    .catch(handleError);
};
export const modifyRepresent = async modify => {
  let data = {
    auth: { cpId: 'ConsultingONM', authKey: 'Q29uc3VsdGluZ09OTV9ob3RlbA==' },
    b2bSeq: 1,
    representatives: modify,
    adminId: 'cnc_b2b'
  };

  return await axiosInstance
    .post('/etc/setRepresentativeInfo', data)
    .then(handleSuccess)
    .catch(handleError);
};
