import axios from 'axios'; 
import { useAuth } from '../context/AuthContext';


const bearerToken = localStorage.getItem('token')
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${bearerToken} `,
  
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log(error)
  if (error.response && error.status === 401) {
    console.error('Não autorizado, faça login novamente.');
    localStorage.clear();
    window.location.href = '/login';
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

export default api;
