import {PageSearchDTO} from "./common";

export interface RawNewsLetterSearchDTO extends PageSearchDTO{
    query?: string;
}

export interface RawNewsLetterDTO{
    idx: number;
    title: string;
    content: string;
    createdAt: string;
}