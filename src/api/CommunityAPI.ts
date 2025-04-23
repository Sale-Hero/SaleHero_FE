import {MainApi} from "./MainApi";
import {CommunitySearchDTO} from "../types/community";

export class CommunityAPI {

    static baseUrl = `${process.env.REACT_APP_BASE_URL}/community`;

    static getArticles = (dto: CommunitySearchDTO) => () =>
        MainApi.api.get(`${CommunityAPI.baseUrl}${MainApi.toParamStringFromObject(dto)}`);
}