import {HttpClient} from "./HttpClient";
import {SearchCondition} from "../types/common";

export class MainApi extends HttpClient {
  private static classInstance?: MainApi;

  public static api = MainApi.getInstance().instance;
  // public static urlPrefix = "/api";

  private constructor() {
    super(process.env.REACT_APP_BASE_URL as string);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApi();
    }

    return this.classInstance;
  }

  public setToken(token: string) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  public static toParamStringFromObject<T extends object>(param: T) {
    const keyArr = Object.keys(param);
    if (keyArr.length > 0) {
      const paramStr = keyArr.reduce((acc, k) => {
        const value = param[k as keyof T];

        if (typeof value === "function") {
          return acc; // 함수는 파라미터로 변환하지 않음
        }

        // pageCondition은 특별 처리
        if (k === "pageCondition") {
          const pageParam = (param as SearchCondition)[k];
          if (pageParam?.page !== undefined) {
            acc += `&page=${pageParam.page}`;
          } else {
            acc += `&page=0`;
          }

          if (pageParam?.size) {
            acc += `&size=${pageParam.size}`;
          } else {
            acc += `&size=10`;
          }
          return acc;
        }

        // 일반적인 키-값 쌍 처리 (undefined, null, 빈 문자열이 아닌 경우에만)
        if (value !== undefined && value !== null && value !== '') {
          acc += `&${k}=${encodeURIComponent(String(value))}`;
        }

        return acc;
      }, "");

      return paramStr ? `?${paramStr.substring(1)}` : "";
    }

    // 파라미터가 없는 경우 빈 문자열 반환
    return "";
  }
}
