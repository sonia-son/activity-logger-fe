import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const BASE_API_URL =
  process.env.BASE_API_URL ||
  process.env.REACT_APP_BASE_API_URL ||
  `${window.location.origin.toString()}/api/`;

// method: 'POST',
// headers: { 'Authorization': 'Token ' + token },

class Request {
  private _instance: AxiosInstance;
  private _baseUrl: string;

  constructor({ baseURL }: { baseURL: string }) {
    this._instance = axios.create({ baseURL, withCredentials: false });
    if (localStorage.getItem('activity-logger-token')) {
      this._instance.defaults.headers.Authorization = `Token ${localStorage.getItem(
        'activity-logger-token'
      )}`;
    }
    this._baseUrl = baseURL;
  }
  public setToken = (token: string) => {
    if (token) {
      this._instance.defaults.headers.Authorization = `Token ${token}`;
      localStorage.setItem('activity-logger-token', token);
    } else {
      this._instance.defaults.headers.Authorization = ``;
      localStorage.removeItem('activity-logger-token');
    }
  };

  public get = async (url: string, config: AxiosRequestConfig = {}) => {
    try {
      const res = await this._instance.get(url, config);
      return res?.data;
    } catch (err) {
      throw err;
    }
  };

  public post = async (
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ) => {
    try {
      const res = await this._instance.post(url, data, config);
      return res;
    } catch (err) {
      throw err;
    }
  };

  public put = async (
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ) => {
    try {
      const res = await this._instance.put(url, data, config);
      return res;
    } catch (err) {
      throw err;
    }
  };

  public patch = async (
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ) => {
    try {
      const res = await this._instance.patch(url, data, config);
      return res;
    } catch (err) {
      throw err;
    }
  };

  public delete = async (url: string, config: AxiosRequestConfig = {}) => {
    try {
      const res = await this._instance.delete(url, config);
      return res;
    } catch (err) {
      throw err;
    }
  };
}

const apiRequest = new Request({
  baseURL: BASE_API_URL,
});

export default apiRequest;
