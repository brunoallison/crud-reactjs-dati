import axios from 'axios';

const api = axios.create({
  baseURL: 'http://18.228.14.48/api'
});

export default api;