import {MainApi} from "./MainApi";
import {UnSubscribeDTO} from "../types/subscribe";

export class SubscribeApi {
    static baseUrl = `${process.env.REACT_APP_BASE_URL}/subscribe`;

    static unSubscribe = (dto: UnSubscribeDTO) => () =>
        MainApi.api.get(`${SubscribeApi.baseUrl}/unsubscribe${MainApi.toParamStringFromObject(dto)}`);
        // MainApi.api.get(`${SubscribeApi.baseUrl}/unsubscribe/${email}?token=${token}`);
}
