import axios from 'axios';

const baseURL = 'http://localhost:3001';

export default axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' },
  //   withCredentials:true
});
