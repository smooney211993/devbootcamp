import { get } from 'mongoose';
import {
  courseTypes,
  deleteCourseTypes,
  updateCourseTypes,
  getCourseTypes,
  createCourseTypes,
} from './types';

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

export const getCourse = (id) => ({
  type: getCourseTypes.REQUEST,
  payload: {
    id,
  },
});

export const updateCourse = (id, formData) => ({
  type: updateCourseTypes.REQUEST,
  payload: {
    id,
    formData,
  },
});

export const updateCourseReset = () => ({
  type: updateCourseTypes.RESET,
});

export const createCourse = (bootcampId, formData) => ({
  type: createCourseTypes.REQUEST,
  payload: {
    bootcampId,
    formData,
  },
});

export const createCourseReset = () => ({
  type: createCourseTypes.RESET,
});
