import {MainApi} from "./MainApi";
import {CommunityPostDTO, CommunitySearchDTO} from "../types/community";

export class CommunityAPI {

    static baseUrl = `${process.env.REACT_APP_BASE_URL}/community`;
    static chatHistoryUrl = `/v1/chat/history`;

    static getChatHistory = () => () =>
        MainApi.api.get(this.chatHistoryUrl);

    static getArticles = (dto: CommunitySearchDTO) => () =>
        MainApi.api.get(`${CommunityAPI.baseUrl}${MainApi.toParamStringFromObject(dto)}`);

    static postArticle = (dto: CommunityPostDTO) => () =>
        MainApi.api.post(`${CommunityAPI.baseUrl}`, dto);
}
