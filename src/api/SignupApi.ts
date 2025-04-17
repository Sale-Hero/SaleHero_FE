import {MainApi} from "./MainApi";
import {UserPostDTO} from "../types/signup";

export class SignupApi{
    static userUrl = `${process.env.REACT_APP_BASE_URL}/users`;
    static authUrl = `${process.env.REACT_APP_BASE_URL}/auth`;

    static createUser = (user:UserPostDTO) => () =>
        MainApi.api.post(`${SignupApi.userUrl}`, user);

    static register = (user:UserPostDTO) => () =>
        MainApi.api.post(`${SignupApi.authUrl}/register`, user);

    static duplicateCheck = (email:string) => () =>
        MainApi.api.get(`${SignupApi.userUrl}/dupl-check/${email}`);

    static googleLogin = () =>() =>
        MainApi.api.get(`${SignupApi.authUrl}/google`);
}