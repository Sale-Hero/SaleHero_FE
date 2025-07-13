import { PageSearchDTO } from "./common";

export interface AdminArticleSearchDTO extends PageSearchDTO {
    // query?: string;
}

export enum ArticleCategory {
    PROMOTION = "PROMOTION",
    CHICKEN = "CHICKEN",
    PIZZA = "PIZZA",
}

export interface ArticleResponseDTO {
    id: number;
    title: string;
    content: string;
    summary: string;
    category: ArticleCategory;
    isVisible: string;
    isDeleted: string;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface AdminArticlePostDTO {
    title: string;
    content: string;
    summary: string;
    category: ArticleCategory;
    isVisible: string;
}

export interface ArticleDeleteDTO {
    idxList: number[];
}
