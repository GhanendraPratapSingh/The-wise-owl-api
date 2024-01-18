
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://thewiseowl.pythonanywhere.com/',
});

export default api;