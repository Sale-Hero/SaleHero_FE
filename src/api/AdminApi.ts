import {MainApi} from "../api/MainApi";
import {AdminNewsLetterSearchDTO, NewsLetterDeleteDTO} from "../types/adminNewsLetter";
import {RawNewsLetterPutDTO, RawNewsLetterSearchDTO} from "../types/rawNewsLetter";

export class AdminApi {
    static url = `${process.env.REACT_APP_BASE_URL}/admin`;

    static getCurrentCount = (token: string) => () =>
        MainApi.api.get(`${AdminApi.url}/common/count`, {
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
        });

    // 뉴스 레터
    static getAdminNewsLetters = (dto: AdminNewsLetterSearchDTO) => () =>
        MainApi.api.get(`${AdminApi.url}/news${MainApi.toParamStringFromObject(dto)}`);


    // 뉴스레터 로우데이터 ㅡㅡㅡㅡㅡㅡㅡ
    static getRawNewsLetters = (dto: RawNewsLetterSearchDTO) => () =>
        MainApi.api.get(`${AdminApi.url}/raw${MainApi.toParamStringFromObject(dto)}`);

    static modifyRawNewsLetter = (dto: RawNewsLetterPutDTO) => () =>
        MainApi.api.put(`${AdminApi.url}/raw`, dto);

    static deleteRawNewsLetter = (dto: NewsLetterDeleteDTO) => () =>
        MainApi.api.delete(`${AdminApi.url}/raw`, {data: dto});
}