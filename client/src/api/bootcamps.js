import { apiCaller } from '../utils/api';

export const fetchBootcamps = (keyword, budget, rating, pageNumber) => {
  return apiCaller({
    method: 'get',
    url: `/api/v1/bootcamps/`,
    params: {
      keyword: keyword,
      'averageCost[lte]': budget,
      'averageRating[lte]': rating,
      pageNumber: pageNumber,
    },
  });
};

export const fetchBootcampById = async (id) => {
  /*try {
    const { data } = await axios.get(`/api/v1/bootcamps/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
  */ return apiCaller(
    {
      method: 'get',
      url: `/api/v1/bootcamps/${id}`,
    }
  );
};

export const fetchBootcampReviewById = async (id) => {
  /*try {
    const { data } = await axios.get(`/api/v1/bootcamps/${id}/reviews`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
  */
  return apiCaller({
    method: 'get',
    url: `/api/v1/bootcamps/${id}/reviews`,
  });
};

export const postBootcampReview = (id, formData, authToken) => {
  return apiCaller({
    method: 'post',
    url: `/api/v1/bootcamps/${id}/reviews`,
    data: { ...formData },
    headers: {
      'Content-type': 'application/json',
    },
  });
};

/*export const postBootcampReview = async (id, formData) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const { data } = await axios.post(
      `/api/v1/bootcamps/${id}/reviews`,
      body,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

*/

export const deleteBootcamp = async (id) => {
  /*try {
    await axios.delete(`/api/v1/bootcamps/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }

  */

  if (window.confirm('Are You Sure You Want To Delete')) {
    return apiCaller({
      method: 'delete',
      url: `/api/v1/bootcamps/${id}`,
    });
  }
};

export const updateBootcampById = async (id, formData) => {
  /*const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);
  try {
    await axios.put(`/api/v1/bootcamps/${id}`, body, config);
  } catch (error) {
    console.log(error);
    throw error;
  }

  */
  return apiCaller({
    method: 'put',
    url: `/api/v1/bootcamps/${id}`,
    data: { ...formData },
    headers: {
      'Content-type': 'application/json',
    },
  });
};

export const creatNewBootcamp = (formData) => {
  return apiCaller({
    method: 'post',
    url: `/api/v1/bootcamps`,
    data: { ...formData },
    headers: {
      'Content-type': 'application/json',
    },
  });
};
