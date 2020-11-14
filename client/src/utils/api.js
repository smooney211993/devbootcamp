import axios from 'axios';

//  when token is fetched from the database, we wanna then send the token with every request
// if no token we want to delete it from the headers
export const setAuthToken = (token) => {
  if (token) {
    // axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

    localStorage.setItem('token', token);
  } else {
    //delete axios.defaults.headers.common['authorization'];

    localStorage.removeItem('token');
  }
};

const generateAuthorisedApi = (customTimeout) => {
  const authorisedApi = axios.create();

  // Retry a failed service request once
  const retryFailedRequest = (err) => {
    if (
      err.response &&
      err.response.status === 500 &&
      err.config &&
      !err.config.__isRetryRequest
    ) {
      // eslint-disable-next-line no-param-reassign
      err.config.__isRetryRequest = true;

      return axios(err.config);
    }
    throw err;
  };

  authorisedApi.interceptors.response.use(undefined, retryFailedRequest);

  authorisedApi.interceptors.request.use(
    (config) => {
      const authToken = localStorage.getItem('token');
      const _config = config;
      _config.headers.Accept = '*/*';
      if (authToken) {
        _config.headers.Authorization = `Bearer ${authToken}`;
      }
      return _config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authorisedApi.defaults.timeout = customTimeout || 20000;

  return authorisedApi;
};

export function apiCaller({ method = '', url = '', data, params, headers }) {
  const authorisedApiCaller = generateAuthorisedApi(30000);
  return authorisedApiCaller({ method, url, data, params, headers });
}
