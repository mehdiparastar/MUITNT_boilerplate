import axios from 'axios';

const baseURL = 'http://localhost:3001';

const dateKeyRx =
  /^(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?)$/;
// Validate ISO date

export default axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  transformResponse: (data) =>
    JSON.parse(data, (key, value) =>
      dateKeyRx.test(value) ? new Date(value) : value,
    ),
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' },
  transformResponse: (data) =>
    JSON.parse(data, (key, value) =>
      dateKeyRx.test(value) ? new Date(value) : value,
    ),
  //   withCredentials:true
});
