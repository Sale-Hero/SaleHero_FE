import {MainApi} from "../api/MainApi";
import {AdminNewsLetterSearchDTO, NewsLetterDeleteDTO} from "../types/adminNewsLetter";
import {RawNewsLetterPutDTO, RawNewsLetterSearchDTO} from "../types/rawNewsLetter";
import {AdminArticlePostDTO, AdminArticleSearchDTO, ArticleDeleteDTO} from "../types/adminArticle";

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


    // 아티클
    static getAdminArticles = (dto: AdminArticleSearchDTO) => () =>
        MainApi.api.get(`${AdminApi.url}/article${MainApi.toParamStringFromObject(dto)}`);

    static postAdminArticle = (dto: AdminArticlePostDTO) => () =>
        MainApi.api.post(`${AdminApi.url}/article`, dto);

    static putAdminArticle = ({dto, articleId}: { dto:AdminArticlePostDTO, articleId: number }) => () =>
        MainApi.api.put(`${AdminApi.url}/article/${articleId}`, dto);

    static deleteAdminArticle = (dto: ArticleDeleteDTO) => () =>
        MainApi.api.delete(`${AdminApi.url}/article`, {data: dto});
}
