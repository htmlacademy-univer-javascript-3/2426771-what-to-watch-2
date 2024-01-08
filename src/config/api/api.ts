import axios, { AxiosRequestConfig } from 'axios';
import { lsApi } from '../ls-api/ls-api';

export const API_URL = 'https://13.design.pages.academy/wtw';

export const api = axios.create({
  timeout: 5000,
  baseURL: API_URL
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = lsApi.readToken();
  if (token && config.headers) {
    config.headers['X-Token'] = token;
  }
  return config;
});
