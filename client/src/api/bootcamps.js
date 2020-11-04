import axios from 'axios';
export const fetchBootcamps = async (keyword, budget, rating, pageNumber) => {
  try {
    const { data } = await axios.get(
      `/api/v1/bootcamps/?keyword=${keyword}&pageNumber=${pageNumber}`
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
