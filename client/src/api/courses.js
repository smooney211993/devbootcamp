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
