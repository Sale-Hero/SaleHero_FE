import {MainApi} from "./MainApi";

export class TipsApi{
    static baseUrl = `${process.env.REACT_APP_BASE_URL}/careertips`;

    static getTips = (
        // 파라미터 추가 예정
        // country: string, location:string
    ) => () =>
        MainApi.api.get(`${TipsApi.baseUrl}/`);
}