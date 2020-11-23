import { apiCaller } from '../utils/api';

export const fetchUserToken = (email, password) => {
  /*const config = {
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
  } */
  return apiCaller({
    method: 'POST',
    url: `/api/v1/auth/login`,
    data: { email, password },
    headers: {
      'Content-type': 'application/json',
    },
  });
};

export const fetchUser = () => {
  /* try {
    const { data } = await axios.get(`/api/v1/auth/me`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  } */
  return apiCaller({
    method: 'get',
    url: '/api/v1/auth/me',
  });
};

export const registerUser = (name, email, password) => {
  /*const body = JSON.stringify({
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
  */
  return apiCaller({
    method: 'post',
    url: `/api/v1/auth/register`,
    data: { name, email, password },
    headers: { 'Content-type': 'application/json' },
  });
};

export const updateUser = (formData) => {
  /* const body = JSON.stringify(formData);
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
  */
  return apiCaller({
    method: 'put',
    url: `/api/v1/auth/me/updatedetails`,
    data: { ...formData },
    headers: { 'Content-type': 'application/json' },
  });
};

export const userPasswordUpdate = (formData) => {
  return apiCaller({
    method: 'put',
    url: `/api/v1/auth/me/updatepassword`,
    data: { ...formData },
    headers: { 'Content-type': 'application/json' },
  });
};

export const getUserAsAdmin = (keyword, role, pageNumber) => {
  if (window.confirm('Are You Sure You Want To Delete This User')) {
    return apiCaller({
      method: 'get',
      url: `/api/v1/auth/users/`,
      params: {
        keyword,
        role,
        pageNumber,
      },
    });
  }
};

export const deleteUserAsAdmin = (id) => {
  return apiCaller({ method: 'delete', url: `/api/auth/users/${id}` });
};
