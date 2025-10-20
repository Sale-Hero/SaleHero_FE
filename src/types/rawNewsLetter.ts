import {PageSearchDTO} from "./common";
import {ArticleCategory} from "./adminArticle";

export interface RawNewsLetterSearchDTO extends PageSearchDTO{
    query?: string;
}

export interface RawNewsLetterPutDTO {
    id: number;
    title: string;
    content: string;
    category: ArticleCategory;
    articleUrl: string;
    keyword: string;
}

export interface RawNewsLetterDTO{
    id: number;
    title: string;
    content: string;
    createdAt: string;
}