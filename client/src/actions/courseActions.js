import { courseTypes } from './types';
import { deleteCourseTypes } from './types';

export const getCourses = (keyword = '', budget, pageNumber = '') => ({
  type: courseTypes.REQUEST,
  payload: {
    keyword,
    pageNumber,
    budget,
  },
});

export const deleteCourse = (id) => ({
  type: courseTypes.REQUEST,
  payload: {
    id,
  },
});

export const deleteCourseReset = () => ({
  type: deleteCourseTypes.RESET,
});
