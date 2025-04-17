import {MainApi} from "./MainApi";

export class CompanyInformationApi {
    static baseUrl = `${process.env.REACT_APP_BASE_URL}`;

    static getCompanyLists = (country: string, location:string) => () =>
        // MainApi.api.get(`${CompanyInformationApi.baseUrl}/jobinfos/search?country=${country}&location=${location}`);
        MainApi.api.get(`${CompanyInformationApi.baseUrl}/jobinfos/search?apiType=adzuna&country=${country}&location=${location}`);
}