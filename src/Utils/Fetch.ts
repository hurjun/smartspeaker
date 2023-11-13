import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import cookies from 'js-cookie';

export const Instance = axios.create({
  baseURL: 'https://dogu.dogong.xyz/api',
});

export const ApiKeyInstance = axios.create({
  baseURL: 'https://bydsr.dogong.xyz/api',
  headers: {
    'api-key': cookies.get('id') ? `${cookies.get('id')}` : '',
  },
});

ApiKeyInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers['api-key'] = `${cookies.get('id')}`;
  }
  return config;
});
