import { courseTypes, deleteCourseTypes, updateCourseTypes } from './types';

export const getCourses = (keyword = '', budget, pageNumber = '') => ({
  type: courseTypes.REQUEST,
  payload: {
    keyword,
    pageNumber,
    budget,
  },
});

export const deleteCourse = (id) => ({
  type: deleteCourseTypes.REQUEST,
  payload: {
    id,
  },
});

export const deleteCourseReset = () => ({
  type: deleteCourseTypes.RESET,
});

export const updateCourseReset = () => ({
  type: updateCourseTypes.RESET,
});
