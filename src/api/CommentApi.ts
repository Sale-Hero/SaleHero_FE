import {MainApi} from "../api/MainApi";
import {CommentPostDTO} from "../types/post";

export class CommentApi {
    static url = `${process.env.REACT_APP_BASE_URL}/community/comment`;

    static createComment = (dto:CommentPostDTO) => () =>
        MainApi.api.post(`${CommentApi.url}`, dto,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

}