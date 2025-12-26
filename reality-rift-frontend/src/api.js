import axios from 'axios';

// Base axios instance; during dev, Vite proxies /api to Django at localhost:8000
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// Example usage:
// import api from './api';
// const res = await api.get('/players/');