import Cookies from 'js-cookie';
import { publicInstance, authInstance } from './api';

const authService = {
  login: async (formData) => {
    return publicInstance.post('/login', formData).then((res) => {
      const { accessToken } = res.data;
      Cookies.set('accessToken', accessToken, { expires: 1 });
      return res.data;
    });
  },

  logout: async () => {
    return authInstance.post('/logout').then((res) => {
      Cookies.remove('accessToken');
      return res.data.message;
    });
  },

  register: async (formData) => {
    return publicInstance
      .post('/auth/register', formData)
      .then((res) => res.data);
  },

  sendOTP: async (formData) => {
    return publicInstance
      .post('/auth/send-otp', formData)
      .then((res) => res.data);
  },

  verifyOTP: async (formData) => {
    return publicInstance
      .post('/auth/verify-otp', formData)
      .then((res) => res.data);
  },

  refreshToken: async () => {
    return publicInstance.get('/refresh').then((res) => res.data.accessToken);
  },

  resetPassword: async (token, formData) => {
    return publicInstance
      .put(`/reset/${token}`, formData)
      .then((res) => res.data);
  },

  authCheck: async () => {
    return authInstance.get('/me').then((res) => res.data.payload);
  },

  createStore: async (formData) => {
    return authInstance.post('/open-store', formData).then((res) => res.data);
  },
};

export default authService;
