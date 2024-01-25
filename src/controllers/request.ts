import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from '../utils/authUtils';
import { API_URL } from '../root/constants';

export const request: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${getAccessToken()}`
  },
});

export const formRequest: AxiosInstance= axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${getAccessToken()}`,
    'Content-Type': 'multipart/form-data',
  },
});
