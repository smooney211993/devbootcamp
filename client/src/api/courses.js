import { apiCaller } from '../utils/api';

export const getAllCoursesAsAdmin = (keyword, budget, pageNumber) => {
  return apiCaller({
    method: 'get',
    url: `/api/v1/courses/`,
    params: {
      keyword,
      'averageCost[lte]': budget,
      pageNumber,
    },
  });
};
