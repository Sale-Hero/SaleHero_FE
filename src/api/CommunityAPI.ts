import {MainApi} from "./MainApi";
import {CommunityPostDTO, CommunitySearchDTO} from "../types/community";

export class CommunityAPI {

    static baseUrl = `${process.env.REACT_APP_BASE_URL}/community`;

    static getArticles = (dto: CommunitySearchDTO) => () =>
        MainApi.api.get(`${CommunityAPI.baseUrl}${MainApi.toParamStringFromObject(dto)}`);

    static postArticle = (dto: CommunityPostDTO) => () =>
        MainApi.api.post(`${CommunityAPI.baseUrl}`, dto);
}