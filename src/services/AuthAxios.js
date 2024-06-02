import axios from 'axios';
import { Platform } from 'react-native'

const AuthAxios = (token = null) => {
  // axios instance for making requests
    // for android emulator, go to system settings and find the ip address of your wifi network
    // instead of local host
  const axiosInstance = axios.create({
    baseURL: Platform.OS === "android" ? 'http://100.88.58.246:8080' : 'http://localhost:8080'
    // baseURL: 'http://100.88.58.246:8080'
  });

  // request interceptor for adding token
  axiosInstance.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json";
    if (token && config.url !== "/api/auth/login/") {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return axiosInstance;
};

export default AuthAxios;