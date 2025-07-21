import {ArticleSearchDTO} from "../types/adminArticle";
import {MainApi} from "./MainApi";
import {getUserArticleDetailAsync} from "../slice/ArticleSlice";

export class ArticleApi {
    static url = `${process.env.REACT_APP_BASE_URL}/articles`;


    static getUserArticles = (dto: ArticleSearchDTO) => () =>
        MainApi.api.get(`${ArticleApi.url}${MainApi.toParamStringFromObject(dto)}`);

    static getUserArticleDetail = (articleId: number) => () =>
        MainApi.api.get(`${ArticleApi.url}/${articleId}`);
}
