import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {deletePostAsync, getPostAsync, getPostsAsync} from "../../../slice/postSlice";
import {PageResponse} from "../../../types/common";
import { CommunityCategories } from "types/community";
import {PostsDTO} from "../../../types/post";

export function useCommunityGetter() {
    const dispatch = useDispatch<any>();
    const [posts, setPosts] = useState<PageResponse<PostsDTO>>();
    const [post, setPost] = useState<PostsDTO>();

    const getCompanyInfo = useCallback(async (
            {page, type, searchWord}: { page: number, type?: CommunityCategories, searchWord:string }) => {
            try {
                console.log(type)
                const result: PageResponse<PostsDTO> = await dispatch(getPostsAsync({page, type, searchWord})).unwrap();
                setPosts(result)
            } catch (e){
                console.log(e)
            }
        },
        [dispatch]
    );

    // @ts-ignore
    const getCommunityById = useCallback(async (idx:number) => {
            try {
                const result: PostsDTO = await dispatch(getPostAsync(idx)).unwrap();
                setPost(result)
                return result
            } catch (e){
                console.log(e)
            }
        },
        [dispatch]
    );

    const deletePost = useCallback(async (postingIdx:number) => {
            try {
                const result = await dispatch(deletePostAsync(postingIdx)).unwrap();
                console.log(result)
                return result
            } catch (e){
                console.log(e)
            }
        },
        [dispatch]
    );
    return ({
        getCompanyInfo, posts, deletePost,
        getCommunityById, post

    });
}