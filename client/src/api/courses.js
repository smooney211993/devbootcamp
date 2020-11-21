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
  return apiCaller({
    method: 'delete',
    url: `/api/v1/courses/${id}`,
  });
};
