import {MainApi} from "../api/MainApi";
import {CommunitySubmitDTO} from "../types/post";
import {CommunityCategories} from "../types/community";

export class PostApi{
    static url = `${process.env.REACT_APP_BASE_URL}/community`;

    static createPost = (dto:CommunitySubmitDTO) => () =>
        MainApi.api.post(`${PostApi.url}/post`, dto,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    static getPosts = ({page, type, searchWord}: { page: number, type?: CommunityCategories, searchWord?:string }) => () =>
        MainApi.api.get(`${PostApi.url}/posts?page=${page}&type=${type}&searchWord=${searchWord}`,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    static getPost = (idx:number) => () =>
        MainApi.api.get(`${PostApi.url}/post/${idx}`,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    static deletePost = (postingIdx:number) => () =>
        MainApi.api.delete(`${PostApi.url}/post/${postingIdx}/delete`,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    static updatePost = ({dto, idx}: { dto : CommunitySubmitDTO, idx:number }) => () =>
        MainApi.api.post(`${PostApi.url}/post/${idx}/modify`, dto,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
}