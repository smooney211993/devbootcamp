import axios from 'axios';
export const fetchBootcamps = async () => {
  try {
    const { data } = await axios.get('/api/v1/bootcamps');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
