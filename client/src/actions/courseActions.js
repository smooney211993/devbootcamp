import { courseTypes } from './types';

export const getCourses = (keyword = '', budget, pageNumber = '') => ({
  type: courseTypes.REQUEST,
  payload: {
    keyword,
    pageNumber,
    budget,
  },
});
