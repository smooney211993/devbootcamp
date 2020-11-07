import axios from 'axios';
export const fetchBootcamps = async (keyword, budget, rating, pageNumber) => {
  try {
    const { data } = await axios.get(
      `/api/v1/bootcamps/?keyword=${keyword}&averageCost[lte]=${budget}&averageRating[lte]=${rating}&pageNumber=${pageNumber}`
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchBootcampById = async (id) => {
  try {
    const { data } = await axios.get(`/api/v1/bootcamps/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchBootcampReviewById = async (id) => {
  try {
    const { data } = await axios.get(`/api/v1/bootcamps/${id}/reviews`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postBootcampReview = async (id, formData) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const { data } = await axios.post(
      `'/api/v1/bootcamps/${id}/reviews`,
      body,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
