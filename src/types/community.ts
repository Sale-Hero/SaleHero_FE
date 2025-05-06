import {SearchCondition} from "./common";

export interface CommunityDTO{
    id: number,
    title: String,
    content: String,
    createdAt: string,
    viewCount: number,
    category: CommunityCategory;

    writerName: String,
}

export enum CommunityCategory{
    ALL = "ALL",
    INFORMATION = "INFORMATION",
    COMMUNITY = "COMMUNITY",
}

export interface CommunitySearchDTO extends SearchCondition{
    category?: CommunityCategory;
    query?: String
}

export interface CommunityPostDTO{
    title: string;
    content: string;
    category: CommunityCategory;
}