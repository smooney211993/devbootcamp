import { BOOTCAMPS_LIST_REQUEST, BOOTCAMPS_LIST_RESET } from './types';

export const getBootcamps = (keyword = '', pageNumber = '') => ({
  type: BOOTCAMPS_LIST_REQUEST,
  payload: {
    keyword,
    pageNumber,
  },
});

export const resetBootCamps = () => ({
  type: BOOTCAMPS_LIST_RESET,
});
