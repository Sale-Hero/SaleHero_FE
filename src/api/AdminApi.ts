import {MainApi} from "../api/MainApi";
import {AdminNewsLetterSearchDTO} from "../types/adminNewsLetter";
import {RawNewsLetterSearchDTO} from "../types/rawNewsLetter";

export class AdminApi {
    static url = `${process.env.REACT_APP_BASE_URL}/admin`;

    static getCurrentCount = (token:string) => () =>
        MainApi.api.get(`${AdminApi.url}/common/count`, {
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
        });

    // 뉴스 레터

    static getAdminNewsLetters = (dto: AdminNewsLetterSearchDTO) => () =>
        MainApi.api.get(`${AdminApi.url}/news${MainApi.toParamStringFromObject(dto)}`);

    static getRawNewsLetters = (dto: RawNewsLetterSearchDTO) => () =>
        MainApi.api.get(`${AdminApi.url}/raw${MainApi.toParamStringFromObject(dto)}`);
}