import Cookies from 'js-cookie';
import axios from 'axios';

export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY,
  },
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY,
  },
});

authInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => {
    Promise.reject(error);
  },
);

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/refresh`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': import.meta.env.VITE_API_KEY,
            },
          },
        );

        const newAccessToken = response.data.accessToken;

        Cookies.set('accessToken', newAccessToken, { expires: 1 / 96 });

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return authInstance(error.config);
      } catch (refreshError) {
        Cookies.remove('accessToken');

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
