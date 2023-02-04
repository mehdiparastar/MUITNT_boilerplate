import { baseURL } from 'api/baseUrl';
import axios from 'axios';

const dateKeyRx =
  /^(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?)$/;
// Validate ISO date

export default axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  transformResponse: (data) => {
    try {
      if (data instanceof Blob) {
        return data
      }
      return JSON.parse(data, (key, value) =>
        dateKeyRx.test(value) ? new Date(value) : value,
      )
    }
    catch (ex) {
      return data
    }
  },
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' },
  transformResponse: (data) => {
    try {
      if (data instanceof Blob) {
        return data
      }
      return JSON.parse(data, (key, value) =>
        dateKeyRx.test(value) ? new Date(value) : value,
      )
    }
    catch (ex) {
      console.error(ex)
      return data
    }
  },
  //   withCredentials:true
});