import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1/',
  withCredentials: true,
  headers: {
    Authorization: `Basic ${token}`,
  },
});
