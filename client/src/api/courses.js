import { apiCaller } from '../utils/api';

export const getAllCoursesAsAdmin = (keyword, budget, pageNumber) => {
  return apiCaller({
    method: 'get',
    url: `/api/v1/courses/`,
    params: {
      keyword,
      'budget[lte]': budget,
      pageNumber,
    },
  });
};

export const deleteCourseByIdAsAdmin = (id) => {
  if (window.confirm('Are You Sure You Want To Delete')) {
    return apiCaller({
      method: 'delete',
      url: `/api/v1/courses/${id}`,
    });
  }
};

export const getCourseById = (id) => {
  return apiCaller({
    method: 'get',
    url: `/api/v1/courses/${id}`,
  });
};

export const updateCourseById = (id, formData) => {
  return apiCaller({
    method: 'put',
    url: `/api/v1/courses/${id}`,
    data: { ...formData },
    headers: {
      'Content-type': 'application/json',
    },
  });
};

export const createNewCourse = (formData) => {
  return apiCaller({
    method: 'post',
    url: `/api/v1/courses`,
    data: { ...formData },
  });
};
