import {PageSearchDTO} from "./common";

export interface RawNewsLetterSearchDTO extends PageSearchDTO{
    query?: string;
}

export interface RawNewsLetterPutDTO {
    id: number;
    title: string;
    content: string;
}

export interface RawNewsLetterDTO{
    id: number;
    title: string;
    content: string;
    createdAt: string;
}