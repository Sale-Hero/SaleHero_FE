import {MainApi} from "./MainApi";

export class UserNewsLetterApi{
    static baseUrl = `${process.env.REACT_APP_BASE_URL}/news`;

    static getUserNewsLetters = () => () =>
        MainApi.api.get(`${UserNewsLetterApi.baseUrl}`);

    static getUserNewsLetter = (idx: string) => () =>
        MainApi.api.get(`${UserNewsLetterApi.baseUrl}/${idx}`);
}