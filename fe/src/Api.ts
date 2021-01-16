import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.response.use(
  (value) => {
    return value;
  },
  (err) => {
    if (err.response.status === 401) {
      window.location.href = "/login";
      return;
    }
    throw err;
  }
);

export function get(url: string, config: AxiosRequestConfig = {}) {
  return axios.get(url, config);
}
