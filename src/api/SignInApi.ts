import {MainApi} from "./MainApi";

export class SignInApi {
    static authUrl = `${process.env.REACT_APP_BASE_URL}/auth`;

    static loginUser = (signin:SignInApi) => () =>
        MainApi.api.post(`${SignInApi.authUrl}/login`, signin);
}