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

export interface Newsletter {
    id: number;
    title: string;
    content: string;
    isSent: string;
    sentAt: string | null;
    createdAt: string | null;
}

export interface NewsLetterDTO {
    title: string;
    content: string;
    sentAt: string | null;
}

export interface NewsLetterDeleteDTO{
    idxList: number[]
}