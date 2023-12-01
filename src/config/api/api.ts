import axios from 'axios';

export const API_URL = 'https://13.design.pages.academy/wtw';

export const api = axios.create({
  timeout: 5000,
  baseURL: API_URL
});
