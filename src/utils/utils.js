import axios from 'axios';

const Backend = axios.create({
  baseURL: import.meta.VITE_BACKEND_HOST,
  withCredentials: true,
});

export default Backend;
