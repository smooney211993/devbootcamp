import {
  BOOTCAMPS_LIST_REQUEST,
  BOOTCAMPS_LIST_RESET,
  BOOTCAMP_REQUEST,
  BOOTCAMP_REVIEWS_REQUEST,
} from './types';

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

export const getBootcamp = (id) => ({
  type: BOOTCAMP_REQUEST,
  payload: {
    id,
  },
});

export const getBootCampReview = (id) => ({
  type: BOOTCAMP_REVIEWS_REQUEST,
  payload: {
    id,
  },
});
