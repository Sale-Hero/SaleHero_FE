import {MainApi} from "../api/MainApi";

export class AdminApi {
    static url = `${process.env.REACT_APP_BASE_URL}/admin`;

    static getCurrentCount = (token:string) => () =>
        MainApi.api.get(`${AdminApi.url}/common/count`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
}