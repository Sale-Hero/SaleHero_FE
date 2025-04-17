import {MainApi} from "../api/MainApi";

export class AuthApi {
    static url = `${process.env.REACT_APP_BASE_URL}/user`;

    static getCurrentUser = () => () =>
        MainApi.api.get(`${AuthApi.url}/current-user`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
}

