import axios from 'axios';
export const fetchUserToken = async (email, password) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({
    email,
    password,
  });
  try {
    const { data } = await axios.post(`/api/v1/auth/login`, body, config);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
