import axios, { AxiosRequestConfig } from 'axios';

export function get(url: string, config: AxiosRequestConfig = {}) {
  return axios.get(url, config);
}
