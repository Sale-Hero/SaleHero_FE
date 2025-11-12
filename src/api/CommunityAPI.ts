import {MainApi} from "./MainApi";
import {CommunityPostDTO, CommunitySearchDTO} from "../types/community";

export class CommunityAPI {

    static baseUrl = `${process.env.REACT_APP_BASE_URL}/community`;
    static chatHistoryUrl = `/v1/chat/history`;

    static getChatHistory = (page: number = 0) => () =>
        MainApi.api.get(`${this.chatHistoryUrl}?page=${page}&size=50&sort=createdAt,desc`);

    static getArticles = (dto: CommunitySearchDTO) => () =>
        MainApi.api.get(`${CommunityAPI.baseUrl}${MainApi.toParamStringFromObject(dto)}`);

    static postArticle = (dto: CommunityPostDTO) => () =>
        MainApi.api.post(`${CommunityAPI.baseUrl}`, dto);
}
