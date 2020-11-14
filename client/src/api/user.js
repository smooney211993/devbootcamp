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

export const fetchUser = async () => {
  try {
    const { data } = await axios.get(`/api/v1/auth/me`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  const body = JSON.stringify({
    name,
    email,
    password,
  });
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    const { data } = await axios.post(`/api/v1/auth/register`, body, config);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (formData) => {
  const body = JSON.stringify(formData);
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    await axios.put(`/api/v1/auth/me/updatedetails`, body, config);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
