import {PageSearchDTO} from "./common";

export interface AdminNewsLetterSearchDTO extends PageSearchDTO{
    query?: string;
}

export interface NewsLetterResponseDTO{
    id: number,
    title: string,
    content: string,
    isSent: string,
    isPublic: string,
    sentAt: string,
    createdAt: string,
}