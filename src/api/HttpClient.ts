import axios, { AxiosInstance, AxiosResponse } from "axios";

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  public readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = (response: AxiosResponse) => {
    return response.data;
  };

  protected _handleError = (error: any) => {


    return Promise.reject(error)};
}