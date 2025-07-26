import { PageSearchDTO } from "./common";

export enum AnnouncementCategory {
    ARTICLE = 'ARTICLE',
    COMMUNITY = "COMMUNITY",
}

export interface AnnouncementSearchDTO extends PageSearchDTO {
    query?: string;
}

export interface AnnouncementDTO {
    id: number;
    title: string;
    content: string;
    category: AnnouncementCategory;
    isVisible: string; // 'Y' or 'N'
    isDeleted: string; // 'Y' or 'N'
    viewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface AdminAnnouncementPostDTO {
    title: string;
    content: string;
    category: AnnouncementCategory;
    isVisible: string; // 'Y' or 'N'
}

export interface AnnouncementDeleteDTO {
    idxList: number[];
}
