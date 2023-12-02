import axios from 'axios';

const AuthAxios = (token = null) => {
  // axios instance for making requests
  const axiosInstance = axios.create({
    // baseURL: 'http://localhost:6868'
    baseURL: 'http://localhost:8080'
  });

  // request interceptor for adding token
  axiosInstance.interceptors.request.use((config) => {
    if (token && config.url !== "/api/auth/login/") {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return axiosInstance;
};

export default AuthAxios;