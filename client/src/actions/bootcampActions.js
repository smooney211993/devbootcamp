import {
  BOOTCAMPS_LIST_REQUEST,
  BOOTCAMPS_LIST_RESET,
  BOOTCAMP_REQUEST,
  BOOTCAMP_REVIEWS_REQUEST,
  CREATE_BOOTCAMP_REVIEW_REQUEST,
  CREATE_BOOTCAMP_REVIEW_RESET,
  DELETE_BOOTCAMP_REQUEST,
  DELETE_BOOTCAMP_RESET,
} from './types';

export const getBootcamps = (
  keyword = '',
  pageNumber = '',
  budget,
  rating
) => ({
  type: BOOTCAMPS_LIST_REQUEST,
  payload: {
    keyword,
    pageNumber,
    budget,
    rating,
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

export const createBootcampReview = (id, formData) => ({
  type: CREATE_BOOTCAMP_REVIEW_REQUEST,
  payload: {
    id,
    formData,
  },
});

export const resetCreatebootcampReview = () => ({
  type: CREATE_BOOTCAMP_REVIEW_RESET,
});

export const deleteBootcamp = (id) => ({
  type: DELETE_BOOTCAMP_REQUEST,
  payload: {
    id,
  },
});

export const resetDeleteBootcamp = () => ({
  type: DELETE_BOOTCAMP_RESET,
});
